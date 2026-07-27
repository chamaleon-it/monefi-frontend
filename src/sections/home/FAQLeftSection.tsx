"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { faqs } from "./faqsData";
export { faqs };

function FAQLeftSection() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(0);

  const toggleFaq = (id: number) => {
    setSelectedFaq(prev => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col gap-6 lg:gap-12 divide-y divide-[#0807081A] w-full lg:w-1/2">
      {faqs.map((faq) => (
        <div className="flex flex-col gap-3 pb-4" key={faq.id}>
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleFaq(faq.id)}
          >
            <h3 className="font-inter font-medium text-lg lg:text-xl">{faq.question}</h3>
            <motion.span
              className="text-bakerjonesholdings-pink text-3xl font-light font-poppins"
              animate={{ rotate: selectedFaq === faq.id ? 45 : 0 }}
              transition={{ duration: 0.3 }}
            >
              +
            </motion.span>
          </div>

          <AnimatePresence initial={false}>
            {selectedFaq === faq.id && (
              <motion.p
                className="font-inter font-medium text-sm"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {faq.answer}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

export default FAQLeftSection;
