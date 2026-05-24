"use client"

import React from "react";
import { FaHandshake, FaBalanceScale, FaUserTie, FaChartLine } from "react-icons/fa";

/**
 * Enhancements:
 * - Cards are displayed in a 2x2 grid on desktop (md and up), stacked on mobile.
 * - Each card includes its icon at the top.
 * - Added a subtle hover animation for cards.
 * - Added a fade-in animation on mount.
 */


const reasons = [
    {
        icon: <FaHandshake className="text-primary text-3xl mb-4" />,
        title: "Client-First Approach",
        description:
            "We put our clients at the center of everything we do. Our focus is on building relationships based on trust, transparency, and respect. We listen to your goals and work with you to create strategies in your best interest.",
    },
    {
        icon: <FaBalanceScale className="text-primary text-3xl mb-4" />,
        title: "Ethical Financial Guidance",
        description:
            "Our team provides honest, ethical advice. We offer clear, straightforward solutions you can trust—never pressured decisions.",
    },
    {
        icon: <FaUserTie className="text-primary text-3xl mb-4" />,
        title: "Expertise You Can Rely On",
        description:
            "Since 2020, our experienced professionals have navigated personal finance, business lending, mortgages, and wealth management with deep expertise.",
    },
    {
        icon: <FaChartLine className="text-primary text-3xl mb-4" />,
        title: "Commitment to Growth",
        description:
            "bakerjonesholdings has grown rapidly, expanding our services and reach. Our growth reflects our clients’ trust and our commitment to high-quality guidance.",
    },
];

const WhyChooseUs: React.FC = () => (
    <section className="why-choose-us-section py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-8 text-primary">
                Why Choose bakerjonesholdings?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {reasons.map((reason, idx) => (
                    <div
                        key={idx}
                        className="bg-white rounded-lg shadow p-6 flex flex-col items-center text-center transform transition duration-300 hover:-translate-y-2 hover:shadow-lg opacity-0 animate-fade-in"
                        style={{ animationDelay: `${idx * 100}ms` }}
                    >
                        {reason.icon}
                        <h3 className="text-xl font-semibold mb-2 text-secondary">
                            {reason.title}
                        </h3>
                        <p className="text-gray-700">{reason.description}</p>
                    </div>
                ))}
            </div>
        </div>
        <style jsx global>{`
            @keyframes fade-in {
                from { opacity: 0; transform: translateY(20px);}
                to { opacity: 1; transform: translateY(0);}
            }
            .animate-fade-in {
                animation: fade-in 0.7s ease forwards;
            }
        `}</style>
    </section>
);

export default WhyChooseUs;