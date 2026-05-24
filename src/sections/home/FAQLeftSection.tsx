"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    id: 0,
    question: "What is the difference between life insurance and income protection?",
    answer:
      "Life insurance provides a lump-sum payout to your loved ones if you pass away during the policy term. Income protection, on the other hand, pays you a monthly income if you’re unable to work due to illness or injury—helping you cover bills and maintain your lifestyle while you recover.",
  },
  {
    id: 1,
    question: "Will applying for a loan or mortgage with Baker Jones Holding affect my credit score?",
    answer:
      "No—when you first apply, we only perform a soft credit check, which does not impact your credit score. A hard credit check will only be conducted once you choose a lender and move forward with your application.",
  },
  {
    id: 2,
    question: "Can I get financial advice even if I don’t have a lot to invest?",
    answer:
      "Absolutely. At Baker Jones Holding, we believe everyone deserves quality financial guidance—no matter their income or assets. Whether you're just starting out or building wealth, our advisers offer personalised support tailored to your goals and budget.",
  },
  {
    id: 3,
    question: "How long does it take to get approved for a loan or mortgage?",
    answer:
      "This varies by lender and product, but many personal loans can be approved within 24–48 hours. Mortgage approvals typically take 2–4 weeks, depending on your documentation and the property involved. Our advisers will keep you informed every step of the way.",
  },
  {
    id: 4,
    question: "What happens if I want to cancel my insurance policy?",
    answer:
      "Most policies come with a 14-day cooling-off period, during which you can cancel without penalty. If you cancel after that, there may be fees or loss of cover. Always speak with a Baker Jones Holding adviser first—we'll explain your rights clearly and help you avoid unnecessary costs.",
  },
];

const FAQLeftSection = () => {
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
};

export default FAQLeftSection;
