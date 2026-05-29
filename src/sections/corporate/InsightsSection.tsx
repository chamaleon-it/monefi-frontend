"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const insights = [
  {
    category: "AI & Business Growth",
    title: "How Automation is Redefining the Middle Market",
    date: "Jan 09, 2026",
    readTime: "5 min read",
    img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop",
    link: "https://www.forbes.com/councils/forbesbusinesscouncil/2026/01/09/how-automation-is-redefining-survival-for-mid-sized-logistics/"
  },
  {
    category: "Investment Trends",
    title: "Cloud Computing – The Digital Backbone of the Economy",
    date: "Mar 24, 2026",
    readTime: "7 min read",
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop",
    link: "https://digital-strategy.ec.europa.eu/en/policies/cloud-computing"
  },
  // {
  //   category: "Strategic Scaling",
  //   title: "Why Operational Systems Outperform Capital Injections",
  //   date: "Sep 28, 2024",
  //   readTime: "6 min read",
  //   img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
  // }
];

export default function InsightsSection() {
  return (
    <section className="py-32 bg-corporate-beige/10 text-corporate-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-corporate-gold font-semibold tracking-wide uppercase text-sm mb-4"
            >
              Modern Insights
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold leading-tight font-serif"
            >
              Perspectives on <span className="italic text-corporate-gold">Growth.</span>
            </motion.h2>
          </div>
          {/* <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link href="#" className="inline-flex items-center text-corporate-charcoal hover:text-corporate-gold font-medium transition-colors">
              View All Insights <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {insights.map((insight, index) => (
            <motion.a
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
              href={insight.link}
              target="_blank"
            >
              <div className="relative h-64 w-full rounded-2xl overflow-hidden mb-6">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500 z-10" />
                <img
                  src={insight.img}
                  alt={insight.title}
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="flex items-center gap-4 text-xs font-medium text-corporate-charcoal/60 uppercase tracking-wider mb-4">
                <span className="text-corporate-gold">{insight.category}</span>
                <span>•</span>
                <span>{insight.readTime}</span>
              </div>
              <h3 className="text-2xl font-bold text-corporate-black mb-4 group-hover:text-corporate-gold transition-colors duration-300">
                {insight.title}
              </h3>
              <div className="text-sm text-corporate-charcoal/60">
                {insight.date}
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}
