"use client";

import { motion } from "framer-motion";

export default function ContactCTASection() {

  return null

  return (
    <section className="py-32 bg-corporate-white text-corporate-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10 text-center">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-16 h-16 bg-corporate-charcoal rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl"
        >
          <div className="w-8 h-8 border-t-2 border-r-2 border-corporate-gold rounded-tr-lg" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-6xl font-bold leading-tight mb-8 tracking-tight font-serif"
        >
          Let's Build Long-Term <br className="hidden md:block" />
          <span className="text-corporate-gold italic font-medium">Value Together.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl text-corporate-charcoal/70 mb-12 max-w-2xl mx-auto"
        >
          Whether you're looking for strategic investment, a growth partnership, or an operational exit, we're ready to talk.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="bg-white p-8 md:p-12 rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.06)] border border-black/5 text-left"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-corporate-charcoal mb-2">Full Name</label>
              <input
                type="text"
                className="w-full bg-corporate-beige/10 border border-corporate-charcoal/10 rounded-xl px-4 py-3 focus:outline-none focus:border-corporate-gold focus:ring-1 focus:ring-corporate-gold transition-all"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-corporate-charcoal mb-2">Email Address</label>
              <input
                type="email"
                className="w-full bg-corporate-beige/10 border border-corporate-charcoal/10 rounded-xl px-4 py-3 focus:outline-none focus:border-corporate-gold focus:ring-1 focus:ring-corporate-gold transition-all"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-corporate-charcoal mb-2">Inquiry Type</label>
            <select className="w-full bg-corporate-beige/10 border border-corporate-charcoal/10 rounded-xl px-4 py-3 focus:outline-none focus:border-corporate-gold focus:ring-1 focus:ring-corporate-gold transition-all appearance-none">
              <option>Strategic Investment</option>
              <option>Business Acquisition</option>
              <option>Growth Partnership</option>
              <option>Other</option>
            </select>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-semibold text-corporate-charcoal mb-2">Message</label>
            <textarea
              rows={4}
              className="w-full bg-corporate-beige/10 border border-corporate-charcoal/10 rounded-xl px-4 py-3 focus:outline-none focus:border-corporate-gold focus:ring-1 focus:ring-corporate-gold transition-all resize-none"
              placeholder="Tell us about your business..."
            />
          </div>

          <button type="button" className="w-full bg-corporate-charcoal hover:bg-black text-white font-medium text-lg py-4 rounded-xl transition-colors shadow-lg shadow-black/10">
            Submit Inquiry
          </button>
        </motion.form>

      </div>
    </section>
  );
}
