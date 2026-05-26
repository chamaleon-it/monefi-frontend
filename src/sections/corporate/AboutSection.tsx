"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="py-32 bg-corporate-white text-corporate-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight font-serif">
              Strategic Capital for <br className="hidden md:block" />
              <span className="text-corporate-gold italic">Sustainable Scale.</span>
            </h2>
            <p className="text-lg text-corporate-charcoal/80 mb-6 leading-relaxed">
              Baker Jones Holdings is a modern investment and holdings company focused on acquiring, supporting, and scaling businesses with long-term growth potential.
            </p>
            <p className="text-lg text-corporate-charcoal/80 leading-relaxed">
              We combine strategic capital, digital expertise, operational systems, and modern infrastructure to help businesses scale sustainably in evolving markets.
            </p>
          </motion.div>

          {/* Right: Counters and Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-8"
          >
            <div className="p-8 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/5">
              <div className="text-4xl lg:text-5xl font-bold text-corporate-black mb-2">15+</div>
              <div className="text-sm font-medium text-corporate-charcoal/60 uppercase tracking-wider">Years Expertise</div>
            </div>

            <div className="p-8 bg-corporate-charcoal text-white rounded-3xl shadow-xl">
              <div className="text-4xl lg:text-5xl font-bold text-corporate-gold mb-2">24</div>
              <div className="text-sm font-medium text-white/60 uppercase tracking-wider">Strategic Partners</div>
            </div>

            <div className="p-8 bg-corporate-beige/30 rounded-3xl border border-black/5">
              <div className="text-4xl lg:text-5xl font-bold text-corporate-black mb-2">6</div>
              <div className="text-sm font-medium text-corporate-charcoal/60 uppercase tracking-wider">Investment Sectors</div>
            </div>

            <div className="p-8 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/5">
              <div className="text-4xl lg:text-5xl font-bold text-corporate-black mb-2">$50M+</div>
              <div className="text-sm font-medium text-corporate-charcoal/60 uppercase tracking-wider">Assets Managed</div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
