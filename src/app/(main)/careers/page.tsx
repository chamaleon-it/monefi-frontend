import React from "react";
import CareersForm from "./CareersForm";

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
          <CareersForm />
          
        </div>
      </section>
    </main>
  );
}
