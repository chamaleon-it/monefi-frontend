"use client";

import { motion } from "framer-motion";

const approachSteps = [
  {
    title: "Long-Term Strategic Partnerships",
    desc: "We don't just invest capital; we invest expertise. We partner with founders who have long-term vision but need operational structure."
  },
  {
    title: "Operational Optimization",
    desc: "We deploy our internal systems and playbooks to streamline operations, reduce overhead, and increase profit margins."
  },
  {
    title: "Digital Transformation",
    desc: "We modernize legacy systems, implement AI-driven workflows, and scale digital infrastructure for exponential growth."
  },
  {
    title: "Sustainable Growth Focus",
    desc: "We prioritize cash flow, market dominance, and sustainable unit economics over rapid, unstable expansion."
  }
];

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="py-32 bg-corporate-white text-corporate-black border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          <div className="sticky top-32 self-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-corporate-gold font-semibold tracking-wide uppercase text-sm mb-4"
            >
              Investment Approach
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold leading-tight mb-6 font-serif"
            >
              Building Scalable <br className="hidden md:block"/> <span className="italic text-corporate-gold">Business Models.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-corporate-charcoal/80 leading-relaxed mb-8"
            >
              Our portfolio companies benefit from our proprietary scaling frameworks. We transition businesses from founder-led operations to system-led enterprises.
            </motion.p>
            
            {/* Abstract Graphic */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative w-full h-64 bg-corporate-charcoal rounded-3xl overflow-hidden mt-12 flex items-center justify-center group"
            >
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
              <div className="absolute w-64 h-64 bg-corporate-gold/20 rounded-full blur-[60px] group-hover:scale-110 transition-transform duration-700" />
              <div className="relative z-10 w-24 h-24 border border-corporate-gold/30 rounded-full flex items-center justify-center before:content-[''] before:absolute before:w-32 before:h-32 before:border before:border-corporate-gold/10 before:rounded-full before:animate-ping">
                <div className="w-12 h-12 bg-corporate-gold rounded-full" />
              </div>
            </motion.div>
          </div>

          <div className="space-y-16 lg:pt-16">
            {approachSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative pl-12 border-l border-corporate-charcoal/10"
              >
                <div className="absolute left-[-17px] top-0 w-8 h-8 rounded-full bg-corporate-white border-4 border-corporate-charcoal flex items-center justify-center">
                  <div className="w-2 h-2 bg-corporate-gold rounded-full" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-corporate-charcoal/70 text-lg leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
