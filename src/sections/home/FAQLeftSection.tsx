"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    id: 0,
    question: "Can I cancel my subscription at any time?",
    answer:
      "Yes, you can cancel your subscription at any time from your account settings.",
  },
  {
    id: 1,
    question: "Can I postpone or skip a delivery?",
    answer:
      "Absolutely! You can manage your deliveries through your dashboard easily.",
  },
  {
    id: 2,
    question: "How long will it take to see the results?",
    answer:
      "Results vary, but most users see changes within 2-4 weeks of consistent use.",
  },
  {
    id: 3,
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy on all products, no questions asked.",
  },
  {
    id: 4,
    question: "How long will my order take to arrive?",
    answer:
      "Orders are processed within 1-2 business days and usually arrive within 5 days.",
  },
];

const FAQLeftSection = () => {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setSelectedFaq(prev => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col gap-12 divide-y divide-[#0807081A] w-1/2">
      {faqs.map((faq) => (
        <div className="flex flex-col gap-3 pb-4" key={faq.id}>
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleFaq(faq.id)}
          >
            <h3 className="font-inter font-medium text-xl">{faq.question}</h3>
            <motion.span
              className="text-monefi-pink text-3xl font-light font-poppins"
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
};

export default FAQLeftSection;
