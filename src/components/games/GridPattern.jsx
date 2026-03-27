import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const GridPattern = ({ onScore }) => {
    const [pattern, setPattern] = useState([]);
    const [userPattern, setUserPattern] = useState([]);
    const [difficulty, setDifficulty] = useState(3);
    const [isShowing, setIsShowing] = useState(true);

    const timeoutRef = useRef(null);

    const generatePattern = () => {
        const newPattern = [];
        const size = Math.floor(difficulty);

        while (newPattern.length < size) {
            const idx = Math.floor(Math.random() * 25);
            if (!newPattern.includes(idx)) newPattern.push(idx);
        }

        setPattern(newPattern);
        setUserPattern([]);
        setIsShowing(true);

        // clear old timeout
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            setIsShowing(false);
        }, Math.max(300, 1000 - difficulty * 70)); // shorter display time
    };

    useEffect(() => {
        generatePattern();

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [difficulty]);

    const handleTileClick = (idx) => {
        if (isShowing) return;

        setUserPattern((prev) => {
            let newUserPattern;

            if (prev.includes(idx)) {
                newUserPattern = prev.filter(p => p !== idx);
            } else {
                newUserPattern = [...prev, idx];
            }

            // progress check
            const patternSet = new Set(pattern);
            
            // if we clicked wrong tile, penalty immediately
            if (!patternSet.has(idx) && newUserPattern.length > prev.length) {
                 onScore(-1);
            }

            // check only when complete
            if (newUserPattern.length === pattern.length) {
                const isCorrect = newUserPattern.every(p => patternSet.has(p));

                if (isCorrect) {
                    onScore(3); // higher reward for pattern
                    setDifficulty(prev => Math.min(prev + 1.2, 20));
                } else {
                    setDifficulty(prev => Math.max(prev - 2, 2));
                }
            }

            return newUserPattern;
        });
    };

    return (
        <div className="flex flex-col items-center justify-center gap-6 md:gap-12 w-full h-full max-w-2xl px-4 py-8">
            <div className="flex flex-col items-center gap-1 md:gap-2 text-center">
                <span className="text-accent text-[8px] md:text-[10px] uppercase tracking-[0.4em] font-black opacity-40">Memory System Assessment</span>
                <p className={`text-xl md:text-3xl font-black font-outfit uppercase tracking-tighter ${isShowing ? 'text-accent' : 'text-white'}`}>
                    {isShowing ? 'SCANNING PATTERN...' : 'REPLICATE FROM MEMORY'}
                </p>
                {!isShowing && (
                    <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">Select {pattern.length} tiles</span>
                )}
            </div>

            <div className="grid grid-cols-5 gap-2 md:gap-4 w-full max-w-sm md:max-w-lg aspect-square p-3 md:p-6 bg-white/5 border-2 md:border-4 border-white/5 rounded-[2rem] md:rounded-[3rem] shadow-2xl relative overflow-hidden flex-shrink-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(219,255,0,0.02)_0%,transparent_70%)] pointer-events-none" />
                
                {Array.from({ length: 25 }).map((_, i) => (
                    <motion.div
                        key={i}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleTileClick(i)}
                        className={`
                            relative w-full h-full rounded-lg md:rounded-2xl cursor-pointer transition-all duration-300 border
                            ${(isShowing && pattern.includes(i)) 
                                ? 'bg-accent border-accent/80 shadow-[0_0_15px_rgba(219,255,0,0.3)]' 
                                : (!isShowing && userPattern.includes(i)) 
                                ? 'bg-accent/40 border-accent/60 shadow-[0_0_10px_rgba(219,255,0,0.2)]' 
                                : 'bg-white/5 border-white/5 hover:bg-white/10'}
                        `}
                    />
                ))}
            </div>
            
           
        </div>
    );
};

export default GridPattern;


