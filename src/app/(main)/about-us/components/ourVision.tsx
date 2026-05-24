'use client';
import { motion } from 'framer-motion';

const visionText = `At bakerjonesholdings, we believe that financial success isn’t just about numbers – it’s about empowering people. We want to help our clients take control of their financial futures by offering customized solutions that support their short-term needs and long-term goals. Through education, thoughtful planning, and innovative services, we are here to help you build a secure and prosperous future.`;

export default function OurVision() {
    return (
        <section
            className="relative w-full py-24 px-6 md:px-0 flex justify-center items-center overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, #18181B 60%, #2e1065 100%)',
            }}
        >
            {/* Decorative Gradient Overlay */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-gradient-to-br from-bakerjonesholdings-primary/30 to-purple-700/20 rounded-full blur-3xl opacity-60" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tr from-bakerjonesholdings-primary/20 to-white/10 rounded-full blur-2xl opacity-40" />
            </div>

            <motion.div
                className="relative z-10 max-w-3xl w-full bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 px-10 py-14 flex flex-col items-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                viewport={{ once: true }}
            >
                {/* Decorative Icon */}
                
                <motion.h2
                    className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-white via-bakerjonesholdings-primary to-white bg-clip-text text-transparent tracking-tight drop-shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.7 }}
                >
                    Our Vision: <span className="text-bakerjonesholdings-primary">A Future of Financial Empowerment</span>
                </motion.h2>
                <motion.p
                    className="text-xl md:text-2xl text-gray-100 leading-relaxed font-light mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.7 }}
                >
                    {visionText}
                </motion.p>
            </motion.div>
        </section>
    );
}