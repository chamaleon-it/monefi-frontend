"use client"

// import { motion } from "motion/react";


export function HeroSection() {
  return (
    <section className="py-16 md:py-24 flex justify-center items-center font-poppins px-4 h-[calc(100vh-150px)] bg-monefi-off-white">
      <div className="container mx-auto max-w-6xl text-center space-y-5">

        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight px-4">
          Life  <span style={{ color: "#ec709a" }}>Insurance</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-700 font-poppins mb-8 max-w-4xl mx-auto leading-relaxed px-4">
         Protecting the financial future of your loved ones is one of the most important decisions you can make. Life insurance provides a guaranteed benefit in the event of death, helping cover expenses and maintain your family’s standard of living. At Monefi, we offer flexible life insurance solutions designed to fit every stage of life and every budget.
        </p>
               {/* <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 1,
          }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button className="w-60 transform rounded-lg border bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
            Explore Now
          </button>
          <button className="w-60 transform rounded-lg border border-gray-300 bg-white px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900">
            Contact Support
          </button>
        </motion.div> */}
      </div>
  
    </section>
  )
}

