import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NeuralGate = ({ onScore }) => {
    const [state, setState] = useState('idle');
    const [feedback, setFeedback] = useState(null);

    const timeoutRef = useRef(null);

    const startTrial = () => {
        // Step 1: wait before showing ring (shorter wait)
        timeoutRef.current = setTimeout(() => {
            const isGo = Math.random() > 0.35; // increased NOGO frequency
            const newState = isGo ? 'go' : 'nogo';

            setState(newState);

            // Step 2: show ring for fixed time (much shorter display time)
            timeoutRef.current = setTimeout(() => {
                // If user DID NOT click red → reward
                if (newState === 'nogo') {
                    onScore(1);
                }

                setState('idle');

                // Step 3: start next round AFTER tiny gap
                timeoutRef.current = setTimeout(() => {
                    startTrial();
                }, 150);

            }, 400 + Math.random() * 200); // reduced from 700

        }, 400 + Math.random() * 600);
    };

    useEffect(() => {
        startTrial();

        return () => clearTimeout(timeoutRef.current);
    }, []);

    const handleRingClick = (clickedState) => {
        if (state === 'idle') return;

        clearTimeout(timeoutRef.current);

        if (state === 'go') {
            onScore(1);
            setFeedback({ type: 'success', text: 'FAST REFLEX' });
        } else {
            onScore(-5); // doubled penalty
            setFeedback({ type: 'error', text: 'INHIBITION FAILURE' });
        }

        setState('idle');

        setTimeout(() => setFeedback(null), 400);

        // restart faster after click
        setTimeout(startTrial, 150);
    };

    return (
        <div className="flex flex-col items-center justify-center gap-16 w-full h-full select-none max-w-2xl">
            
            <div className="flex flex-col items-center gap-2">
                <span className="text-accent text-[10px] uppercase tracking-[0.4em] font-bold opacity-30">Inhibition Control</span>
                <div className="text-white/60 text-xl font-medium tracking-tight">
                    <span className="text-accent font-black">FAST TAP</span> Gold • <span className="text-primary font-black italic">AVOID</span> Red
                </div>
            </div>

            <div className="relative w-72 h-72 md:w-[22rem] md:h-[22rem] flex items-center justify-center p-4">

                <AnimatePresence mode="wait">

                    {state === 'go' && (
                        <motion.div
                            key="go"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 1.5, opacity: 0 }}
                            onClick={() => handleRingClick('go')}
                            className="absolute w-full h-full rounded-full border-[22px] border-accent cursor-pointer shadow-[0_0_80px_rgba(219,255,0,0.5)] flex items-center justify-center group"
                        >
                            <motion.div 
                                animate={{ scale: [1, 1.05, 1] }} 
                                transition={{ repeat: Infinity, duration: 0.5 }}
                                className="w-[80%] h-[80%] rounded-full border-4 border-accent/20" 
                            />
                        </motion.div>
                    )}

                    {state === 'nogo' && (
                        <motion.div
                            key="nogo"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 1.5, opacity: 0 }}
                            onClick={() => handleRingClick('nogo')}
                            className="absolute w-full h-full rounded-full border-[26px] border-primary cursor-pointer shadow-[0_0_100px_rgba(255,77,0,0.6)] flex items-center justify-center"
                        >
                             <div className="w-[80%] h-[80%] rounded-full border-4 border-primary/10" />
                        </motion.div>
                    )}

                </AnimatePresence>

                <AnimatePresence>
                    {feedback && (
                        <motion.div 
                            initial={{ y: 20, opacity: 0, scale: 0.8 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className={`absolute text-4xl font-black font-outfit uppercase tracking-tighter drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] ${feedback.type === 'success' ? 'text-accent' : 'text-primary'}`}
                        >
                            {feedback.text}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            
            <div className="text-white/10 text-[10px] uppercase tracking-widest font-bold">
                Direct Neural Response Test
            </div>
        </div>
    );
};

export default NeuralGate;