import React from "react";
import { ArrowRight, UploadCloud } from "lucide-react";

export const metadata = {
  title: "Careers | Baker Jones Holdings",
  description: "Join Baker Jones Holdings and work across diverse sectors like technology, real estate, and financial services.",
};

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-corporate-white pb-32">
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 bg-corporate-charcoal overflow-hidden text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-corporate-gold/20 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-corporate-gold font-semibold tracking-wide uppercase text-sm mb-6">
            Careers
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6 leading-tight max-w-3xl">
            Join Baker Jones Holdings
          </h1>
          <p className="text-xl md:text-2xl text-white/80 font-light max-w-2xl leading-relaxed">
            Build your career with a firm committed to growth, innovation, and long-term value creation.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 -mt-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left Column: Text */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-black/5 h-fit">
            <h2 className="text-3xl font-bold mb-6 text-corporate-charcoal font-serif">
              Our Culture & Values
            </h2>
            <div className="space-y-6 text-lg text-corporate-charcoal/80 leading-relaxed">
              <p>
                At Baker Jones Holdings, we are always interested in connecting with talented professionals who share our commitment to growth, innovation, and long-term value creation.
              </p>
              <p>
                We offer opportunities to work across diverse sectors, including technology, real estate, digital infrastructure, financial services, AI & SaaS, and digital commerce. Our culture is built on collaboration, integrity, and a forward-thinking approach to business.
              </p>
              <p>
                Whether you are an experienced professional or an emerging talent, we welcome individuals who are driven, ambitious, and eager to make an impact.
              </p>
              <p className="font-medium text-corporate-charcoal">
                If you are interested in future opportunities with Baker Jones Holdings, we encourage you to submit your details and connect with our team.
              </p>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-black/5">
            <h2 className="text-2xl font-bold mb-8 text-corporate-charcoal">
              Submit Your Information
            </h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-corporate-charcoal mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-corporate-gold focus:ring-1 focus:ring-corporate-gold outline-none transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-corporate-charcoal mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-corporate-gold focus:ring-1 focus:ring-corporate-gold outline-none transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-corporate-charcoal mb-2">
                  Upload Resume/CV *
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-black/10 border-dashed rounded-xl hover:border-corporate-gold/50 transition-colors cursor-pointer bg-corporate-charcoal/5">
                  <div className="space-y-1 text-center">
                    <UploadCloud className="mx-auto h-10 w-10 text-corporate-charcoal/40" />
                    <div className="flex text-sm text-corporate-charcoal/80">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-medium text-corporate-gold hover:text-corporate-gold/80 focus-within:outline-none"
                      >
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" required />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-corporate-charcoal/60">
                      PDF, DOCX up to 10MB
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-corporate-charcoal mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-corporate-gold focus:ring-1 focus:ring-corporate-gold outline-none transition-colors resize-none"
                  placeholder="Tell us a little about yourself and your career goals..."
                ></textarea>
              </div>

              <button
                type="button"
                className="w-full py-4 px-6 rounded-xl bg-corporate-gold text-corporate-charcoal font-bold hover:bg-corporate-gold/90 transition-all flex items-center justify-center group shadow-md"
              >
                Submit Application
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
          
        </div>
      </section>
    </main>
  );
}
