import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ECGAnimation from './ECGAnimation';
import TextReveal from './TextReveal';

const Typewriter = ({ text, className = "" }) => {
    const [displayedText, setDisplayedText] = useState("");
    const containerRef = useRef(null);
    const [startTyping, setStartTyping] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStartTyping(true);
                }
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!startTyping) return;

        let timeout;
        if (displayedText.length < text.length) {
            timeout = setTimeout(() => {
                setDisplayedText(text.slice(0, displayedText.length + 1));
            }, 60);
        }
        return () => clearTimeout(timeout);
    }, [displayedText, text, startTyping]);

    return (
        <h2 ref={containerRef} className={`${className} flex flex-wrap items-center`}>
            {displayedText}
            <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "steps(2)" }}
                className="inline-block w-[3px] h-[0.8em] bg-current ml-1"
                style={{ verticalAlign: "middle" }}
            />
        </h2>
    );
};

const pioneersData = [
    {
        id: 1,
        type: 'trust',
        title: 'Science-Backed',
        icon: '🔬',
        quote: '"Neural-Sync technology validated by clinical research."',
        description: 'Our algorithms are built on peer-reviewed studies of HRV and Vagal Tone regulation to bridge the gap between heart and mind.',
        image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=1200',
    },
    {
        id: 2,
        type: 'trust',
        title: 'Made in Bharat',
        icon: '🇮🇳',
        quote: '"Designed for the Indian heartbeat, built for the world."',
        description: 'Indigenous deep-tech innovation merging ancient wisdom with modern resilience to solve high-stakes cardiac recovery.',
        image: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&q=80&w=1200',
    },
    {
        id: 3,
        type: 'action',
        title: 'Get Early Access',
        icon: '📩',
        quote: '"Be a part of the neural-cardiac revolution."',
        description: 'Join our exclusive beta program and help shape the future of cardiac recovery and neural resilience.',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200',
    }
];

const Pioneers = ({ onOpenOnboarding }) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <div className="relative z-10 bg-black text-white w-full border-t border-white/5 font-outfit">
            {/* Intro Section */}
            <section className="py-16 md:py-[100px] px-6 md:px-[8%] grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
                <div className="lg:pr-10">
                    <Typewriter
                        text="Hridaya-Manas Sambandh: The Science of Resilience_"
                        className="text-[2.2rem] md:text-[3.5rem] font-bold leading-[1.1] tracking-tight uppercase"
                    />
                </div>
                <motion.div
                    className="flex flex-col gap-5 md:gap-6"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <p className="text-lg md:text-xl leading-relaxed text-white/80 font-medium">
                        Our neural-sync technology bridges the gap between clinical heart diagnostics and mental state regulation. It monitors the "Neural Storm" to prevent somatic stress from triggering a physical cardiac event.
                    </p>
                    <p className="text-lg md:text-xl leading-relaxed text-white/60">
                        In our clinical trials, survivors are using the Dhritam system to regain autonomy over their recovery, manually stimulating the Vagus nerve through digital guidance to calm the heart.
                    </p>
                </motion.div>
            </section>

            {/* Sticky Scroll Section */}
            <div ref={containerRef} className="h-[400vh] relative">
                <div className="sticky top-0 h-screen p-6 md:p-10 lg:p-[40px_8%] flex flex-col overflow-hidden">
                    <ECGAnimation />

                    <div className="relative flex-1 flex justify-center items-center z-10 mt-10">
                        {pioneersData.map((card, index) => {
                            const start = index / pioneersData.length;
                            const end = (index + 1) / pioneersData.length;

                            const opacity = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0.8]);
                            const scale = useTransform(scrollYProgress, [start, end], [1, 0.95]);
                            const y = useTransform(scrollYProgress, [start, start + 0.2], [400, 0]);

                            return (
                                <motion.div
                                    key={card.id}
                                    className="absolute w-full h-full max-w-[950px] bg-[#0c0c0c] border border-white/10 rounded-[32px] md:rounded-[40px] overflow-hidden flex flex-col will-change-transform shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                                    style={{
                                        opacity: index === pioneersData.length - 1 ? useTransform(scrollYProgress, [start, 1], [0, 1]) : opacity,
                                        scale,
                                        y: index === 0 ? 0 : y,
                                        zIndex: index + 1,
                                    }}
                                >
                                    <div className="w-full h-[30vh] md:h-[40vh] relative overflow-hidden group/img">
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0c0c0c] z-10" />
                                        <img src={card.image} alt={card.title} className="w-full h-full object-cover opacity-60 group-hover/img:opacity-80 transition-all duration-700 scale-110 group-hover/img:scale-100 grayscale hover:grayscale-0" />
                                        <div className="absolute top-6 left-6 md:top-8 md:left-8 z-20 flex items-center gap-3">
                                            <span className="text-3xl md:text-4xl">{card.icon}</span>
                                            <span className="text-sm md:text-base font-bold uppercase tracking-[0.2em] text-accent/80">{card.title}</span>
                                        </div>
                                    </div>

                                    <div className="p-6 md:p-10 lg:p-[2rem_4rem] relative">
                                        <div className="max-w-[800px]">
                                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 leading-tight text-white tracking-tight">
                                                {card.quote}
                                            </h3>
                                            <p className="text-lg md:text-xl text-white/50 leading-relaxed mb-8">
                                                {card.description}
                                            </p>

                                            {card.type === 'action' ? (
                                                <button
                                                    onClick={onOpenOnboarding}
                                                    className="group relative px-10 py-5 bg-white text-black font-bold uppercase tracking-widest rounded-full transition-all hover:scale-105 active:scale-95 overflow-hidden"
                                                >
                                                    <span className="relative z-10">Get Early Access</span>
                                                    <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                                </button>
                                            ) : (

                                                <div className="flex gap-4">
                                                    <div className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[0.7rem] md:text-xs font-bold uppercase tracking-widest text-white/40">
                                                        Trusted Tech
                                                    </div>
                                                    <div className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[0.7rem] md:text-xs font-bold uppercase tracking-widest text-white/40">
                                                        Deep Knowledge
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 hidden md:flex gap-3">
                                            <button className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center cursor-pointer transition-all hover:bg-white hover:text-black">
                                                <ArrowLeft size={20} />
                                            </button>
                                            <button className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center cursor-pointer transition-all hover:bg-white hover:text-black">
                                                <ArrowRight size={20} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="px-6 md:px-10 pb-6 md:pb-10">
                                        <div className="flex gap-2 w-full max-w-[200px]">
                                            {pioneersData.map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={`flex-1 h-[2px] bg-white/10 relative overflow-hidden rounded-full`}
                                                >
                                                    {index === i && (
                                                        <motion.div
                                                            className="absolute inset-0 bg-accent"
                                                            layoutId="activeBar"
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pioneers;

