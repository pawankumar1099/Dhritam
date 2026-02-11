import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { Heart } from 'lucide-react';

const CustomCursor = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 200 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const moveCursor = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseOver = (e) => {
            if (e.target.closest('button, a, .cursor-pointer')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [mouseX, mouseY]);

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
            style={{
                x: cursorX,
                y: cursorY,
                translateX: '-50%',
                translateY: '-50%',
            }}
        >
            <motion.div
                animate={{
                    scale: isHovering ? 1.5 : [1, 1.25, 1.1, 1.4, 1, 1],
                }}
                transition={{
                    scale: isHovering
                        ? { duration: 0.2 }
                        : {
                            duration: 1.5,
                            repeat: Infinity,
                            times: [0, 0.1, 0.2, 0.3, 0.5, 1],
                            ease: "easeInOut"
                        }
                }}
                className="relative flex items-center justify-center"
            >
                {/* 3D Heart Effect with red color */}
                <Heart
                    size={isHovering ? 32 : 24}
                    fill="#ff0000"
                    stroke="#ff0000"
                    className="drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]"
                />

                {/* Subtle pulse ring */}
                <motion.div
                    className="absolute inset-0 rounded-full border border-red-500/50"
                    animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "easeOut" }}
                />
            </motion.div>
        </motion.div>
    );
};

export default CustomCursor;
