import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AlertCircle, Zap, Activity } from 'lucide-react';

const Problem = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Transforms for the unfolding effect
    const card1X = useTransform(scrollYProgress, [0.3, 0.6], [0, isMobile ? 0 : -320]);
    const card1Y = useTransform(scrollYProgress, [0.3, 0.6], [0, isMobile ? -100 : 0]);
    const card1Rotate = useTransform(scrollYProgress, [0.3, 0.6], [0, isMobile ? -5 : -10]);

    const card2Scale = useTransform(scrollYProgress, [0.3, 0.6], [0.95, 1]);

    const card3X = useTransform(scrollYProgress, [0.3, 0.6], [0, isMobile ? 0 : 320]);
    const card3Y = useTransform(scrollYProgress, [0.3, 0.6], [0, isMobile ? 100 : 0]);
    const card3Rotate = useTransform(scrollYProgress, [0.3, 0.6], [0, isMobile ? 5 : 10]);

    const cards = [
        {
            id: 1,
            icon: <AlertCircle size={40} className="text-accent mb-[30px]" />,
            title: "Cardiophobia",
            description: "33% of cardiac survivors suffer from constant anxiety, sending 'panic signals' to the heart.",
            style: { x: card1X, y: card1Y, rotate: card1Rotate, zIndex: 1 }
        },
        {
            id: 2,
            icon: <Zap size={40} className="text-red-500 mb-[30px]" />,
            title: "Neural Storm",
            description: "Stress-induced cortisol spikes trigger arrhythmias, causing fatal secondary attacks.",
            style: { scale: card2Scale, zIndex: 3 }
        },
        {
            id: 3,
            icon: <Activity size={40} className="text-blue-500 mb-[30px]" />,
            title: "The Silent Gap",
            description: "Traditional monitors ignore the heart's neural triggers. We bridge that gap.",
            style: { x: card3X, y: card3Y, rotate: card3Rotate, zIndex: 2 }
        }
    ];

    return (
        <section ref={containerRef} className="bg-black text-white py-[120px] md:py-[180px] px-6 md:px-[8%] min-h-screen flex flex-col justify-center relative z-[15] overflow-hidden shadow-[0_-30px_60px_rgba(0,0,0,0.9)]">
            <div className="w-full max-w-[1400px] mx-auto text-center">
                <motion.h2
                    className="text-[2.5rem] md:text-[4.5rem] font-bold leading-[1.1] text-[#f0f0f0] mb-[80px] md:mb-[120px] tracking-[-2px] font-outfit uppercase"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    The Heart fails when<br className="hidden md:block" />
                    <span className="text-accent italic">the Brain panics.</span>
                </motion.h2>

                <div className={`relative ${isMobile ? 'flex flex-col gap-8 h-auto mt-10' : 'h-[550px] flex justify-center items-center'} group/container`}>
                    {cards.map((card) => (
                        <motion.div
                            key={card.id}
                            className={`${isMobile ? 'relative' : 'absolute'} w-full max-w-[340px] md:w-[380px] h-auto min-h-[320px] md:h-[480px] bg-[#111] rounded-[32px] md:rounded-[40px] p-8 md:p-[60px_40px] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] flex flex-col items-center justify-center text-center backdrop-blur-md transition-all duration-500 hover:border-accent/40 group hover:shadow-[0_0_50px_rgba(255,96,0,0.1)] mx-auto`}
                            style={isMobile ? {} : card.style}
                            initial={isMobile ? { opacity: 0, y: 20 } : false}
                            whileInView={isMobile ? { opacity: 1, y: 0 } : false}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05, zIndex: 10 }}
                        >
                            <div className="flex flex-col items-center transition-all duration-500 group-hover:scale-105">
                                {React.cloneElement(card.icon, {
                                    size: isMobile ? 48 : 56,
                                    className: `${card.icon.props.className} group-hover:scale-110 transition-transform duration-500`
                                })}
                                <h3 className="text-[1.8rem] md:text-[2.5rem] font-bold leading-[1.1] mb-4 md:mb-6 text-white font-outfit uppercase tracking-tighter">{card.title}</h3>
                                <p className="text-[1rem] md:text-[1.25rem] text-white/50 leading-[1.5] font-medium group-hover:text-white/80 transition-colors">{card.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Problem;
