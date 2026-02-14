import React, { useEffect, useState } from 'react';
import ScrollSequence from '../components/ScrollSequence';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import OnboardingForm from '../components/OnboardingForm';
import { motion } from 'framer-motion';
import { Cpu, ShieldCheck, Zap } from 'lucide-react';

const Technology = () => {
    const [onboardingOpen, setOnboardingOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-white min-h-screen text-black overflow-x-hidden">
            <CustomCursor />
            <Navbar light={true} onOpenOnboarding={() => setOnboardingOpen(true)} />
            <OnboardingForm isOpen={onboardingOpen} onClose={() => setOnboardingOpen(false)} />

            {/* Tech Hero - Clean Minimalist */}
            <section className="h-screen flex flex-col items-center justify-center relative px-6 text-center bg-white">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03)_0%,transparent_70%)]"></div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="z-10"
                >
                    <span className="text-black/40 uppercase tracking-[0.5em] font-bold text-xs mb-8 block">Engineering the Future</span>
                    <h1 className="text-6xl md:text-[9rem] font-black uppercase tracking-tighter leading-[0.85] mb-12 font-outfit">
                        The <span className="italic">Dhritam</span><br />
                        <span className="text-accent underline decoration-4 underline-offset-8">Ecosystem</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-black/60 max-w-2xl mx-auto leading-relaxed font-medium">
                        A seamless fusion of neural monitoring and cardiac protection. Built for the most critical recovery journeys.
                    </p>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
                >
                    <span className="text-black/20 text-[10px] uppercase tracking-[0.3em] font-bold">Scroll to Deconstruct</span>
                    <div className="w-[1px] h-24 bg-gradient-to-b from-black/20 to-transparent"></div>
                </motion.div>
            </section>

            {/* Agna BCI (headband) */}
            <ScrollSequence
                frames={31}
                folder="headband"
                title="Agna BCI"
                description="8 medical-grade dry EEG sensors integrated into a breathable, adjustable headband. Agna tracks your brain's stress response in real-time, identifying physical heart markers before they manifest."
            />

            {/* Kavach X (tshirt) */}
            <ScrollSequence
                frames={31}
                folder="tshirt"
                title="Kavach X"
                reverse={true}
                description="Smart-textile technology that functions as a 24/7 ECG laboratory. The Kavach X compression garment monitors respiration, posture, and multi-vector heart signals with hospital-grade accuracy."
            />

            {/* The Core (core) */}
            <ScrollSequence
                frames={31}
                folder="core"
                title="The Hub"
                description="The neural-processing unit that powers the ecosystem. The Core features a multi-core processor designed for on-device AI inference, ensuring your data stays private while providing split-second insights."
            />

            {/* Integrated Stats Section - Neutral/White */}
            <section className="py-32 px-6 md:px-[8%] bg-black text-white relative">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
                        <div>
                            <h2 className="text-5xl md:text-7xl font-bold mb-8 font-outfit uppercase leading-tight">
                                Integrated <br />
                                <span className="text-accent">Protection</span>
                            </h2>
                            <p className="text-xl text-white/60 leading-relaxed mb-12">
                                Every component is designed to work in perfect harmony, creating a resilient loop between mind and heart.
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setOnboardingOpen(true)}
                                className="bg-white text-black px-10 py-5 rounded-full font-bold text-lg uppercase tracking-wider hover:bg-accent hover:text-white transition-all shadow-2xl"
                            >
                                Start Your Recovery
                            </motion.button>
                        </div>

                        <div className="grid grid-cols-1 gap-12">
                            {[
                                { icon: <Cpu />, title: "Edge computing", desc: "No cloud latency. All AI processing happens on-device." },
                                { icon: <ShieldCheck />, title: "Clinical grade", desc: "Calibrated to hospital standards for post-op safety." },
                                { icon: <Zap />, title: "Sync-lock", desc: "Hyper-stable wireless bonding across the ecosystem." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6 items-start group">
                                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2 uppercase tracking-tight">{item.title}</h3>
                                        <p className="text-white/50 leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Technology;
