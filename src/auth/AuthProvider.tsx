"use client";

import {
  AuthContextInterface,
  UserInterface,
} from "@/interface/AuthProvider.interface";
import api, { clearTokens, setTokens } from "@/services/api";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect,useState } from "react";

export const authContext = React.createContext<
  undefined | AuthContextInterface
>(undefined);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<UserInterface | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const verify = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      const { data } = await api.get("/users/profile");
      const { _id, email, role, status } = data.data;
      setUser({ id: _id, email, role, status });
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(
    async (data: {
      email: string;
      password: string;
    }): Promise<{
      status: "success" | "failed";
      message?: string;
      error?: string;
    }> => {
      try {
        const res = await api.post("/auth", data);
        setTokens(res.data.data.accessToken, res.data.data.refreshToken);
        return {
          status: "success",
          message: "Login successfull",
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
      setIsAuthenticated(false);
      setUser(null);
      clearTokens();
      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  }, [router]);

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
