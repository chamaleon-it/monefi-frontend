"use client"

import React, { useState } from "react";
import { Shield, Lock, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangePasswordZod } from "@/validator/change-password.zod";
import toast from "react-hot-toast";
import api from "@/services/api";

export default function ChangePassword() {
  const [showPassword, setShowPassword] = useState(false);

  const {formState:{errors,isSubmitting},register,handleSubmit,setError,reset} = useForm({
    resolver:zodResolver(ChangePasswordZod)
  })

  const changePassword = handleSubmit(async (data)=>{
    try {
          await toast.promise(api.patch('/users/change_password',data),{
            loading:"Changing the password...",
            success:"Password is changed.",
            error:"Error occure during the password change."
        })
        reset()
    } catch (error) {
        const { message:err } = (
          error as { response: { data: { message: string | string[] } } }
        )?.response?.data;

        const message = typeof err === "string" ? err : err[0]

        setError("root",{message})
    }
  })

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2 mb-2">
          <Shield className="h-5 w-5 text-bakerjonesholdings-pink" />
          <h2 className="text-xl font-semibold text-[#232323]">Security</h2>
        </div>
        <p className="text-gray-600">
          Manage your password and security preferences
        </p>
      </div>
      <form className="p-6 space-y-6" onSubmit={changePassword}>
        <div className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Current Password
            </label>
            <div className="relative">
              <input
              {...register("currentPassword")}
                id="currentPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Enter current password"
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#86BBD8] focus:border-transparent"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.currentPassword && <p className="text-sm text-red-500">{errors.currentPassword.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
              {...register("password")}
                id="newPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#86BBD8] focus:border-transparent"
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>
            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
              {...register("confirmPassword")}
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm new password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#86BBD8] focus:border-transparent"
              />
              {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
            </div>
          </div>
        </div>
                {errors.root && <p className="text-sm text-red-500">{errors.root.message}</p>}
        <button className="flex items-center space-x-2 px-4 py-2 bg-bakerjonesholdings-pink hover:bg-bakerjonesholdings-pink/90 text-white rounded-md transition-colors" disabled={isSubmitting}>
          <Lock className="h-4 w-4" />
          <span>{isSubmitting ? "Changing Password..." : "Update Security Settings"}</span>
        </button>
      </form>
    </div>
  );
}
