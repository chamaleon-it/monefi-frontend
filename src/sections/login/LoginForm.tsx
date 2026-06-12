"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useAuth } from "@/auth/useAuth"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { UserLoginZod } from "@/validator/user-login.zod"
import Link from "next/link"
import usePaths from "@/hooks/usePaths"
import * as z from "zod"

const LoginWith2FAZod = UserLoginZod.extend({
  twoFactorCode: z.string().optional(),
})

export default function LoginForm() {
  const { auth: { forgotPassword } } = usePaths()
  const { login, verify } = useAuth()
  const [requires2FA, setRequires2FA] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm({
    resolver: zodResolver(LoginWith2FAZod)
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { status, error } = await login(data)
      if (status === "success") {
        await verify()
      } else if (status === "requires2FA") {
        setRequires2FA(true)
      } else {
        setError("root", { message: error })
      }
    } catch (error) {
      console.log(error);
    }
  })

  return (
    <div className="min-h-[calc(100vh-150px-50px)] bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-[#232323] mb-2">Baker Jones Holdings</h1>
          <p className="text-bakerjonesholdings-black">Your smart financial partner</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-[#1f1f1f] rounded-2xl shadow-xl p-8"
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-white/90 text-sm">
              {requires2FA ? "Enter your 2FA code" : "Enter your credentials to access your account"}
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            {!requires2FA ? (
              <>
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

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="password" className="text-white font-medium">
                      Password
                    </label>
                    <Link
                      href={forgotPassword}
                      className="text-sm text-white/90 hover:text-white underline transition-colors duration-200"
                    >
                      Forgot password?
                    </Link>
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
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <label htmlFor="twoFactorCode" className="block text-white font-medium mb-2">
                  Authenticator Code
                </label>
                <input
                  id="twoFactorCode"
                  type="text"
                  maxLength={6}
                  {...register("twoFactorCode")}
                  placeholder="Enter 6-digit code"
                  className="w-full px-4 py-3 bg-white/95 border border-white/20 rounded-lg text-[#232323] placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200 text-center tracking-widest text-lg"
                />
                {errors.twoFactorCode && <p className="text-red-700 text-sm mt-2.5">{errors.twoFactorCode.message}</p>}
              </motion.div>
            )}

            {errors.root && (
              <p className="text-red-700 text-sm mt-2.5 text-center">
                {errors.root.message}
              </p>
            )}

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white text-[#1f1f1f] font-semibold py-3 px-4 rounded-lg hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#1f1f1f] mr-2"></div>
                  {requires2FA ? "Verifying..." : "Signing in..."}
                </div>
              ) : (
                requires2FA ? "Verify" : "Sign In"
              )}
            </motion.button>
            
            {requires2FA && (
              <div className="text-center mt-4">
                <button 
                  type="button" 
                  onClick={() => setRequires2FA(false)}
                  className="text-white/70 text-sm underline hover:text-white"
                >
                  Back to login
                </button>
              </div>
            )}
          </form>
        </motion.div>

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
