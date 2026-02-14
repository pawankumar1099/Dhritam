import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollSequence = ({ frames, folder, title, description, reverse = false }) => {
    const canvasRef = useRef(null);
    const sectionRef = useRef(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);
    const [images, setImages] = useState([]);

    useEffect(() => {
        const frameCount = frames;
        const loadedImages = [];
        let loadedCount = 0;

        // Preload logic
        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            const frameIndex = (i + 1).toString().padStart(3, '0');
            // Correct path for Vite assets
            img.src = new URL(`../assets/${folder}/ezgif-frame-${frameIndex}.jpg`, import.meta.url).href;

            img.onload = () => {
                loadedCount++;
                setLoadProgress(Math.round((loadedCount / frameCount) * 100));
                if (loadedCount === frameCount) {
                    setImages(loadedImages);
                    setImagesLoaded(true);
                    // Crucial: Refresh GSAP after layout might have changed
                    ScrollTrigger.refresh();
                }
            };
            loadedImages.push(img);
        }
    }, [frames, folder]);

    useEffect(() => {
        if (!imagesLoaded || images.length === 0) return;

        const ctx = gsap.context(() => {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            canvas.width = 1920;
            canvas.height = 1080;

            const sequence = { frame: 0 };
            const frameCount = frames;

            const render = () => {
                const img = images[sequence.frame];
                if (img && img.complete) {
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    // Increase the scale factor to zoom in on the product (1.25x zoom)
                    const baseScale = Math.min(canvas.width / img.width, canvas.height / img.height);
                    const scale = baseScale * 1.25;
                    const x = (canvas.width / 2) - (img.width / 2) * scale;
                    const y = (canvas.height / 2) - (img.height / 2) * scale;
                    context.drawImage(img, x, y, img.width * scale, img.height * scale);
                }
            };

            // Pin the section and control the frame sequence
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top top",
                end: "+=350%", // Even longer to ensure it feels "stuck"
                scrub: 1,
                pin: true,
                pinSpacing: true,
                anticipatePin: 1,
                onUpdate: (self) => {
                    const frameIndex = Math.min(
                        frameCount - 1,
                        Math.floor(self.progress * frameCount)
                    );
                    sequence.frame = frameIndex;
                    render();
                }
            });

            // Text animations
            gsap.fromTo(`.text-content-${folder}`,
                { opacity: 0, y: 100 },
                {
                    opacity: 1,
                    y: 0,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "top top",
                        scrub: true,
                    }
                }
            );

            // Initial render
            render();
            ScrollTrigger.refresh();
        }, sectionRef);

        return () => ctx.revert();
    }, [imagesLoaded, images, frames, folder]);

    return (
        <section
            ref={sectionRef}
            className="relative w-full h-screen bg-white flex items-center justify-center p-4 md:p-8"
        >
            {!imagesLoaded ? (
                <div className="flex flex-col items-center gap-4 rounded-lg">
                    <div className="w-64 h-1 bg-black/5 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-accent transition-all duration-300 "
                            style={{ width: `${loadProgress}%` }}
                        ></div>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-black/30">Loading Module: {loadProgress}%</span>
                </div>
            ) : (
                <div className="w-full max-w-[1800px] h-full mx-auto px-6 md:px-[5%] flex flex-col md:flex-row items-center justify-between gap-12">

                    {/* Content Section */}
                    <div className={`w-full md:w-[30%] z-10 text-black text-content-${folder} ${reverse ? 'md:order-2' : ''}`}>
                        <h2 className="text-6xl md:text-[6.5rem] font-bold mb-8 uppercase tracking-tighter font-outfit leading-[0.85]">
                            {title}
                        </h2>
                        <p className="text-xl md:text-2xl text-black/60 leading-relaxed max-w-lg font-medium">
                            {description}
                        </p>
                    </div>

                    {/* Canvas Section (The "Frame") */}
                    <div className={`w-full md:w-[65%] h-[75vh] md:h-[90vh] flex items-center justify-center bg-gray-100/50 rounded-[5rem] md:rounded-[6rem] p-0 shadow-2xl border border-black/10 overflow-hidden relative ${reverse ? 'md:order-1' : ''}`}>
                        <canvas
                            ref={canvasRef}
                            className="w-full h-full object-contain mix-blend-multiply"
                        />
                    </div>

                </div>
            )}
        </section>
    );
};

export default ScrollSequence;
