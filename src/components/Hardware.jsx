import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, ShieldCheck, Zap, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import agnaImg from '../assets/agna.png';
import kavachxImg from '../assets/kavachx.png';
import dhritamcoreImg from '../assets/dhritamcore.png';

const HardwareCard = ({ item }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className="relative h-[500px] w-full [perspective:1000px] cursor-pointer"
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
        >
            <motion.div
                className="relative h-full w-full rounded-[32px] transition-all duration-500 [transform-style:preserve-3d]"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
            >
                {/* Front Side */}
                <div className={`absolute inset-0 h-full w-full rounded-[32px] bg-white/5 border ${item.color} p-8 backdrop-blur-sm [backface-visibility:hidden] flex flex-col`}>
                    <div className="mb-8 inline-block text-white">
                        {item.icon}
                    </div>
                    <div className="mb-6">
                        <span className="text-[0.7rem] uppercase tracking-[0.2em] text-accent font-bold mb-2 block">{item.type}</span>
                        <h3 className="text-2xl md:text-3xl font-bold text-white font-outfit">{item.name}</h3>
                    </div>
                    <p className="text-white/60 mb-8 leading-relaxed font-medium">
                        {item.description}
                    </p>
                    <ul className="space-y-4 mt-auto">
                        {item.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-3 text-sm text-white/80">
                                <div className="w-1.5 h-1.5 bg-accent rounded-full shadow-[0_0_8px_rgba(255,96,0,0.6)]"></div>
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Back Side */}
                <div
                    className={`absolute inset-0 h-full w-full rounded-[32px] bg-[#111] border ${item.color} p-4 [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden flex items-center justify-center`}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                    <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute bottom-6 left-6 z-20">
                        <h4 className="text-xl font-bold text-white font-outfit">{item.name}</h4>
                        <p className="text-accent text-sm font-semibold tracking-wider uppercase">{item.type}</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const Hardware = () => {
    const components = [
        {
            name: "Agna BCI",
            type: "Headband",
            description: "Tracks EEG (Brainwaves) to measure stress, focus, and autonomic nervous system (ANS) state.",
            features: ["8 Medical-grade EEG channels", "Real-time stress indexing", "Ultra-low latency"],
            icon: <Cpu size={32} className="text-accent" />,
            color: "border-accent/30",
            image: agnaImg
        },
        {
            name: "Kavach X",
            type: "Smart Shirt",
            description: "Smart-textile garment with medical-grade sensors for continuous ECG and respiration tracking.",
            features: ["Dry-sensor ECG", "Respiration monitoring", "Posture analysis"],
            icon: <ShieldCheck size={32} className="text-blue-500" />,
            color: "border-blue-500/30",
            image: kavachxImg
        },
        {
            name: "The Core",
            type: "Modular Hub",
            description: "The 'brain' of the system. Snaps into either shirt or headband to sync and transmit data.",
            features: ["Bluetooth 5.3 + Wi-Fi", "Neural-processing unit", "48h Battery life"],
            icon: <Zap size={32} className="text-red-500" />,
            color: "border-red-500/30",
            image: dhritamcoreImg
        }
    ];

    return (
        <section id="technology" className="bg-black py-24 px-6 md:px-[8%] relative overflow-hidden">
            <div className="max-w-[1400px] mx-auto">
                <div className="mb-16 md:mb-24">
                    <motion.h2
                        className="text-[2.5rem] md:text-[4rem] font-bold text-white mb-6 font-outfit uppercase tracking-tighter"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Hardware <span className="text-accent">Ecosystem</span>
                    </motion.h2>
                    <p className="text-lg md:text-xl text-white/50 max-w-[600px] leading-relaxed mb-8">
                        A modular, closed-loop system designed for seamless 24/7 neuro-cardiac protection.
                    </p>
                    <Link to="/technology" className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-full font-bold transition-all hover:bg-white hover:text-black">
                        Explore Full Tech <ArrowUpRight size={18} />
                    </Link>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.2
                            }
                        }
                    }}
                >
                    {components.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={{
                                hidden: { opacity: 0, y: 50 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                            }}
                        >
                            <HardwareCard item={item} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Hardware;
