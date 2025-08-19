import FAQ from "@/sections/home/FAQ";
import {  Mail, PhoneCall } from "lucide-react";
import React from "react";
import Form from "./Form";



export default function ContactUsContent() {
  return (
    <>
      <section className="relative py-20 px-[5%] bg-gradient-to-br from-slate-50 via-white to-blue-50 min-h-screen overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-monefi-off-pink text-monefi-pink rounded-full text-sm font-medium mb-6">
              <Mail className="w-4 h-4 mr-2" />
              Get in Touch
            </div>
            <h1 className="text-4xl lg:text-7xl font-bold text-monefi-black mb-6">
              We&apos;d Love to Hear From You!
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              At MONEFI, we&apos;re always here to assist you with your financial needs. Whether you&apos;re looking for more
              information about our services, need advice, or are ready to take the next step toward financial
              empowerment, our team is just a message away.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white/80 backdrop-blur-sm p-8 lg:p-12 rounded-3xl shadow-2xl border border-white/20">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8">Send us a message</h2>

               <Form/>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-monefi-off-pink text-monefi-pink rounded-2xl flex items-center justify-center shadow-lg">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
                    <p className="text-gray-600 mb-3 leading-relaxed">We&apos;ll respond to your inquiry within 24 hours.</p>
                    <a
                      href="mailto:hello@monefi.co.uk"
                      className="text-monefi-pink font-semibold text-lg transition-colors"
                    >
                      hello@monefi.co.uk
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-monefi-off-pink text-monefi-pink rounded-2xl flex items-center justify-center shadow-lg">
                    <PhoneCall className="w-6 h-6 " />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
                    <p className="text-gray-600 mb-3 leading-relaxed">Our customer support team is available.</p>
                    <a
                      href="tel:0208 002 8761"
                      className="text-monefi-pink font-semibold text-lg transition-colors"
                    >
                      020 8002 8761
                    </a>
                  </div>
                </div>
              </div>

             

             
            </div>
          </div>
        </div>
      </section>

      <FAQ />
    </>
  );
}
