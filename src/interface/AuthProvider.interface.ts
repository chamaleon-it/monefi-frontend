import { UserStatus } from "@/enum/user-status.enum";
import { UserRoles } from "@/enum/user.enum";

export interface UserInterface {
  email: string;
  role: UserRoles;
  id: string;
  status: UserStatus;
  name?:string;
  balance:number;
}

export interface AuthContextInterface {
  user: UserInterface | null;
  register: (date: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => Promise<{
    status: "success" | "failed";
    message?: string;
    error?: string;
  }>;
  login: (data: { email: string; password: string }) => Promise<{
    status: "success" | "failed";
    message?: string;
    error?: string;
  }>;
  logout: () => void;
  getNewToken: (refreshToken: string) => void;
  verify: () => Promise<void>;
  loading: boolean;
  isAuthenticated: boolean;
}
