"use client"

import api from "@/services/api";
import { ContactUsZod } from "@/validator/contatc-us.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function Form() {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(ContactUsZod),
  });

  const formSubmit = handleSubmit(async (data) => {
    try {
        await toast.promise(api.post('/contact-us',data),
    {
        loading:"We are sending your message.",
        error:"Oops, We have a issue with connections.",
        success:"You message is successfully received."
    }
    )
    } catch (error) {
        console.log(error);
    }
  });
  return (
    <form className="space-y-6" onSubmit={formSubmit}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="group">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            First Name
          </label>
          <input
          {...register("firstName")}
            type="text"
            className="w-full h-14 px-6 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:bg-white transition-all duration-300 outline-none text-gray-900 placeholder-gray-500"
            placeholder="Enter your first name"
          />
          {errors.firstName && <p className="text-xs text-red-500 mt-1.5">{errors.firstName.message}</p>}
        </div>
        <div className="group">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Last Name
          </label>
          <input
          {...register("lastName")}
            type="text"
            className="w-full h-14 px-6 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:bg-white transition-all duration-300 outline-none text-gray-900 placeholder-gray-500"
            placeholder="Enter your last name"
          />
            {errors.lastName && <p className="text-xs text-red-500 mt-1.5">{errors.lastName.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="group">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Email Address
          </label>
          <input
          {...register("email")}
            type="email"
            className="w-full h-14 px-6 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:bg-white transition-all duration-300 outline-none text-gray-900 placeholder-gray-500"
            placeholder="Enter your email address"
          />
            {errors.email && <p className="text-xs text-red-500 mt-1.5">{errors.email.message}</p>}
        </div>
        <div className="group">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Phone Number
          </label>
          <input
          {...register("phoneNumber")}
            type="tel"
            className="w-full h-14 px-6 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:bg-white transition-all duration-300 outline-none text-gray-900 placeholder-gray-500"
            placeholder="Enter your phone number"
          />
            {errors.phoneNumber && <p className="text-xs text-red-500 mt-1.5">{errors.phoneNumber.message}</p>}
        </div>
      </div>

      <div className="group">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Message
        </label>
        <textarea
        {...register("message")}
          rows={6}
          className="w-full p-6 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:bg-white transition-all duration-300 outline-none text-gray-900 placeholder-gray-500 resize-none"
          placeholder="Tell us how we can help you..."
        />
          {errors.message && <p className="text-xs text-red-500 mt-1.5">{errors.message.message}</p>}
      </div>

      <div className="flex items-start gap-4">
        <input
        required
          type="checkbox"
          id="privacy"
          className="w-5 h-5 mt-1 accent-blue-600 rounded"
        />
        <label
          htmlFor="privacy"
          className="text-sm text-gray-600 leading-relaxed"
        >
          I agree to the{" "}
          <a
            href="#"
            className="text-blue-600 hover:text-blue-700 font-medium underline"
          >
            privacy policy
          </a>{" "}
          and consent to being contacted by MONEFI.
        </label>
      </div>

      <button
        type="submit"
        className="w-full h-16 bg-monefi-off-pink text-monefi-pink font-bold text-lg rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
        disabled={isSubmitting}
      >
        Send Message
      </button>
    </form>
  );
}
