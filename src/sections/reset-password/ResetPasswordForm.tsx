"use client"

import type React from "react"

import { motion } from "framer-motion"
// import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ResetPasswordZod } from "@/validator/reset-password.zod"
import { useSearchParams } from "next/navigation"
import toast from "react-hot-toast"
import api from "@/services/api"


export default function ResetPasswordForm() {
const searchParams = useSearchParams()
 
   const {register,handleSubmit,formState:{errors,isSubmitting}} = useForm({
     resolver:zodResolver(ResetPasswordZod),
     defaultValues:{
      token:searchParams.get('token') as string
     }
   })
 
 
   const onSubmit = handleSubmit(async(data)=>{
     try {
        await toast.promise(api.post('/users/reset-password',data),{
          loading:"Resetting your password…",
          error:err=>err.response.data.message || "Something went wrong. Please try again after some time. If the issue persists, contact our support team for assistance.",
          success:"Password is reset successfull"
        })
 
     } catch (error) {
       console.log(error);
     }
   })

  return (
    <div className="min-h-[calc(100vh-150px-50px)] bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-[#232323] mb-2">bakerjonesholdings.</h1>
          <p className="text-bakerjonesholdings-black">Your smart financial partner</p>
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-[#012A62] rounded-2xl shadow-xl p-8"
        >
          {/* Form Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Reset Password</h2>
            <p className="text-white/90 text-sm">Enter your password to reset your password</p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-5">
            {/* Email Field */}
                      {/* Password Field */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                      >
                        <label
                          htmlFor="password"
                          className="block text-white font-medium mb-2"
                        >
                          Password
                        </label>
                        <input
                          id="password"
                          type="password"
                          {...register("password")}
                          placeholder="Create a strong password"
                          className="w-full px-4 py-3 bg-white/95 border border-white/20 rounded-lg text-[#232323] placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                        />
                        {errors.password && (
                          <p className="text-red-700 text-sm mt-2.5">
                            {errors.password.message}
                          </p>
                        )}
                      </motion.div>
          
                      {/* Confirm Password Field */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                      >
                        <label
                          htmlFor="confirmPassword"
                          className="block text-white font-medium mb-2"
                        >
                          Confirm Password
                        </label>
                        <input
                          id="confirmPassword"
                          type="password"
                          {...register("confirmPassword")}
                          placeholder="Confirm your password"
                          className="w-full px-4 py-3 bg-white/95 border border-white/20 rounded-lg text-[#232323] placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                        />
                        {errors.confirmPassword && (
                          <p className="text-red-700 text-sm mt-2.5">
                            {errors.confirmPassword.message}
                          </p>
                        )}
                      </motion.div>

            
            

 {errors.root && (
              <p className="text-red-700 text-sm mt-2.5 text-center">
                {errors.root.message}
              </p>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white text-[#012A62] font-semibold py-3 px-4 rounded-lg hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#012A62] mr-2"></div>
                   Password reseting...
                </div>
              ) : (
                "Reset Password"
              )}
            </motion.button>
          </form>

          
        </motion.div>

        {/* Footer */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-gray-500 text-sm">Trusted • Secure • Built for Investors</p>
        </motion.div>
      </div>
    </div>
  )
}
