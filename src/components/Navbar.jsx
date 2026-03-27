import logo from '../assets/logo.png';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ onOpenOnboarding, onOpenAssessment, light = false }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
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
                    className="fixed top-0 left-0 w-full z-[100] px-6 md:px-[8%] py-6 pointer-events-none "
                >
                    <div className="flex items-center w-full max-w-[1400px] mx-auto pointer-events-auto">
                        {/* Logo */}
                        <Link to="/" className="inline-flex items-center gap-2 cursor-pointer group shrink-0 whitespace-nowrap">
                            <div className="flex items-center gap-2 w-8 h-8 md:w-10 md:h-10 shrink-0">
                                <img src={logo} alt="Dhritam Logo" className="h-8 w-8" />
                                <span className="font-bold text-lg text-white">DHRITAM</span>
                            </div>
                        </Link>

                        {/* Spacer to push hamburger to right in mobile */}
                        <div className="flex-1" />

                        {/* Hamburger Icon for mobile - only visible on mobile */}
                        <button
                            className="md:hidden flex items-center justify-center p-2 rounded focus:outline-none"
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Toggle menu"
                        >
                            <svg className="md:hidden w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>

                        {/* Navigation Links - desktop */}
                        <div className="hidden md:flex flex-1 justify-end items-center gap-6 md:gap-10">
                            <Link to="/technology" className={`text-[0.75rem] md:text-[0.9rem] font-medium ${bgColor} ${hoverColor} transition-colors uppercase tracking-wider font-outfit`}>
                                Technology
                            </Link>
                            <a href="https://blog.dhritam.com" target="_blank" rel="noopener noreferrer" className={`text-[0.75rem] md:text-[0.9rem] font-medium ${bgColor} ${hoverColor} transition-colors uppercase tracking-wider font-outfit`}>
                                Blog
                            </a>
                            <a href="https://www.linkedin.com/company/dhritam/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className={`text-[0.75rem] md:text-[0.9rem] font-medium ${bgColor} ${hoverColor} transition-colors uppercase tracking-wider font-outfit`}>
                                Updates
                            </a>
                            <span
                                onClick={onOpenAssessment}
                                className="relative inline-flex h-10 md:h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-black shrink-0"
                            >
                                <span className="absolute inset-[-1000%] animate-spin-slow bg-[conic-gradient(from_90deg_at_50%_50%,#DBFF00_0%,#393BB2_50%,#DBFF00_100%)]" />
                                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-black px-4 md:px-6 py-1 text-[0.75rem] md:text-[0.9rem] font-black text-white hover:text-accent font-outfit uppercase tracking-wider backdrop-blur-3xl transition-colors relative z-10 whitespace-nowrap">
                                    Test Your Brain
                                </span>
                            </span>

                            
                            <div
                                onClick={onOpenOnboarding || (() => navigate('/'))}
                                className="relative inline-flex h-10 md:h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-black shrink-0 cursor-pointer group"
                            >
                                <span className="absolute inset-[-1000%] animate-spin-slow bg-[conic-gradient(from_90deg_at_50%_50%,#FFFFFF_0%,#393BB2_50%,#FFFFFF_100%)] opacity-20 group-hover:opacity-100 transition-opacity" />
                                <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-white px-4 md:px-6 py-1 text-[0.75rem] md:text-[0.9rem] font-black text-black backdrop-blur-3xl transition-all relative z-10 whitespace-nowrap">
                                    Free Demo
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu Dropdown */}
                    {menuOpen && (
                        <div className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-lg flex flex-col items-center py-6 gap-6 md:hidden z-[101] shadow-lg pointer-events-auto">
                            <Link to="/technology" className={`text-base font-medium ${bgColor} ${hoverColor} transition-colors uppercase tracking-wider font-outfit`} onClick={() => setMenuOpen(false)}>
                                Technology
                            </Link>
                            <a href="https://blog.dhritam.com" target="_blank" rel="noopener noreferrer" className={`text-base font-medium ${bgColor} ${hoverColor} transition-colors uppercase tracking-wider font-outfit`} onClick={() => setMenuOpen(false)}>
                                Blog
                            </a>
                            <a href="https://www.linkedin.com/company/dhritam/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className={`text-base font-medium ${bgColor} ${hoverColor} transition-colors uppercase tracking-wider font-outfit`} onClick={() => setMenuOpen(false)}>
                                Updates
                            </a>
                            <button
                                onClick={() => { setMenuOpen(false); onOpenAssessment(); }}
                                className={`text-base font-medium ${bgColor} ${hoverColor} transition-colors uppercase tracking-wider font-outfit cursor-pointer`}
                            >
                                Play Game
                            </button>
                            <div
                                onClick={() => { setMenuOpen(false); (onOpenOnboarding || (() => navigate('/')))(); }}
                                className={`text-base font-medium ${bgColor} ${hoverColor} transition-colors uppercase tracking-wider font-outfit cursor-pointer group/demo`}
                            >
                                <div className={`${btnBg} px-4 py-2 rounded-full font-bold transition-all group-hover/demo:bg-accent group-hover/demo:text-white`}>
                                    Free Demo
                                </div>
                            </div>
                        </div>
                    )}
                </motion.nav>
            )}
        </AnimatePresence>
    );
};


export default Navbar;

