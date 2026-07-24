"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRegistrationZod } from "@/validator/user-registration.zod";
import { useAuth } from "@/auth/useAuth";
import { ShieldCheck, Lock, Mail, User, ArrowRight, Eye, EyeOff, Building2, CheckCircle2, TrendingUp, Sparkles } from "lucide-react";

export default function RegisterForm() {
  const { register: userRegister, login, verify } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(UserRegistrationZod),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { status, error } = await userRegister(data);
      if (status === "success") {
        await login({ email: data.email, password: data.password });
        await verify();
      } else {
        setError("root", { message: error });
      }
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className="relative min-h-[calc(100vh-80px)] lg:h-[calc(100vh-80px)] bg-[#F9F9F7] flex items-center justify-center p-4 lg:p-6 font-inter overflow-hidden">
      
      {/* Outer Executive Split Container */}
      <div className="w-full max-w-md lg:max-w-6xl h-full lg:max-h-[680px] bg-white rounded-3xl border border-slate-200/90 shadow-[0_25px_60px_rgba(8,35,72,0.09)] overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative z-10">
        
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
                Institutional Registration
              </span>
            </div>

            <h2 className="text-2xl lg:text-3xl font-serif font-bold text-white leading-tight mb-4">
              Join a Premier <span className="gold-gradient-text">Global Investment</span> Group
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
              Partner with Baker Jones Holdings to unlock bespoke private equity, capital markets, and structured wealth vehicles.
            </p>
          </div>

          {/* Middle Portfolio Highlights */}
          <div className="relative z-10 space-y-3 my-auto py-2">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">AUM Facilitation</span>
                <div className="text-xl font-serif font-bold text-white">$10B+ Under Management</div>
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
                <span className="text-[11px] text-slate-300">Segregated accounts</span>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-1.5 text-[#C5A880] mb-1">
                  <Lock className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">256-Bit SSL</span>
                </div>
                <span className="text-[11px] text-slate-300">Bank-level security</span>
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

        {/* RIGHT COLUMN: Pristine Luxury Register Form */}
        <div className="col-span-1 lg:col-span-7 bg-white p-6 sm:p-8 lg:p-10 flex flex-col justify-between relative">
          {/* Top Gold Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C5A880] to-transparent"></div>

          <div>
            {/* Header */}
            <div className="mb-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A880]/15 text-[#9E7D3B] border border-[#C5A880]/30 font-bold text-[10px] uppercase tracking-widest mb-2.5">
                <Building2 className="w-3.5 h-3.5" />
                Baker Jones Holdings
              </div>
              
              <h1 className="text-2xl lg:text-3xl font-serif font-bold text-[#082348] tracking-tight mb-1">
                Account Registration
              </h1>
              <p className="text-slate-500 text-xs sm:text-sm">
                Complete your details to apply for portal access
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-3.5">
              {/* Full Name Field */}
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label htmlFor="fullname" className="block text-[11px] uppercase font-bold tracking-wider text-slate-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4 text-[#C5A880]" />
                  </div>
                  <input
                    id="fullname"
                    type="text"
                    {...register("name")}
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[#082348] placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none focus:bg-white focus:border-[#C5A880] focus:ring-2 focus:ring-[#C5A880]/20 transition-all"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                    <span className="inline-block w-1 h-1 rounded-full bg-red-600"></span>
                    {errors.name.message as string}
                  </p>
                )}
              </motion.div>

              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 }}
              >
                <label htmlFor="email" className="block text-[11px] uppercase font-bold tracking-wider text-slate-700 mb-1">
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
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[#082348] placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none focus:bg-white focus:border-[#C5A880] focus:ring-2 focus:ring-[#C5A880]/20 transition-all"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                    <span className="inline-block w-1 h-1 rounded-full bg-red-600"></span>
                    {errors.email.message as string}
                  </p>
                )}
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <label htmlFor="password" className="block text-[11px] uppercase font-bold tracking-wider text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4 text-[#C5A880]" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    placeholder="Create a strong password"
                    className="w-full pl-10 pr-11 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[#082348] placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none focus:bg-white focus:border-[#C5A880] focus:ring-2 focus:ring-[#C5A880]/20 transition-all"
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
                  <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                    <span className="inline-block w-1 h-1 rounded-full bg-red-600"></span>
                    {errors.password.message as string}
                  </p>
                )}
              </motion.div>

              {/* Confirm Password Field */}
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.15 }}
              >
                <label htmlFor="confirmPassword" className="block text-[11px] uppercase font-bold tracking-wider text-slate-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4 text-[#C5A880]" />
                  </div>
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirmPassword")}
                    placeholder="Confirm your password"
                    className="w-full pl-10 pr-11 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[#082348] placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none focus:bg-white focus:border-[#C5A880] focus:ring-2 focus:ring-[#C5A880]/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                    <span className="inline-block w-1 h-1 rounded-full bg-red-600"></span>
                    {errors.confirmPassword.message as string}
                  </p>
                )}
              </motion.div>

              {/* Terms and Conditions Checkbox */}
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="pt-1"
              >
                <label className="flex items-start gap-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    {...register("terms")}
                    className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#C5A880] focus:ring-[#C5A880] accent-[#C5A880] cursor-pointer shrink-0"
                  />
                  <span className="text-xs text-slate-600 leading-snug">
                    I agree to the{" "}
                    <Link href="/terms" target="_blank" className="text-[#C5A880] hover:text-[#9E7D3B] font-semibold underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" target="_blank" className="text-[#C5A880] hover:text-[#9E7D3B] font-semibold underline">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
                {errors.terms && (
                  <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                    <span className="inline-block w-1 h-1 rounded-full bg-red-600"></span>
                    {errors.terms.message as string}
                  </p>
                )}
              </motion.div>

              {/* Root / General Error */}
              {errors.root && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs text-center font-medium"
                >
                  {errors.root.message as string}
                </motion.div>
              )}

              {/* Submit CTA Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full gold-gradient-bg text-slate-950 font-bold py-3 px-5 rounded-xl hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-[#C5A880]/50 transition-all duration-300 disabled:opacity-60 shadow-[0_8px_20px_rgba(197,168,128,0.3)] flex items-center justify-center gap-2 text-xs uppercase tracking-wider cursor-pointer mt-2"
                whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-slate-950 border-t-transparent"></div>
                    <span>Creating account...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <span>Create Institutional Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </motion.button>
            </form>
          </div>

          {/* Footer Access Link & Security Badges */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <span>
              Already have an account?{" "}
              <Link href="/login" className="text-[#C5A880] hover:text-[#9E7D3B] font-bold transition-colors underline">
                Sign in here
              </Link>
            </span>

            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider text-slate-600">
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" /> 256-Bit SSL</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" /> 2FA Ready</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

