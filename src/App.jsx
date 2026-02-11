import { useState } from 'react';
import { ArrowUpRight, Activity, Heart, Brain } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Pioneers from './components/Pioneers';
import Problem from './components/Problem';
import CompareSlider from './components/CompareSlider';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hardware from './components/Hardware';
import Intervention from './components/Intervention';
import ECGAnimation from './components/ECGAnimation';
import TextReveal from './components/TextReveal';
import CustomCursor from './components/CustomCursor';
import OnboardingForm from './components/OnboardingForm';

import heroVideo from './assets/Timeline.mov';

import './index.css';

function App() {
    const [onboardingOpen, setOnboardingOpen] = useState(false);
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <div className="w-full bg-black">
            <CustomCursor />
            <Navbar onOpenOnboarding={() => setOnboardingOpen(true)} />
            <OnboardingForm isOpen={onboardingOpen} onClose={() => setOnboardingOpen(false)} />


            {/* Sticky Hero */}
            <div className="sticky top-0 w-full h-screen bg-black bg-[url('/bg.png')] bg-cover bg-center flex flex-col md:flex-row items-center justify-between px-6 md:px-[8%] py-24 md:py-0 overflow-hidden z-[1]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none"></div>

                {/* Left Content */}
                <motion.div
                    className="z-10 w-full md:max-w-[550px] text-center md:text-left mt-12 md:mt-0"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-[3rem] md:text-[4.5rem] font-extrabold leading-[1] uppercase text-white mb-6 md:mb-8 tracking-[-2px] md:tracking-[-3px] zalando-sans-expanded-font">
                        <TextReveal text="DHRITAM" className="text-accent block zalando-sans-expanded-font justify-center md:justify-start" delay={0.1} />
                        <TextReveal text="— OWN" className="block zalando-sans-expanded-font justify-center md:justify-start" delay={0.2} />
                        <TextReveal text="THE BEAT" className="block zalando-sans-expanded-font justify-center md:justify-start" delay={0.3} />
                    </h1>

                    <motion.div
                        onClick={() => setOnboardingOpen(true)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block"
                    >
                        <div className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-semibold text-[1rem] md:text-[1.1rem] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(255,255,255,0.2)] mb-6 md:mb-8 mt-4 cursor-pointer">
                            Protect Your Heart <ArrowUpRight size={20} />
                        </div>
                    </motion.div>

                    <div className="hidden md:block w-[1px] h-[70px] bg-white/20 mb-8 ml-4"></div>

                    <motion.p
                        className="text-[0.95rem] md:text-[1.1rem] text-white/70 leading-[1.6] max-w-[450px] mx-auto md:mx-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        The world's first <span className="text-white font-semibold italic">Neuro-Cardiac Companion</span> designed to prevent physical heart failure by monitoring the brain's stress signals.
                    </motion.p>
                </motion.div>

                {/* Full-Screen Background Video */}
                <motion.div
                    className="absolute inset-0 w-full h-full pointer-events-none z-0"
                    style={{ y: y1, opacity }}
                >
                    <video
                        src={heroVideo}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover "
                    />
                    {/* Overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/30"></div>
                </motion.div>

                {/* Right Content / Floating Cards */}
                <div className="z-10 flex flex-col md:flex-col gap-6 md:gap-8 mt-12 md:mt-[10%] w-full md:w-auto items-center md:items-end">
                    <motion.div
                        className="bg-white/5 backdrop-blur-[15px] border border-white/10 rounded-[24px] p-5 md:p-6 w-full max-w-[280px] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all duration-300 hover:bg-white/10 hover:border-white/20 group"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        whileHover={{ y: -5 }}
                    >
                        <div className="flex items-center gap-3 mb-3 md:mb-4">
                            <Brain className="text-accent group-hover:scale-110 transition-transform" size={20} md:size={24} />
                            <span className="text-[1rem] md:text-[1.1rem] font-semibold text-white uppercase tracking-wider">Agna BCI</span>
                        </div>
                        <p className="text-[0.85rem] md:text-[0.9rem] text-white/60 leading-[1.5]">
                            Neural monitoring for stress, autonomic state, and recovery focus.
                        </p>
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
                            <span className="text-[1rem] md:text-[1.1rem] font-semibold text-white uppercase tracking-wider">Kavach X</span>
                        </div>
                        <div className="text-[2rem] md:text-[2.5rem] font-extrabold text-white my-1 md:my-2 leading-[1] font-outfit tracking-tighter">Neural-Sync</div>
                        <div className="text-[0.7rem] md:text-[0.8rem] uppercase text-white/40 tracking-widest font-semibold mb-2">Predictive AI Monitoring</div>

                        <motion.div
                            className="absolute right-6 bottom-6 bg-accent w-10 h-10 rounded-full flex items-center justify-center text-black cursor-pointer"
                            whileHover={{ scale: 1.2, rotate: 15 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Heart size={20} md:size={24} fill="currentColor" />
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            <Problem />
            <div className="relative z-20"> {/* Wrapper to ensure solid black background over sticky hero */}
                <Hardware />
                <Intervention />
            </div>
            <CompareSlider />
            <Pioneers onOpenOnboarding={() => setOnboardingOpen(true)} />
            <Footer />
        </div>
    );
}


export default App;
