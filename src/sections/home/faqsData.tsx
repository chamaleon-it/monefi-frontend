import React from "react";

export interface FAQItem {
  id: number;
  question: React.ReactNode;
  answer: React.ReactNode;
}

export const faqs: FAQItem[] = [
  {
    id: 0,
    question: "What exactly does Baker Jones do?",
    answer:
      "We operate as a private equity deal facilitator. Our role is to connect individual investors with institutional-grade market opportunities that are typically out of reach, such as Pre-IPO allocations (including SpaceX, OpenAI, and Revolut), private equity, and fixed-income securities. We provide the vital infrastructure and market access required to transact these deals, ensuring you always keep full control of your capital.",
  },
  {
    id: 1,
    question: "Can I access institutional-grade investments as an individual?",
    answer:
      "Yes. Providing this access is our core service. Baker Jones Holdings opens the door to exclusive opportunities usually reserved for large institutional players, including Pre-IPO allocations, private equity placements, corporate bonds, and other premium assets.",
  },
  {
    id: 2,
    question: "What types of investment opportunities do you offer?",
    answer:
      "We facilitate access to a diverse range of alternative placements. These include Pre-IPO shares in high-profile companies before they list publicly, private equity deals, fixed-income corporate bonds, public equities, and select digital asset positions.",
  },
  {
    id: 3,
    question: "Does Baker Jones hold my money?",
    answer:
      "No. We never take custody of client funds. When you participate in market opportunities through Baker Jones Holdings, your money remains inside a designated client account set up in your own name. It is never placed into a pooled fund or an account under our control. Your capital stays ring-fenced and under your direct ownership at all times.",
  },
  {
    id: 4,
    question: "How is this different from a traditional wealth manager?",
    answer:
      "Traditional wealth managers typically hold and manage your assets directly under their discretionary control, which requires specialized FCA asset-custody licensing. As a deal facilitator, we do not manage portfolios or hold client assets. We simply give you direct access to institutional deals while your money stays safely in an account you control.",
  },
  {
    id: 5,
    question: "What is your regulatory status?",
    answer:
      "Baker Jones Holdings is a registered UK company (No: 12127676) and is fully authorised by the Financial Conduct Authority (FRN: 969487) to meet the requirements for institutional market reporting and execution. Over our 6+ years of operation, we have maintained a clean record with zero FCA warnings, complaints, or regulatory flags.",
  },
  {
    id: 6,
    question: "How long has Baker Jones been operating?",
    answer:
      "We have been active since 2019. Over the past six years, we have served more than 6,000 clients across the UK and facilitated over £3 billion in deal flow annually.",
  },
  {
    id: 7,
    question: "How much do I need to participate in a deal?",
    answer:
      "Minimum participation amounts vary depending on the specific asset class and the structure of the individual deal. Please contact our team directly to get exact details on our current open opportunities, as we work with a wide range of investment sizes.",
  },
  {
    id: 8,
    question: "Can I speak with someone before participating?",
    answer:
      "Absolutely. We strongly encourage all prospective clients to arrange a consultation with our team first. This discussion allows us to learn about your objectives, explain our transaction framework, answer your questions, and ensure our services match your goals.",
  },
  {
    id: 9,
    question: "How much does Baker Jones have under management (AUM)?",
    answer:
      "Baker Jones currently manages over £500 million in assets under management (AUM). This reflects the trust our clients place in us and our commitment to delivering disciplined, long-term investment management and financial planning services.",
  },
];
