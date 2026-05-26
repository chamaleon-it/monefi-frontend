"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const points = [
  "Long-Term Vision",
  "Strategic Execution",
  "Digital-First Approach",
  "Operational Expertise",
  "Scalable Infrastructure",
  "Modern Growth Systems"
];

export default function WhyWorkWithUsSection() {
  return (
    <section className="py-32 bg-corporate-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-corporate-gold/10 via-corporate-black to-corporate-black" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold leading-tight mb-6 font-serif"
          >
            Why Partner With <br className="hidden md:block"/>
            <span className="text-corporate-gold italic">Baker Jones Holdings.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/70 text-lg leading-relaxed"
          >
            We bring more than just capital. We bring a modern ecosystem designed for the next decade of business.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group p-1 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 hover:from-corporate-gold/50 hover:to-white/5 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-corporate-gold/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              <div className="relative h-full bg-corporate-charcoal px-8 py-10 rounded-xl flex flex-col justify-center items-center text-center">
                <CheckCircle2 className="w-10 h-10 text-corporate-gold mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-bold text-white/90 group-hover:text-white transition-colors">{point}</h3>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
