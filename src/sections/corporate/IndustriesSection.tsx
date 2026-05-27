"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const industries = [
  { name: "Technology", span: "col-span-1 md:col-span-2 row-span-2", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop" },
  { name: "Real Estate", span: "col-span-1 row-span-1", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" },
  { name: "AI & SaaS", span: "col-span-1 row-span-1", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop" },
  { name: "Infrastructure", span: "col-span-1 row-span-2", img: "/home/blabla.png" },
  { name: "Financial Services", span: "col-span-1 md:col-span-2 row-span-1", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" },
  { name: "Digital Commerce", span: "col-span-1 row-span-1", img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop" },
  { name: "Healthcare", span: "col-span-1 row-span-1", img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=2070&auto=format&fit=crop" },
];

export default function IndustriesSection() {
  return (
    <section className="py-32 bg-corporate-charcoal text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold leading-tight mb-4 font-serif"
            >
              Transforming Key <br className="hidden md:block" />
              <span className="text-corporate-gold italic">Global Industries.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white/70 text-lg leading-relaxed"
            >
              We focus on high-impact sectors where strategic capital and digital infrastructure create outsized returns.
            </motion.p>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 h-auto md:h-[800px]">
          {industries.map((ind, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`relative rounded-3xl overflow-hidden group ${ind.span} h-64 md:h-auto`}
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-10" />
              <img
                src={ind.img}
                alt={ind.name}
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 z-20 p-8 flex items-end">
                <h3 className="text-2xl font-bold text-white drop-shadow-md translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {ind.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
