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
import { ShieldCheck, Lock, Mail, KeyRound, ArrowRight, Eye, EyeOff, Building2, CheckCircle2, TrendingUp, Sparkles, Shield } from "lucide-react"

const LoginWith2FAZod = UserLoginZod.extend({
  twoFactorCode: z.string().optional(),
})

export default function LoginForm() {
  const { auth: { forgotPassword } } = usePaths()
  const { login, verify } = useAuth()
  const [requires2FA, setRequires2FA] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

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
    <div className="relative min-h-[calc(100vh-80px)] lg:h-[calc(100vh-80px)] bg-[#F9F9F7] flex items-center justify-center p-4 lg:p-6 font-inter overflow-hidden">
      
      {/* Outer Executive Split Container */}
      <div className="w-full max-w-md lg:max-w-6xl h-full lg:max-h-[640px] bg-white rounded-3xl border border-slate-200/90 shadow-[0_25px_60px_rgba(8,35,72,0.09)] overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative z-10">
        
        {/* LEFT COLUMN: Institutional Showcase & Accolades (Hidden on Mobile, Visible on Desktop lg) */}
        <div className="hidden lg:flex lg:col-span-5 bg-[#082348] text-white p-8 lg:p-10 relative overflow-hidden flex-col justify-between">
          
          {/* Background Photography & Radial Lighting */}
          <div className="absolute inset-0 pointer-events-none">
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
              alt="Financial District" 
              className="w-full h-full object-cover opacity-15 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#082348]/95 via-[#082348]/90 to-[#082348]"></div>
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#C5A880]/20 rounded-full blur-3xl"></div>
          </div>

          {/* Top Brand Pill */}
          <div className="relative z-10">
            <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880] mr-2" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#F3E5AB]">
                Institutional Portal
              </span>
            </div>

            <h2 className="text-2xl lg:text-3xl font-serif font-bold text-white leading-tight mb-4">
              Empowering Capital Through <span className="gold-gradient-text">Strategic Value</span>
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
              Access real-time portfolio performance, encrypted treasury management, and private equity deal allocation.
            </p>
          </div>

          {/* Middle Portfolio Highlights */}
          <div className="relative z-10 space-y-3 my-auto py-2">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total AUM Facilitated</span>
                <div className="text-xl font-serif font-bold text-white">$10B+ Allocated</div>
              </div>
              <div className="w-9 h-9 rounded-xl gold-gradient-bg text-slate-950 flex items-center justify-center font-bold">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-1.5 text-[#C5A880] mb-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">Tier-1 Custody</span>
                </div>
                <span className="text-[11px] text-slate-300">Bank-grade security</span>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-1.5 text-[#C5A880] mb-1">
                  <Lock className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">256-Bit SSL</span>
                </div>
                <span className="text-[11px] text-slate-300">End-to-End Encrypted</span>
              </div>
            </div>
          </div>

          {/* Bottom Accreditation Bar */}
          <div className="relative z-10 border-t border-white/10 pt-4 mt-auto">
            <span className="text-[9px] uppercase font-bold text-slate-400 tracking-widest block mb-2">
              Recognized Across Financial Outlets
            </span>
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-300 opacity-90">
              <span className="hover:text-white transition-colors">Bloomberg</span>
              <span className="text-[#C5A880]">•</span>
              <span className="hover:text-white transition-colors">Yahoo! Finance</span>
              <span className="text-[#C5A880]">•</span>
              <span className="hover:text-white transition-colors">Financial Times</span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Pristine Luxury Login Form (Full width on mobile, 7/12 cols on desktop) */}
        <div className="col-span-1 lg:col-span-7 bg-white p-6 sm:p-8 lg:p-12 flex flex-col justify-between relative">
          {/* Top Gold Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C5A880] to-transparent"></div>

          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A880]/15 text-[#9E7D3B] border border-[#C5A880]/30 font-bold text-[10px] uppercase tracking-widest mb-3">
                <Building2 className="w-3.5 h-3.5" />
                Baker Jones Holdings
              </div>
              
              <h1 className="text-2xl lg:text-3xl font-serif font-bold text-[#082348] tracking-tight mb-1">
                {requires2FA ? "Two-Factor Verification" : "Investor Portal Sign In"}
              </h1>
              <p className="text-slate-500 text-xs sm:text-sm">
                {requires2FA
                  ? "Enter your 6-digit authenticator code below to continue"
                  : "Enter your corporate credentials to access your account"}
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              {!requires2FA ? (
                <>
                  {/* Email Field */}
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label htmlFor="email" className="block text-[11px] uppercase font-bold tracking-wider text-slate-700 mb-1.5">
                      Corporate Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Mail className="w-4 h-4 text-[#C5A880]" />
                      </div>
                      <input
                        id="email"
                        type="email"
                        {...register("email")}
                        placeholder="name@institution.com"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[#082348] placeholder:text-slate-400 text-sm focus:outline-none focus:bg-white focus:border-[#C5A880] focus:ring-2 focus:ring-[#C5A880]/20 transition-all"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1">
                        <span className="inline-block w-1 h-1 rounded-full bg-red-600"></span>
                        {errors.email.message}
                      </p>
                    )}
                  </motion.div>

                  {/* Password Field */}
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <label htmlFor="password" className="block text-[11px] uppercase font-bold tracking-wider text-slate-700">
                        Password
                      </label>
                      <Link
                        href={forgotPassword}
                        className="text-xs text-[#C5A880] hover:text-[#9E7D3B] font-semibold transition-colors hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Lock className="w-4 h-4 text-[#C5A880]" />
                      </div>
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        {...register("password")}
                        placeholder="••••••••••••"
                        className="w-full pl-10 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[#082348] placeholder:text-slate-400 text-sm focus:outline-none focus:bg-white focus:border-[#C5A880] focus:ring-2 focus:ring-[#C5A880]/20 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1">
                        <span className="inline-block w-1 h-1 rounded-full bg-red-600"></span>
                        {errors.password.message}
                      </p>
                    )}
                  </motion.div>
                </>
              ) : (
                /* 2FA Field */
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label htmlFor="twoFactorCode" className="block text-[11px] uppercase font-bold tracking-wider text-[#C5A880] mb-1.5 text-center">
                    Authenticator Code
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#C5A880]">
                      <KeyRound className="w-4 h-4" />
                    </div>
                    <input
                      id="twoFactorCode"
                      type="text"
                      maxLength={6}
                      {...register("twoFactorCode")}
                      placeholder="000000"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-[#C5A880]/50 rounded-xl text-[#082348] placeholder:text-slate-300 focus:outline-none focus:border-[#C5A880] focus:ring-2 focus:ring-[#C5A880]/30 transition-all text-center tracking-[0.4em] font-mono text-lg"
                    />
                  </div>
                  {errors.twoFactorCode && (
                    <p className="text-red-600 text-xs mt-1.5 text-center">
                      {errors.twoFactorCode.message}
                    </p>
                  )}
                </motion.div>
              )}

              {/* Root / General Error */}
              {errors.root && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs text-center font-medium"
                >
                  {errors.root.message}
                </motion.div>
              )}

              {/* Submit CTA Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full gold-gradient-bg text-slate-950 font-bold py-3.5 px-6 rounded-xl hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-[#C5A880]/50 transition-all duration-300 disabled:opacity-60 shadow-[0_10px_25px_rgba(197,168,128,0.3)] flex items-center justify-center gap-2 text-xs uppercase tracking-wider cursor-pointer mt-2"
                whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-slate-950 border-t-transparent"></div>
                    <span>{requires2FA ? "Verifying..." : "Authenticating..."}</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <span>{requires2FA ? "Verify Security Code" : "Sign In to Portal"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </motion.button>

              {requires2FA && (
                <div className="text-center mt-2">
                  <button
                    type="button"
                    onClick={() => setRequires2FA(false)}
                    className="text-slate-500 text-xs hover:text-[#082348] underline transition-colors"
                  >
                    Return to email & password
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Footer Access Link & Security Badges */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <span>
              Don't have an account?{" "}
              <Link href="/application-form" className="text-[#C5A880] hover:text-[#9E7D3B] font-bold transition-colors underline">
                Apply for Access
              </Link>
            </span>

            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider text-slate-600">
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" /> 256-Bit SSL</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" /> 2FA Verified</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

