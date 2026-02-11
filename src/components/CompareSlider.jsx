import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import beforeImg from '../assets/before.png';
import afterImg from '../assets/after.png';

const CompareSlider = () => {
    const [sliderPos, setSliderPos] = useState(50);
    const containerRef = useRef(null);

    const handleMove = (client) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((client.clientX - rect.left) / rect.width) * 100;
        setSliderPos(Math.min(Math.max(x, 0), 100));
    };

    const handleMouseMove = (e) => handleMove(e);
    const handleTouchMove = (e) => handleMove(e.touches[0]);

    return (
        <section className="bg-black py-16 md:py-24 px-6 md:px-[8%] relative z-[20] overflow-hidden">
            <div className="max-w-[1200px] mx-auto text-center mb-12 md:mb-16">
                <motion.h2
                    className="text-[2.5rem] md:text-[4rem] font-semibold leading-[1.1] text-white mb-4 md:mb-6 tracking-tight font-outfit"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    See The Difference
                </motion.h2>
                <p className="text-lg md:text-xl text-white/60 max-w-[700px] mx-auto leading-relaxed">
                    Experience the transformation. Slide to see how we help you achieve your peak performance and well-being.
                </p>
            </div>

            <div
                ref={containerRef}
                className="relative w-full aspect-[16/10] max-h-[700px] rounded-[32px] overflow-hidden cursor-ew-resize select-none border border-white/10 group"
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
            >
                {/* Before Image (Bottom) */}
                <div className="absolute inset-0">
                    <img
                        src={afterImg}
                        alt="After"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 md:top-8 md:right-8 bg-black/40 backdrop-blur-md px-4 md:px-6 py-1.5 md:py-2 rounded-full border border-white/20 text-white text-xs md:text-sm font-medium">
                        AFTER
                    </div>
                </div>

                {/* After Image (Top / Clipped) */}
                <div
                    className="absolute inset-0"
                    style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                >
                    <img
                        src={beforeImg}
                        alt="Before"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 md:top-8 md:left-8 bg-black/40 backdrop-blur-md px-4 md:px-6 py-1.5 md:py-2 rounded-full border border-white/20 text-white text-xs md:text-sm font-medium">
                        BEFORE
                    </div>
                </div>

                {/* Slider Handle */}
                <div
                    className="absolute inset-y-0 left-0 w-[2px] bg-white z-10 pointer-events-none"
                    style={{ left: `${sliderPos}%` }}
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.5)] flex items-center justify-center">
                        <div className="flex gap-1">
                            <div className="w-1 h-4 bg-black rounded-full"></div>
                            <div className="w-1 h-4 bg-black rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CompareSlider;
