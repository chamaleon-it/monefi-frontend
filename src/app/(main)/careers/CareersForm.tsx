"use client"

import React, { useState } from "react";
import { ArrowRight, UploadCloud } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CareersZod } from "@/validator/careers.zod";
import toast from "react-hot-toast";

export default function CareersForm() {
  const [fileName, setFileName] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue
  } = useForm({
    resolver: zodResolver(CareersZod),
  });

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      if (data.message) formData.append("message", data.message);
      if (data.file && data.file[0]) formData.append("file", data.file[0]);

      const promise = fetch('/api/careers-email', {
        method: 'POST',
        body: formData,
      }).then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.error || "Failed to submit application");
        }
        return res.json();
      });

      await toast.promise(promise, {
        loading: "Submitting application...",
        success: "Application submitted successfully!",
        error: (err) => err.message || "Oops, something went wrong.",
      });

      reset();
      setFileName(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName(null);
    }
  };

  // We extract the rest of the register props so we can attach our own onChange for the display name
  const { onChange, ...fileProps } = register("file");

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-black/5">
      <h2 className="text-2xl font-bold mb-8 text-corporate-charcoal">
        Submit Your Information
      </h2>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-corporate-charcoal mb-2">
            Full Name *
          </label>
          <input
            {...register("name")}
            type="text"
            id="name"
            className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-corporate-gold focus:ring-1 focus:ring-corporate-gold outline-none transition-colors"
            placeholder="John Doe"
          />
          {errors.name && <p className="text-xs text-red-500 mt-1.5">{String(errors.name.message)}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-corporate-charcoal mb-2">
            Email Address *
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-corporate-gold focus:ring-1 focus:ring-corporate-gold outline-none transition-colors"
            placeholder="john@example.com"
          />
          {errors.email && <p className="text-xs text-red-500 mt-1.5">{String(errors.email.message)}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-corporate-charcoal mb-2">
            Upload Resume/CV *
          </label>
          {/* Wrap the entire box in a label so it's fully clickable */}
          <label
            htmlFor="file-upload"
            className="block mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-black/10 border-dashed rounded-xl hover:border-corporate-gold/50 transition-colors cursor-pointer bg-corporate-charcoal/5"
          >
            <div className="space-y-1 text-center">
              <UploadCloud className="mx-auto h-10 w-10 text-corporate-charcoal/40" />
              <div className="flex justify-center text-sm text-corporate-charcoal/80">
                <span className="font-medium text-corporate-gold hover:text-corporate-gold/80">
                  {fileName ? fileName : "Upload a file"}
                </span>
                {!fileName && <p className="pl-1">or drag and drop</p>}
              </div>
              <p className="text-xs text-corporate-charcoal/60">
                PDF, DOC, DOCX up to 10MB
              </p>
            </div>
            <input
              {...fileProps}
              id="file-upload"
              type="file"
              className="sr-only"
              onChange={(e) => {
                onChange(e);
                handleFileChange(e);
              }}
            />
          </label>
          {errors.file && <p className="text-xs text-red-500 mt-1.5">{String(errors.file.message)}</p>}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-corporate-charcoal mb-2">
            Message
          </label>
          <textarea
            {...register("message")}
            id="message"
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-corporate-gold focus:ring-1 focus:ring-corporate-gold outline-none transition-colors resize-none"
            placeholder="Tell us a little about yourself and your career goals..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 px-6 rounded-xl bg-corporate-gold text-corporate-charcoal font-bold hover:bg-corporate-gold/90 transition-all flex items-center justify-center group shadow-md disabled:opacity-70"
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
          {!isSubmitting && <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />}
        </button>
      </form>
    </div>
  );
}
