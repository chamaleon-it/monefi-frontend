"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    id: 0,
    question: "What does it mean that you are an independent firm?",
    answer:
      "Being an independent firm means we have zero commercial ties, quotas, or restrictions tied to specific financial institutions. We research the entire UK market to select the absolute best financial plans, platforms, and investment vehicles tailored exclusively to your goals.",
  },
  {
    id: 1,
    question: "Why should I work with you instead of my high street bank branch?",
    answer:
      <>
        High street banks often treat clients like  a herd, funneling them into restrictive, standardized products. Because we are an independent boutique, we offer an entirely different experience: <br />True Personalisation: Your adviser capped at 50 clients means tailored strategies, not institutional templates. <br />Institutional-Grade Products: We access institutional fixed-income products and terms from tier-one global banks that high street branches cannot offer retail clients. <br />Unbiased Representation: Bank employees represent the bank’s product line; we exclusively represent you.
      </>,
  },
  {
    id: 2,
    question: "How do you ensure I won’t just become another number?",
    answer:
      `We strictly limit our client capacity to a maximum of 50 clients per adviser. This intentional cap guarantees that your adviser knows your name, remembers your unique family dynamics, understands your long-term vision, and remains highly responsive to your needs.`,
  },
  {
    id: 3,
    question: "What is the difference between your financial planning and wealth management services?",
    answer:
      "Financial planning is the architectural blueprint for your life goals—mapping out timelines for retirement, property purchases, or business exits. Wealth management is the engineering that powers it—actively building, monitoring, and executing the investment portfolios required to fund that exact blueprint.",
  },
  {
    id: 4,
    question: "Can you help with my estate planning and Inheritance Tax (IHT)?",
    answer:
      "Yes. We employ detailed lifetime cashflow modelling to map your wealth against future needs, structuring legitimate gifting strategies and trusts to mitigate UK Inheritance Tax while ensuring your family legacy passes smoothly to the next generation.",
  },
  {
    id: 5,
    question: "How do you secure better rates on fixed-income products?",
    answer:
      "Because our independent firm manages and raises substantial tranches of capital collectively, major tier-one global institutions grant us access to high-yield fixed-income assets. These institutional-grade bonds and fixed-term rates offer significantly higher yields and more flexible terms than the standard savings accounts or fixed bonds available to the general public.",
  },
  {
    id: 6,
    question: "How are your fees structured?",
    answer:
      "We believe in absolute transparency. Because every client’s financial blueprint is unique, our fees vary depending on the specific advisory services and asset structures required. You will receive a complete, itemised breakdown of all costs before committing to any service, ensuring there are never any hidden surprises or exit penalties.",
  },
  {
    id: 7,
    question: "How safe is my money?",
    answer:
      "Your capital is never held directly by our firm. All client assets are securely held by independent, heavily regulated third-party custodian institutions. This structure keeps your investments completely isolated and fully safe, even in the highly unlikely event that our advisory firm closes.",
  },
  {
    id: 8,
    question: "How do you adapt my financial plan when UK tax laws change?",
    answer:
      "As an independent boutique, we proactively monitor Autumn Statements and Spring Budgets. Because of our strict 50-client limit, your adviser can instantly assess how new tax legislation impacts your portfolio and tweak your ISA, SIPP, or capital gains structures before the changes take effect.",
  },

];

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
