import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowUpRight, Activity, Heart, Brain } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Pioneers from '../components/Pioneers';
import Problem from '../components/Problem';
import BrainHeartIntro from '../components/BrainHeartIntro';
import CompareSlider from '../components/CompareSlider';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hardware from '../components/Hardware';
import Intervention from '../components/Intervention';
import TextReveal from '../components/TextReveal';
import OnboardingForm from '../components/OnboardingForm';
import Testimonials from '../components/Testimonials';
import heartImage from '../assets/heart.jpg'


import '../index.css';

function Home({ onOpenAssessment, onboardingOpen, setOnboardingOpen }) {
    const [isLoading, setIsLoading] = useState(true);
    const [showHeadband, setShowHeadband] = useState(false);
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="w-full bg-black">
            <Helmet>
                <html lang="en" />
                <title>Dhritam - Understand Your Stress</title>
                <meta name="description" content="Dhritam helps you understand your body and your stress. Wear a headband and shirt, get simple tips to feel better." />
            </Helmet>

            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                        className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center"
                    >
                        <div className="w-[300px] mb-8 relative">
                            <motion.div 
                                className="absolute -top-32 w-28 h-28 pointer-events-none"
                                initial={{ left: "0%" }}
                                animate={{ left: "100%" }}
                                transition={{ duration: 5, ease: 'linear' }}
                                style={{ transform: "translateX(-50%)" }}
                            >
                                <DotLottieReact
                                    src="/Meditating Brain.lottie"
                                    loop
                                    autoplay
                                />
                            </motion.div>
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-white/40 text-[0.6rem] uppercase tracking-[0.2em] font-outfit">Neural Systems</span>
                                <span className="text-accent text-[0.8rem] font-bold font-outfit">INIT...</span>
                            </div>
                            <div className="h-[2px] w-full bg-white/10 overflow-hidden relative">
                                <motion.div
                                    className="absolute inset-0 bg-accent"
                                    initial={{ x: '-100%' }}
                                    animate={{ x: '0%' }}
                                    transition={{ duration: 5, ease: 'linear' }}
                                />
                            </div>
                        </div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-white/20 text-[0.6rem] uppercase tracking-[0.4em] font-outfit animate-pulse"
                        >
                            Syncing Neuro-Cardiac Data
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Navbar onOpenOnboarding={() => setOnboardingOpen(true)} onOpenAssessment={onOpenAssessment} />
            <OnboardingForm isOpen={onboardingOpen} onClose={() => setOnboardingOpen(false)} />

            <main className="relative">
                <section className="relative w-full h-screen bg-black bg-cover bg-center flex flex-col md:flex-row items-center justify-between px-6 md:px-[8%] py-24 md:py-0 overflow-hidden z-[1]" aria-label="Hero">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none"></div>

                    <motion.div
                        className="z-10 w-full md:max-w-[550px] text-center md:text-left mt-12 md:mt-0"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        <h1 className="md:pt-10  text-[4rem] md:text-[6rem] font-extrabold leading-[1] uppercase text-white  md:mb-8 tracking-[-2px] md:tracking-[-3px] zalando-sans-expanded-font ">
                            <TextReveal text="KNOW" className="block zalando-sans-expanded-font justify-center md:justify-start" delay={0.1} />
                            <TextReveal text="YOUR" className="text-accent block zalando-sans-expanded-font justify-center md:justify-start" delay={0.2} />
                            <TextReveal text="STRESS" className="block zalando-sans-expanded-font justify-center md:justify-start" delay={0.3} />
                        </h1>

                        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-0">
                            <motion.div
                                onClick={() => setOnboardingOpen(true)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-block"
                            >
                                <div className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-semibold text-[1rem] md:text-[1.1rem] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(255,255,255,0.2)] md:mb-8  cursor-pointer mt-10">
                                    Start Your Journey <ArrowUpRight size={20} />
                                </div>
                            </motion.div>

                            <motion.div
                                onClick={onOpenAssessment}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="md:hidden w-full max-w-[240px]"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <div className="relative overflow-hidden rounded-full p-[1px] cursor-pointer">
                                    <span className="absolute  inset-[-1000%] animate-spin-slow bg-[conic-gradient(from_90deg_at_50%_50%,#DBFF00_0%,#393BB2_50%,#DBFF00_100%)]" />
                                    <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-black  py-4 text-[1rem] font-black text-white hover:text-accent font-outfit uppercase tracking-wider backdrop-blur-3xl transition-colors relative z-10 whitespace-nowrap">
                                        Test Your Stress
                                    </span>
                                </div>
                            </motion.div>
                        </div>

                        <div className="hidden md:block w-[1px] h-[50px] bg-white/20 mb-8 ml-4"></div>

                        <motion.p
                            className="text-[0.95rem] md:text-[1.1rem] text-white/70 leading-[1.6] max-w-[450px] mx-auto md:mx-0 mt-10 md:mt-0 font-medium tracking-wide"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            A headband and shirt that watch your heart and brain. <span className="text-white font-semibold italic">Feel better before things get bad.</span>
                        </motion.p>
                    </motion.div>

                    <motion.div className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ y: y1, opacity }}>
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="auto"
                            fetchPriority="high"
                            poster="/poster.jpg"
                            className="absolute inset-0 w-full h-full object-cover"
                        >
                            <source src="/Timeline.mp4" type="video/mp4" />
                        </video>
                        <div className="absolute inset-0 bg-black/30"></div>
                    </motion.div>

                    <div className="z-10 hidden md:flex md:flex-col gap-6 md:gap-8 mt-6 md:mt-[10%] w-full md:w-auto items-center md:items-end">
                        <motion.div
                            onClick={() => setShowHeadband((prev) => !prev)}
                            className="bg-white/5 backdrop-blur-[15px] border border-white/10 rounded-[24px] p-5 md:p-6 w-full max-w-[280px] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all duration-300 hover:bg-white/10 hover:border-white/20 group cursor-pointer"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            whileHover={{ y: -5 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="flex items-center gap-3 mb-3 md:mb-4">
                                <Brain className="text-accent group-hover:scale-110 transition-transform" size={20} md:size={24} />
                                <span className="text-[1rem] md:text-[1.1rem] font-semibold text-white uppercase tracking-wider">Agna EEG</span>
                            </div>
                            <p className="hidden md:flex md:text-[0.9rem] text-white/60 leading-[1.5]">
                                Fun games and sounds that help calm your mind.
                            </p>
                            {showHeadband && (
                                <motion.img
                                    src={heartImage}
                                    alt="Dhritam headband"
                                    className="mt-4 w-full rounded-xl border border-white/10"
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.25 }}
                                />
                            )}
                        </motion.div>

                        <motion.div
                            className="bg-white/5 backdrop-blur-[15px] border border-white/10 rounded-[24px] p-5 md:p-6 w-full max-w-[280px] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all duration-300 hover:bg-white/10 hover:border-white/20 relative group"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            whileHover={{ y: -5 }}
                        >
                            <div className="flex items-center gap-3 mb-3 md:mb-4">
                                <Activity className="text-red-500 group-hover:scale-110 transition-transform" size={20} md:size={24} />
                                <span className="text-[1rem] md:text-[1.1rem] font-semibold text-white uppercase tracking-wider">Kavach ECG</span>
                            </div>
                            <div className="hidden md:flex md:text-[1.5rem] font-extrabold text-white my-1 md:my-2 leading-[1] font-outfit tracking-tighter">Always Watching</div>
                            <div className="hidden md:flex md:text-[0.8rem] uppercase text-white/40 tracking-widest font-semibold mb-2">Your heart, 24/7</div>

                            <motion.div
                                className="absolute right-6 bottom-6 bg-accent w-7 h-7 rounded-full flex items-center justify-center text-black cursor-pointer"
                                whileHover={{ scale: 1.2, rotate: 15 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Heart size={20} md:size={24} fill="currentColor" />
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                <BrainHeartIntro />
                <Problem />
                <div className="relative z-20">
                    <Hardware />
                    <Intervention />
                </div>
                <CompareSlider />
                <Testimonials onOpenOnboarding={() => setOnboardingOpen(true)} />
                <Pioneers onOpenOnboarding={() => setOnboardingOpen(true)} />
            </main>
            <Footer />
        </div>
    );
}

export default Home;
