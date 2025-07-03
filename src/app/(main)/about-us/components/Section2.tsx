"use client"
import { motion } from "framer-motion";



const services = [
    { title: "Personal and Business Loans" },
    { title: "Mortgages" },
    { title: "Wealth Management" },
    { title: "Financial Planning" },
];

export function Section2() {
    return (
        <section className="py-20 md:py-32 bg-gradient-to-br from-white to-gray-50 font-poppins px-4">
            <div className="container mx-auto max-w-5xl space-y-12">
                <motion.h2
                    className="text-3xl md:text-5xl font-bold text-gray-900 text-center mb-4"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Our Expertise in Financial Services
                </motion.h2>
                <motion.p
                    className="text-lg md:text-xl text-gray-700 text-center max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    At MONEFI, we specialize in a wide range of financial services, including:
                </motion.p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                    {services.map((service, idx) => (
                        <motion.li
                            key={service.title}
                            className="bg-white rounded-2xl shadow-lg p-6 flex items-center space-x-4 border border-gray-100 hover:shadow-2xl transition-shadow"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + idx * 0.1, duration: 0.5 }}
                        >
                            <span className="flex items-center justify-center h-12 w-12 rounded-full bg-monefi-pink/10">
                                <svg
                                    className="h-6 w-6 text-monefi-pink"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2.5}
                                    viewBox="0 0 24 24"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M8 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                            <span className="text-gray-900 font-medium text-lg">{service.title}</span>
                        </motion.li>
                    ))}
                </ul>
                <motion.p
                    className="text-lg md:text-xl text-gray-700 text-center max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    As a forward-thinking financial services provider, we pride ourselves on our ability to offer personalized solutions that address the unique needs of each client. Whether you’re an individual looking for a mortgage to buy your first home, a business in need of financing to expand, or someone planning for a secure future,{" "}
                    <span className="text-monefi-pink font-semibold">MONEFI</span> is here to guide you every step of the way.
                </motion.p>
            </div>
        </section>
    );
}

