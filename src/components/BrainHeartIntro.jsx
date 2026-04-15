import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const TypewriterText = ({ text, trigger, speed = 30 }) => {
    const [displayed, setDisplayed] = useState('');
    const [done, setDone] = useState(false);

    useEffect(() => {
        if (!trigger) return;
        let i = 0;
        setDisplayed('');
        setDone(false);
        const interval = setInterval(() => {
            i++;
            setDisplayed(text.slice(0, i));
            if (i >= text.length) {
                clearInterval(interval);
                setDone(true);
            }
        }, speed);
        return () => clearInterval(interval);
    // text and speed are stable props; trigger is the only dynamic value
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trigger]);

    return (
        <>
            {displayed}
            {!done && trigger && (
                <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.55, repeat: Infinity, ease: 'steps(2)' }}
                    className="inline-block w-[3px] h-[0.8em] bg-current ml-[2px] align-middle"
                />
            )}
        </>
    );
};

const BrainHeartIntro = () => {
    const containerRef = useRef(null);
    const phase1Ref = useRef(false);
    const phase2Ref = useRef(false);

    const [phase1, setPhase1] = useState(false);
    const [phase2, setPhase2] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start center', 'end end'],
    });

    useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (v) => {
            if (v >= 0.01 && !phase1Ref.current) {
                phase1Ref.current = true;
                setPhase1(true);
            }
            if (v >= 0.15 && !phase2Ref.current) {
                phase2Ref.current = true;
                setPhase2(true);
            }
        });
        return unsubscribe;
    }, [scrollYProgress]);

    // Stack-in transform for second text block
    const text2Y = useTransform(scrollYProgress, [0.1, 0.25], ['40px', '0px']);
    const text2Opacity = useTransform(scrollYProgress, [0.1, 0.22], [0, 1]);

    // Divider opacity synced with second block
    const dividerOpacity = useTransform(scrollYProgress, [0.08, 0.2], [0, 1]);

    // Scroll indicator fades out near end
    const scrollIndicatorOpacity = useTransform(scrollYProgress, [0.4, 0.6], [1, 0]);

    // Subtle accent glow fades in
    const glowOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

    return (
        <section
            ref={containerRef}
            className="relative h-[150vh] bg-black z-[12] shadow-[0_-30px_60px_rgba(0,0,0,0.9)]"
        >
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-6 md:px-[8%] overflow-hidden">

                {/* Subtle radial accent glow */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ opacity: glowOpacity }}
                >
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(219,255,0,0.05)_0%,transparent_100%)]" />
                </motion.div>

                {/* Top accent line sweeps in */}
                <motion.div
                    className="absolute top-0 left-0 h-[2px] bg-accent origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: phase1 ? 1 : 0 }}
                    transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                />

                <div className="relative w-full max-w-[1200px] mx-auto text-center flex flex-col items-center">

                    {/* — Question (Phase 1) — */}
                    <motion.h2
                        className="text-[2rem] sm:text-[2.8rem] md:text-[4.5rem] font-extrabold font-outfit uppercase tracking-[-1px] md:tracking-[-3px] text-[#f0f0f0] leading-[1.1]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: phase1 ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <TypewriterText
                            text="What if you could feel better, before things get bad?"
                            trigger={phase1}
                            speed={28}
                        />
                    </motion.h2>

                    {/* Vertical divider between the two text blocks */}
                    <motion.div
                        className="w-[1px] h-[40px] md:h-[56px] my-6 md:my-10 bg-gradient-to-b from-white/10 via-accent/50 to-white/10"
                        style={{ opacity: dividerOpacity }}
                    />

                    {/* — Answer (Phase 2, stacks in from below) — */}
                    <motion.p
                        className="text-[1.5rem] sm:text-[2rem] md:text-[3rem] font-bold font-outfit tracking-[-0.5px] md:tracking-[-2px] text-accent italic leading-[1.2]"
                        style={{ y: text2Y, opacity: text2Opacity }}
                    >
                        <TypewriterText
                            text="Dhritam shows you how."
                            trigger={phase2}
                            speed={22}
                        />
                    </motion.p>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                    style={{ opacity: scrollIndicatorOpacity }}
                >
                    <span className="text-white/30 text-[0.65rem] uppercase tracking-[0.35em] font-outfit">
                        Scroll
                    </span>
                    <motion.div
                        className="w-[1px] h-[28px] bg-accent/30"
                        animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                        style={{ transformOrigin: 'top' }}
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default BrainHeartIntro;
