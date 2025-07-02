// import Image from "next/image";
import React from "react";

interface FocusCard {
  title: string;
  description: string;
  src: string;
}

export default function WhyYouNeedSection() {
  const cards: FocusCard[] = [
    {
      title: "Income Replacement",
      src: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3",
      description:
        "Ensure your family can meet day-to-day living costs—mortgage or rent, utilities, groceries—even if you’re no longer there to provide.",
    },
    {
      title: "Debt & Liability Coverage",
      src: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3",
      description:
        "Pay off outstanding loans, credit-card balances, or long-term debts without forcing your family to shoulder the burden.",
    },
    {
      title: "Education & Milestone Funding",
      src: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3",
      description:
        "Lock in the funds needed to send children to college, cover wedding expenses, or support other future milestones.",
    },
    {
      title: "Estate Planning & Inheritance",
      src: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3",
      description:
        "Leave a tax-efficient legacy that can be used for wealth transfer, charitable gifting, or smoothing estate-settlement costs.",
    },
  ];

  return (
    <section className="  px-4 py-12 bg-monefi-off-pink">
        <div className="container mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">
        Why You Need Life Insurance
      </h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
            {/* <Image src={card.src} height={192} width={100} className="h-48 w-full object-cover" alt={card.title}/> */}
            <div className="h-40 p-3 text-white bg-monefi-pink">
              <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
              <p className=" text-sm">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
