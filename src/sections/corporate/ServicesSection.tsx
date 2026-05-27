"use client";

import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Building2, Server, Cpu, Landmark, TrendingUp, Globe, Settings } from "lucide-react";
import Link from "next/link";

const services = [
  { icon: Briefcase, title: "Strategic Investments", desc: "Long-term capital allocation across high-growth markets." },
  { icon: Landmark, title: "Business Acquisitions", desc: "Acquiring established entities with scalable infrastructure." },
  { icon: Server, title: "Digital Infrastructure", desc: "Modernizing backend operations and cloud architecture." },
  { icon: Cpu, title: "AI & Automation Consulting", desc: "Implementing intelligent systems for operational efficiency." },
  { icon: Building2, title: "Real Estate Holdings", desc: "Premium commercial and digital real estate investments." },
  { icon: TrendingUp, title: "Growth Partnerships", desc: "Strategic joint ventures to accelerate market share." },
  { icon: Globe, title: "Brand & Digital Expansion", desc: "Scaling digital presence globally across new markets." },
  { icon: Settings, title: "Operational Systems Development", desc: "Building robust operational frameworks for scale." }
];

export default function ServicesSection() {
  return (
    <section className="py-32 bg-corporate-beige/20 text-corporate-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-corporate-gold font-semibold tracking-wide uppercase text-sm mb-4"
          >
            Capabilities
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold leading-tight font-serif"
          >
            Comprehensive Expertise for <br className="hidden md:block" />
            <span className="italic text-corporate-gold">Modern Growth</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white p-8 rounded-3xl border border-black/5 hover:border-corporate-gold/30 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full"
            >
              <div className="w-12 h-12 rounded-2xl bg-corporate-charcoal/5 flex items-center justify-center mb-6 group-hover:bg-corporate-gold/10 transition-colors">
                <service.icon className="w-6 h-6 text-corporate-charcoal group-hover:text-corporate-gold transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-corporate-charcoal/70 text-sm leading-relaxed mb-6 flex-grow">
                {service.desc}
              </p>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
