import React from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

const Footer = () => {
    return (
        <footer className="bg-black text-white py-12 md:py-16 px-6 md:px-[8%] border-t border-white/5 relative z-20">
            <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-10 md:gap-8">
                {/* Logo Section */}
                <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
                    <a href="https://www.linkedin.com/company/dhritam/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 hover:opacity-80 transition-opacity shrink-0 whitespace-nowrap">
                        <div className="w-8 h-8 shrink-0">
                            <img src={logo} alt="Dhritam Logo" className="w-full h-full object-contain" />
                        </div>
                        <span className="text-xl font-bold tracking-widest font-outfit uppercase whitespace-nowrap">Dhritam</span>
                    </a>
                    <p className="text-white/40 text-sm max-w-[300px] leading-relaxed">
                        Redefining human performance through advanced technology and neurological innovation.
                    </p>
                </div>

                {/* Links / Socials */}
                <div className="flex flex-col items-center md:items-end gap-6">
                    <div className="flex gap-8">
                        <a href="#technology" className="text-sm font-medium text-white/60 hover:text-white transition-colors uppercase tracking-wider font-outfit">Technology</a>
                        <a href="https://www.linkedin.com/company/dhritam/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-white/60 hover:text-white transition-colors uppercase tracking-wider font-outfit">Updates</a>
                    </div>
                    <div className="flex gap-6">
                        <a href="#" className="text-white/40 hover:text-white transition-colors">
                            <span className="sr-only">X (Twitter)</span>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                        </a>
                        <a href="#" className="text-white/40 hover:text-white transition-colors">
                            <span className="sr-only">Instagram</span>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.848 0-3.204.012-3.584.07-4.849.149-3.225-1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.981 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                        </a>
                        <a href="https://www.linkedin.com/company/dhritam/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
                            <span className="sr-only">LinkedIn</span>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="max-w-[1400px] mx-auto mt-12 md:mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[0.65rem] md:text-xs tracking-widest text-white/20 uppercase font-outfit">
                <span>© 2025 Dhritam. All rights reserved.</span>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-white/40 transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white/40 transition-colors">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
