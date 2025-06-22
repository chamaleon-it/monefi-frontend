"use client"

import type React from "react"

import { motion } from "framer-motion"
import Link from "next/link"
import { useAuth } from "@/auth/useAuth"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { UserLoginZod } from "@/validator/user-login.zod"

export default function LoginForm() {
 const {login,verify} = useAuth()
 
   const {register,handleSubmit,formState:{errors,isSubmitting}} = useForm({
     resolver:zodResolver(UserLoginZod)
   })
 
 
   const onSubmit = handleSubmit(async(data)=>{
     try {
   await login(data)
   await verify()
     } catch (error) {
       
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
          <h1 className="text-4xl font-bold text-[#232323] mb-2">monefi.</h1>
          <p className="text-gray-600">Your smart financial partner</p>
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-[#EC709A] rounded-2xl shadow-xl p-8"
        >
          {/* Form Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-white/90 text-sm">Enter your credentials to access your account</p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-5">
            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <label htmlFor="email" className="block text-white font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
               {...register("email")}
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-white/95 border border-white/20 rounded-lg text-[#232323] placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
              />
              {errors.email && <p className="text-red-700 text-sm mt-2.5">{errors.email.message}</p>}
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="text-white font-medium">
                  Password
                </label>
                <button
                  type="button"
                  className="text-sm text-white/90 hover:text-white underline transition-colors duration-200"
                >
                  Forgot password?
                </button>
              </div>
              <input
                id="password"
                type="password"
               {...register("password")}
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-white/95 border border-white/20 rounded-lg text-[#232323] placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
              />
              {errors.password && <p className="text-red-700 text-sm mt-2.5">{errors.password.message}</p>}
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white text-[#EC709A] font-semibold py-3 px-4 rounded-lg hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#EC709A] mr-2"></div>
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </motion.button>
          </form>

          {/* Register Link */}
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <p className="text-white/90 text-sm">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-white font-semibold underline hover:no-underline transition-all duration-200"
              >
                Sign up here
              </Link>
            </p>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-gray-500 text-sm">Secure • Trusted • FDIC Insured</p>
        </motion.div>
      </div>
    </div>
  )
}
