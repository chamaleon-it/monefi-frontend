"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Section3() {
  return (
    <section className="bg-bakerjonesholdings-off-white py-16 px-4 md:px-10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white shadow-xl rounded-2xl overflow-hidden"
        >
          <Image
            src="/financial-planning/new/1.jpg"
            alt="Tax Planning"
            className="w-full h-96 object-cover object-top"
            height={384}
            width={1024}
          />
          <div className="p-8 space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 text-center">
              Tax Efficiency & Smart Structuring
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We understand that keeping more of what you earn is just as important as growing your wealth. Our Tax Efficiency and Smart Structuring service is designed to help you make every pound work harder by minimising unnecessary tax burdens in a legal and strategic way.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We analyse your financial situation in detail to identify opportunities to optimise your income, investments, and assets—using all available allowances, tax-efficient savings vehicles, and proven income distribution strategies.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Whether you&apos;re a business owner, high earner, investor, or simply looking to make smarter financial decisions, we create bespoke solutions that align with current tax laws and your long-term goals.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The result is a well-structured financial plan that supports sustainable growth while preserving more of your wealth for you and your future.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}