import logo from '../assets/logo.png';
import { useState } from 'react';
import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
const Navbar = ({ onOpenOnboarding }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const controlNavbar = () => {
            if (typeof window !== 'undefined') {
                if (window.scrollY < 50) {
                    setIsVisible(true);
                } else if (window.scrollY > lastScrollY) {
                    // Scrolling down
                    setIsVisible(false);
                } else {
                    // Scrolling up
                    setIsVisible(true);
                }
                setLastScrollY(window.scrollY);
            }
        };

        window.addEventListener('scroll', controlNavbar);
        return () => window.removeEventListener('scroll', controlNavbar);
    }, [lastScrollY]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.nav
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="fixed top-0 left-0 w-full z-[100] px-6 md:px-[8%] py-6 flex items-center justify-between pointer-events-none"
                >
                    <div className="flex items-center gap-4 md:gap-8 w-full max-w-[1400px] mx-auto pointer-events-auto">
                        {/* Logo */}
                        <div className="flex items-center gap-2 cursor-pointer group">
                            <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
                                <img src={logo} alt="Dhritam Logo" className="w-full h-full object-contain transition-transform group-hover:scale-110" />
                            </div>
                            <span className="text-lg md:text-xl font-bold text-white tracking-widest font-outfit uppercase">Dhritam</span>
                        </div>

                        {/* Navigation Links */}
                        <div className="flex-1 flex justify-end items-center gap-6 md:gap-10">
                            <a href="#technology" className="text-[0.75rem] md:text-[0.9rem] font-medium text-white/70 hover:text-white transition-colors uppercase tracking-wider font-outfit">
                                Technology
                            </a>
                            <a href="https://www.linkedin.com/company/dhritam/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="text-[0.75rem] md:text-[0.9rem] font-medium text-white/70 hover:text-white transition-colors uppercase tracking-wider font-outfit">
                                Updates
                            </a>
                            <div
                                onClick={onOpenOnboarding}
                                className="text-[0.75rem] md:text-[0.9rem] font-medium text-white/70 hover:text-white transition-colors uppercase tracking-wider font-outfit cursor-pointer group/demo"
                            >
                                <div className='bg-white px-4 py-2 rounded-full text-black font-bold transition-all group-hover/demo:bg-accent'>
                                    Free Demo
                                </div>
                            </div>

                        </div>
                    </div>
                </motion.nav>
            )}
        </AnimatePresence>
    );
};


export default Navbar;
