import React from "react";

const values = [
    {
        title: "Trust",
        description:
            "We understand the importance of trust when it comes to financial matters. We are dedicated to maintaining the highest standards of integrity in everything we do.",
        icon: (
            <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="#4F46E5" opacity="0.1" />
                <path
                    d="M7 13l3 3 7-7"
                    stroke="#4F46E5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    },
    {
        title: "Client-Centered Solutions",
        description:
            "Every financial strategy we recommend is crafted with your unique needs in mind. We prioritize personalized solutions that provide real value and lasting results.",
        icon: (
            <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="#10B981" opacity="0.1" />
                <path
                    d="M12 8v4l3 3"
                    stroke="#10B981"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    },
    {
        title: "Ethical Excellence",
        description:
            "Our commitment to ethics ensures that our advice is always aligned with your best interests.",
        icon: (
            <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="#F59E42" opacity="0.1" />
                <path
                    d="M12 6v6l4 2"
                    stroke="#F59E42"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    },
];

export default function OurValues() {
    return (
        <section className="py-16 px-4 bg-gradient-to-br from-white via-gray-50 to-indigo-50 rounded-3xl shadow-lg max-w-5xl mx-auto my-12">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                    Our Values
                </h2>
                <p className="text-lg text-gray-600">
                    The principles that guide every decision we make.
                </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                {values.map((value) => (
                    <div
                        key={value.title}
                        className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="mb-4">{value.icon}</div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                            {value.title}
                        </h3>
                        <p className="text-gray-600 text-center">{value.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}