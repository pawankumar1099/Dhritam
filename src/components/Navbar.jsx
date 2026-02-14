import logo from '../assets/logo.png';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ onOpenOnboarding, light = false }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const navigate = useNavigate();

    const textColor = light ? 'text-black' : 'text-white';
    const bgColor = light ? 'text-black/70' : 'text-white/70';
    const hoverColor = light ? 'hover:text-black' : 'hover:text-white';
    const btnBg = light ? 'bg-black text-white' : 'bg-white text-black';

    useEffect(() => {
        const controlNavbar = () => {
            if (typeof window !== 'undefined') {
                if (window.scrollY < 50) {
                    setIsVisible(true);
                } else if (window.scrollY > lastScrollY) {
                    setIsVisible(false);
                } else {
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
                        <Link to="/" className="inline-flex items-center gap-2 cursor-pointer group shrink-0 whitespace-nowrap">
                            <div className="w-8 h-8 md:w-10 md:h-10 shrink-0 flex items-center justify-center">
                                <img src={logo} alt="Dhritam Logo" className={`w-full h-full object-contain transition-transform group-hover:scale-110 ${light ? 'invert' : ''}`} />
                            </div>
                            <span className={`text-lg md:text-xl font-bold ${textColor} tracking-widest font-outfit uppercase whitespace-nowrap`}>Dhritam</span>
                        </Link>

                        {/* Navigation Links */}
                        <div className="flex-1 flex justify-end items-center gap-6 md:gap-10">
                            <Link to="/technology" className={`text-[0.75rem] md:text-[0.9rem] font-medium ${bgColor} ${hoverColor} transition-colors uppercase tracking-wider font-outfit`}>
                                Technology
                            </Link>
                            <a href="https://www.linkedin.com/company/dhritam/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className={`text-[0.75rem] md:text-[0.9rem] font-medium ${bgColor} ${hoverColor} transition-colors uppercase tracking-wider font-outfit`}>
                                Updates
                            </a>
                            <div
                                onClick={onOpenOnboarding || (() => navigate('/'))}
                                className={`text-[0.75rem] md:text-[0.9rem] font-medium ${bgColor} ${hoverColor} transition-colors uppercase tracking-wider font-outfit cursor-pointer group/demo`}
                            >
                                <div className={`${btnBg} px-4 py-2 rounded-full font-bold transition-all group-hover/demo:bg-accent group-hover/demo:text-white`}>
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

