"use client";

import {
  AuthContextInterface,
  UserInterface,
} from "@/interface/AuthProvider.interface";
import api, { clearTokens, setTokens, getTokens } from "@/services/api";
import React, { useCallback, useEffect, useState } from "react";

export const authContext = React.createContext<
  undefined | AuthContextInterface
>(undefined);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const verify = useCallback(async (): Promise<void> => {
    setLoading(true);
    const { accessToken, refreshToken } = getTokens();
    if (!accessToken && !refreshToken) {
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    try {
      const { data } = await api.get("/users/profile");
      const { _id, email, role, status, name, balance } = data.data;
      setUser({ id: _id, email, role, status, name, balance });
      setIsAuthenticated(true);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      clearTokens();
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(
    async (data: {
      email: string;
      password: string;
      twoFactorCode?: string;
    }): Promise<{
      status: "success" | "failed" | "requires2FA";
      message?: string;
      error?: string;
    }> => {
      try {
        const res = await api.post("/auth", data);
        if (res.data.data?.requires2FA) {
          return {
            status: "requires2FA",
            message: "2FA code required",
          };
        }
        setTokens(res.data.data.accessToken, res.data.data.refreshToken);
        return {
          status: "success",
          message: "Login successful",
        };
      } catch (error) {
        const { message } = (
          error as { response: { data: { message: string | string[] } } }
        )?.response?.data || { message: "An error occurred" };
        return {
          status: "failed",
          error: typeof message === "string" ? message : message[0],
        };
      }
    },
    []
  );

  const register = useCallback(
    async (data: {
      email: string;
      password: string;
      confirmPassword: string;
    }): Promise<{
      status: "success" | "failed";
      message?: string;
      error?: string;
    }> => {
      try {
        await api.post("/users", data);
        return {
          status: "success",
          message: "Register successfull",
        };
      } catch (error) {
        const { message } = (
          error as { response: { data: { message: string | string[] } } }
        )?.response?.data;
        return {
          status: "failed",
          error: typeof message === "string" ? message : message[0],
        };
      }
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Backend logout API request failed:", error);
    } finally {
      clearTokens();
      setIsAuthenticated(false);
      setUser(null);
      window.location.href = "/";
    }
  }, []);

  const getNewToken = useCallback(async (refreshToken: string) => {
    console.log(refreshToken);
  }, []);

  useEffect(() => {
    verify();
  }, [verify]);

  return (
    <authContext.Provider
      value={{
        isAuthenticated,
        user,
        register,
        login,
        logout,
        getNewToken,
        verify,
        loading,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
