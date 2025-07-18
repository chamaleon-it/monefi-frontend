"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Landmark, HeartHandshake } from 'lucide-react'
import Image from 'next/image'

export default function Section4() {
  const sections = [
    {
      title: "Estate & Legacy Planning",
      icon: <Landmark className="w-10 h-10 text-monefi-pink" />,
      image: "/financial-planning/new/2.jpg",
      content: `Leaving a meaningful legacy is about more than just passing on wealth—it’s about ensuring your values, intentions, and hard-earned assets are protected and preserved for the next generation. Our Estate and Legacy Planning service is designed to help you take control of your future by creating a clear, legally sound strategy that reflects your wishes. We work closely with you to structure your estate in a way that minimises inheritance tax, protects your assets from potential risks, and ensures a smooth transfer of wealth to your loved ones. Whether you have a complex estate or simply want peace of mind, our expert team offers thoughtful, personalised guidance to help you leave a lasting impact—securely, efficiently, and with complete clarity.`
    },
    {
      title: "Life Goals & Financial Problem Solving",
      icon: <HeartHandshake className="w-10 h-10 text-monefi-pink" />,
      image: "/financial-planning/new/3.jpg",
      content: `Life doesn't follow a straight financial path—it's full of goals, challenges, and opportunities that require thoughtful planning and expert support. Our Life Goals and Financial Problem Solving service is designed to help you navigate the financial aspects of life's major decisions with confidence and clarity. Whether you're planning to buy your first home, start a business, fund your child’s education, manage debt, or simply gain better control over your finances, we work with you to create practical, flexible strategies tailored to your unique situation. Our approach combines deep financial expertise with a real-world understanding of personal and business goals, ensuring that your financial plan adapts as your life evolves. Whatever your ambition or obstacle, we’re here to turn your vision into a well-structured plan—and your goals into lasting success.`
    }
  ]

  return (
    <section className="bg-monefi-black py-16 px-4 md:px-10">
      <div className="max-w-6xl mx-auto space-y-16">
        {sections.map((section, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: idx * 0.2 }}
            className="bg-monefi-off-pink text-monefi-black rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row"
          >
            <Image
            width={576}
            height={406}
              src={section.image}
              alt={section.title}
              className="w-full md:w-1/2 h-64 md:h-auto object-cover"
            />
            <div className="p-8 flex-1 flex flex-col justify-center">
              <div className="flex items-center mb-4">
                {section.icon}
                <h3 className="ml-3 text-2xl font-semibold ">
                  {section.title}
                </h3>
              </div>
              <p className=" leading-relaxed">{section.content}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}