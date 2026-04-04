import { useRef, useEffect, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Technology = () => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const [images, setImages] = useState([]);
    const [currentFrame, setCurrentFrame] = useState(1);
    const [activeSection, setActiveSection] = useState('hero');

    // Configuration for the frames
    const frameCount = 192;
    
    // Total frames: 192 * 3 = 576 frames in total if we want all frames from each product
    // However, the user wants a single 400vh-600vh scroll sequence. 
    // Let's create a combined sequence logic where we cycle through all 192 frames of each product.
    
    const getFramePath = (index) => {
        // index will go from 0 to (frameCount * 3) - 1
        const productIndex = Math.floor(index / frameCount);
        const frameInProduct = (index % frameCount) + 1;
        const paddedIndex = frameInProduct.toString().padStart(4, '0');
        
        const folders = ['DhritamCore', 'Agna', 'kavach'];
        return `/src/assets/${folders[productIndex]}/frame_${paddedIndex}.jpeg`;
    };

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Smooth scroll progress for the animation
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Preload images - All 576 frames
    useEffect(() => {
        const preloadImages = async () => {
            const loadedImages = [];
            const totalFrames = frameCount * 3;
            for (let i = 0; i < totalFrames; i++) {
                const img = new Image();
                img.src = getFramePath(i);
                loadedImages.push(img);
            }
            setImages(loadedImages);
        };
        preloadImages();
    }, []);

    // Canvas drawing logic
    useEffect(() => {
        if (!canvasRef.current || images.length === 0) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d', { alpha: false }); // Optimization for black background
        const totalFrames = frameCount * 3;

        const resizeCanvas = () => {
            const parent = canvas.parentElement;
            const dpr = window.devicePixelRatio || 1;
            
            // Set display size (css pixels)
            canvas.style.width = `${parent.clientWidth}px`;
            canvas.style.height = `${parent.clientHeight}px`;
            
            // Set actual drawing surface size (physical pixels)
            canvas.width = parent.clientWidth * dpr;
            canvas.height = parent.clientHeight * dpr;
            
            // Scale context to match DPR
            context.scale(dpr, dpr);
            
            // Set high quality rendering
            context.imageSmoothingEnabled = true;
            context.imageSmoothingQuality = 'high';
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        
        const updateCanvas = (progress) => {
            const frameIndex = Math.min(
                totalFrames - 1,
                Math.floor(progress * totalFrames)
            );
            
            const img = images[frameIndex];
            if (img && img.complete) {
                const parent = canvas.parentElement;
                const canvasW = parent.clientWidth;
                const canvasH = parent.clientHeight;

                const imgRatio = img.width / img.height;
                const canvasRatio = canvasW / canvasH;
                let drawWidth, drawHeight, offsetX, offsetY;

                if (canvasRatio > imgRatio) {
                    drawWidth = canvasW;
                    drawHeight = canvasW / imgRatio;
                    offsetX = 0;
                    offsetY = (canvasH - drawHeight) / 2;
                } else {
                    drawWidth = canvasH * imgRatio;
                    drawHeight = canvasH;
                    offsetX = (canvasW - drawWidth) / 2;
                    offsetY = 0;
                }

                // Note: We use canvasW/H here because the context is already scaled by DPR
                context.clearRect(0, 0, canvasW, canvasH);
                context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
            }
        };

        const unsubscribe = smoothProgress.on("change", (latest) => {
            updateCanvas(latest);
            
            // Section tracking based on 0-1 progress
            if (latest < 0.15) setActiveSection('hero');
            else if (latest < 0.35) setActiveSection('breakdown');
            else if (latest < 0.55) setActiveSection('agna');
            else if (latest < 0.75) setActiveSection('core');
            else if (latest < 0.90) setActiveSection('kavach');
            else setActiveSection('reassembly');
        });

        updateCanvas(0);

        return () => {
            unsubscribe();
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [images, smoothProgress]);

    // Text animations based on scroll progress
    const heroOpacity = useTransform(scrollYProgress, [0, 0.1, 0.15], [1, 1, 0]);
    const breakdownOpacity = useTransform(scrollYProgress, [0.15, 0.2, 0.3, 0.35], [0, 1, 1, 0]);
    const agnaOpacity = useTransform(scrollYProgress, [0.35, 0.4, 0.5, 0.55], [0, 1, 1, 0]);
    const coreOpacity = useTransform(scrollYProgress, [0.55, 0.6, 0.7, 0.75], [0, 1, 1, 0]);
    const kavachOpacity = useTransform(scrollYProgress, [0.75, 0.8, 0.85, 0.9], [0, 1, 1, 0]);
    const finalOpacity = useTransform(scrollYProgress, [0.9, 0.95], [0, 1]);

    return (
        <div className="bg-[#050505] text-white font-outfit selection:bg-cyan-500/30">
            <Helmet>
                <title>Technology | Dhritam - Intelligence. Engineered.</title>
            </Helmet>
            
            <Navbar />

            <div ref={containerRef} className="relative h-[600vh] bg-black">
                {/* Sticky Canvas Container */}
                <div className="sticky top-0 h-screen w-full overflow-hidden">
                    <canvas 
                        ref={canvasRef}
                        className="w-full h-full"
                    />
                    
                    {/* Enhanced Radial Glow for Depth */}
                    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(219,255,0,0.12)_0%,transparent_70%)]" />
                    
                    {/* Cinematic Vignettes - Combats Camouflage on All Screen Sizes */}
                    <div className="absolute inset-y-0 left-0 w-1/3 pointer-events-none bg-gradient-to-r from-black/90 via-black/40 to-transparent hidden md:block" />
                    <div className="absolute inset-y-0 right-0 w-1/3 pointer-events-none bg-gradient-to-l from-black/90 via-black/40 to-transparent hidden md:block" />
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/60 via-transparent to-black/90" />
                </div>

                {/* Overlays / Content Layers */}
                <div className="absolute inset-0 z-10 pointer-events-none font-outfit">
                    
                    {/* 1. HERO (0–15%) */}
                    <section className="h-screen flex flex-col items-center justify-center text-center px-6">
                        <motion.div style={{ opacity: heroOpacity }} className="max-w-4xl">
                            <h1 className="text-5xl md:text-9xl font-black tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-500 uppercase italic">
                                Dhritam Tech
                            </h1>
                            <p className="text-xl md:text-3xl text-[#DBFF00] font-bold tracking-[0.2em] mb-4 md:mb-6 uppercase drop-shadow-[0_0_20px_rgba(219,255,0,0.5)]">
                                Intelligence. Engineered.
                            </p>
                            <p className="text-white/80 md:text-white/60 text-base md:text-xl max-w-2xl mx-auto leading-relaxed px-4 font-light italic">
                                A unified system built to think, adapt, and protect in real time.
                            </p>
                        </motion.div>
                    </section>

                    {/* 2. SYSTEM BREAKDOWN (15–35%) */}
                    <section className="h-screen flex items-center justify-center md:items-center md:justify-start px-6 md:px-[10%]">
                        <motion.div style={{ opacity: breakdownOpacity }} className="max-w-xl text-center md:text-left p-8 md:p-12">
                            <h2 className="text-3xl md:text-6xl font-black mb-8 tracking-tight">A system built <span className="text-white/40 italic">in layers.</span></h2>
                            <div className="space-y-6 text-white/80 md:text-white/60 text-lg md:text-2xl font-light leading-snug">
                                <p>Every function is modular. <br className="hidden md:block" />Every layer has purpose.</p>
                                <p>Designed for clarity, performance, and control at scale.</p>
                            </div>
                        </motion.div>
                    </section>

                    {/* 3. AGNA (35–55%) */}
                    <section className="h-screen flex items-center justify-center md:justify-end px-6 md:px-[10%] text-center md:text-right">
                        <motion.div style={{ opacity: agnaOpacity }} className="max-w-xl p-8 md:p-12">
                            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight text-[#DBFF00]">Agna — <span className="text-white italic">The Eye.</span></h2>
                            <div className="space-y-6 text-white/80 md:text-white/60 text-lg md:text-2xl font-light leading-relaxed">
                                <p>Advanced computer vision and neural monitoring working in tandem.</p>
                                <p>Agna serves as the cognitive layer, interpreting complex signals with surgical precision.</p>
                            </div>
                        </motion.div>
                    </section>

                    {/* 4. CORE (55–75%) */}
                    <section className="h-screen flex items-center justify-center md:justify-start px-6 md:px-[10%] text-center md:text-left">
                        <motion.div style={{ opacity: coreOpacity }} className="max-w-xl p-8 md:p-12">
                            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight text-white">Dhritam Core — <span className="text-white/40 italic">The Engine.</span></h2>
                            <div className="space-y-6 text-white/80 md:text-white/60 text-lg md:text-2xl font-light leading-relaxed">
                                <p>The high-performance processing hub where bio-data meets silicon intelligence.</p>
                                <p>Engineered for zero-latency execution and massive analytical throughput.</p>
                            </div>
                        </motion.div>
                    </section>

                    {/* 5. KAVACH (75–90%) */}
                    <section className="h-screen flex items-center justify-center md:justify-end px-6 md:px-[10%] text-center md:text-right">
                        <motion.div style={{ opacity: kavachOpacity }} className="max-w-xl p-8 md:p-12">
                            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight text-white">Kavach — <span className="text-[#DBFF00] italic">The Shield.</span></h2>
                            <div className="space-y-6 text-white/80 md:text-white/60 text-lg md:text-2xl font-light leading-relaxed">
                                <p>Security is the foundation. Kavach embeds robust protection into every neural path.</p>
                                <p>Continuous verification ensuring transparency and trust at every interaction point.</p>
                            </div>
                        </motion.div>
                    </section>

                    {/* 6. REASSEMBLY + CTA (90–100%) */}
                    <section className="h-screen flex flex-col items-center justify-center text-center px-6">
                        <motion.div style={{ opacity: finalOpacity }} className="max-w-4xl pointer-events-auto">
                            <h2 className="text-5xl md:text-9xl font-black mb-6 tracking-tighter drop-shadow-2xl italic">One System.</h2>
                            <p className="text-xl md:text-4xl text-[#DBFF00] mb-10 md:mb-16 font-bold tracking-[0.3em] uppercase drop-shadow-[0_0_20px_rgba(219,255,0,0.4)]">Total Control.</p>
                            
                            <div className="flex flex-col sm:flex-row gap-4 md:gap-8 justify-center">
                                <Link to='/'>
                                  <span className="cursor-pointer px-10 py-5 bg-white text-black font-black text-xl rounded-full hover:bg-[#DBFF00] hover:text-black transition-all duration-500 transform hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                                    EXPLORE DHRITAM
                                </span>
                                </Link>
                            </div>
                            
                            <p className="mt-12 text-white/40 uppercase tracking-[0.4em] text-[10px] md:text-sm font-bold">
                                Engineering the Pulse of Tomorrow.
                            </p>
                        </motion.div>
                    </section>
                </div>
            </div>

            {/* Bottom Progress Indicator */}
            <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 flex gap-3">
                {['hero', 'breakdown', 'agna', 'core', 'kavach', 'reassembly'].map((section) => (
                    <div 
                        key={section}
                        className={`h-1.5 rounded-full transition-all duration-700 ease-in-out ${
                            activeSection === section ? 'bg-[#DBFF00] w-16 shadow-[0_0_10px_rgba(219,255,0,0.8)]' : 'bg-white/10 w-8'
                        }`}
                    />
                ))}
            </div>

            <Footer />
        </div>
    );
};

export default Technology;

