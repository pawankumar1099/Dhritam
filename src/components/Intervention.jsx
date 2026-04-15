import React from 'react';
import { motion } from 'framer-motion';
import { Wind, Bell, CheckCircle } from 'lucide-react';

const Intervention = () => {
    const steps = [
        {
            title: "It Notices",
            description: "Every 30 seconds, your devices check: Are you calm or stressed? You see a simple number that shows how you're feeling right now.",
            icon: <Bell className="text-red-500" />,
            animation: {
                animate: {

                    boxShadow: [
                        "0 0 0px 0px rgba(239, 68, 68, 0)",
                        "0 0 0px 5px rgba(239, 68, 68, 0.3)",
                        "0 0 0px 0px rgba(239, 68, 68, 0)"
                    ]
                },
                transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }
        },
        {
            title: "It Suggests",
            description: "Then it says: 'You look stressed! Try taking deep breaths' or 'Play a brain game' or 'Listen to this calming music.' Whatever helps you most.",
            icon: <Wind className="text-accent" />,
            animation: {
                animate: {
                    boxShadow: [
                        "0 0 0px 0px rgba(59, 130, 246, 0)",
                        "0 0 0px 5px rgba(255, 255, 0, 1)",
                        "0 0 0px 0px rgba(59, 130, 246, 0)"
                    ]
                },
                transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }
        },
        {
            title: "It Learns",
            description: "Over time, it figures out what makes YOU stressed and what helps YOU calm down fastest. It becomes your personal stress coach.",
            icon: <CheckCircle className="text-blue-500" />,
            animation: {
                animate: {
                    boxShadow: [
                        "0 0 0px 0px rgba(59, 130, 246, 0)",
                        "0 0 0px 5px rgba(59, 130, 246, 0.4)",
                        "0 0 0px 0px rgba(59, 130, 246, 0)"
                    ]
                },
                transition: { duration: 9, repeat: Infinity, ease: "easeInOut" }
            }
        }
    ];

    return (
        <section className="bg-black py-16 md:py-24 px-6 md:px-[8%] relative z-[30]">
            <div className="max-w-[1400px] mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-[2.5rem] md:text-[4rem] font-bold text-white mb-6 font-outfit uppercase tracking-tighter">It Works in <span className="text-accent italic">Three Steps</span></h2>
                    <p className="text-lg text-white/50 max-w-[600px] mx-auto leading-relaxed">
                        Notice your mood. Suggest what helps. Remember what works best for you.
                    </p>
                </div>

                <motion.div
                    className="flex flex-col md:flex-row gap-12 justify-center items-start"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.5
                            }
                        }
                    }}
                >
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="flex-1 flex flex-col items-center text-center max-w-[350px] group relative"
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: { duration: 0.8, ease: "easeOut" }
                                }
                            }}
                        >
                            <motion.div
                                className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10 relative"
                                animate={step.animation.animate}
                                transition={step.animation.transition}
                            >
                                {step.icon}
                            </motion.div>
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 font-outfit uppercase tracking-tight">{step.title}</h3>
                            <p className="text-white/40 leading-relaxed font-medium">{step.description}</p>

                            {index < steps.length - 1 && (
                                <motion.div
                                    className="hidden lg:block absolute right-[-20%] top-[32px] w-[30%] h-px bg-gradient-to-r from-white/10 via-white/20 to-white/10"
                                    initial={{ scaleX: 0, originX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    transition={{ delay: (index + 1) * 0.5, duration: 0.8 }}
                                ></motion.div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Intervention;
