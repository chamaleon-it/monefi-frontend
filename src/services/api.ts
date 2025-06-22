import configuration from '@/config/configuration';
import axios, { AxiosError, AxiosRequestConfig, AxiosHeaders } from 'axios';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import type { GetServerSidePropsContext, NextPageContext } from 'next';

type NookiesCtx = GetServerSidePropsContext | NextPageContext | undefined;

const getTokens = (ctx?: NookiesCtx) => {
  const cookies = parseCookies(ctx);
  return {
    accessToken: cookies.accessToken || '',
    refreshToken: cookies.refreshToken || '',
  };
};

const setTokens = (
  accessToken: string,
  refreshToken: string,
  ctx?: NookiesCtx
) => {
  setCookie(ctx, 'accessToken', accessToken, { path: '/' });
  setCookie(ctx, 'refreshToken', refreshToken, { path: '/' });
};

const clearTokens = (ctx?: NookiesCtx) => {
  destroyCookie(ctx, 'accessToken');
  destroyCookie(ctx, 'refreshToken');
};

const api = axios.create({
  baseURL: configuration().backendURL,
});

api.interceptors.request.use(
  (config) => {
    const { accessToken } = getTokens();

    if (accessToken) {
      if (!config.headers) {
        config.headers = new AxiosHeaders();
      }

      if (config.headers instanceof AxiosHeaders) {
        config.headers.set('Authorization', `Bearer ${accessToken}`);
      } else {
        (config.headers as Record<string, string>).Authorization =
          `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;

type FailedQueueItem = {
  resolve: (token: string) => void;
  reject: (err: AxiosError | null) => void;
};

let failedQueue: FailedQueueItem[] = [];

const processQueue = (err: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) =>
    err ? reject(err) : resolve(token as string)
  );
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (
    error: AxiosError & { config?: AxiosRequestConfig & { _retry?: boolean } }
  ) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          if (!originalRequest.headers) {
            originalRequest.headers = new AxiosHeaders();
          }

          if (originalRequest.headers instanceof AxiosHeaders) {
            originalRequest.headers.set('Authorization', `Bearer ${token}`);
          } else {
            (originalRequest.headers as Record<string, string>).Authorization =
              `Bearer ${token}`;
          }

          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { refreshToken } = getTokens();

        const res = await axios.post(
          `${configuration().backendURL}/auth/refresh`,
          { refreshToken }
        );

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          res.data.data;

        setTokens(newAccessToken, newRefreshToken);
        api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);

        if (!originalRequest.headers) {
          originalRequest.headers = new AxiosHeaders();
        }

        if (originalRequest.headers instanceof AxiosHeaders) {
          originalRequest.headers.set(
            'Authorization',
            `Bearer ${newAccessToken}`
          );
        } else {
          (originalRequest.headers as Record<string, string>).Authorization =
            `Bearer ${newAccessToken}`;
        }

        return api(originalRequest);
      } catch (err) {
        const axiosError = err as AxiosError | null;
        processQueue(axiosError, null);
        clearTokens();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
export { getTokens, setTokens, clearTokens };