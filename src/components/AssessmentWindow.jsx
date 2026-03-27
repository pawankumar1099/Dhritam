import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NumericalRacer from './games/NumericalRacer';
import NeuralGate from './games/NeuralGate';
import GridPattern from './games/GridPattern';

const AssessmentWindow = ({ isOpen, onClose, onOpenOnboarding }) => {
    const [step, setStep] = useState('intro');
    const [timeLeft, setTimeLeft] = useState(30);
    const [score, setScore] = useState({
        numerical: 0,
        neuralGate: 0,
        grid: 0
    });

    const timerRef = useRef(null);

    const startGame = (gameStep) => {
        clearInterval(timerRef.current); // prevent overlap
        setStep(gameStep);
        setTimeLeft(30);
    };

    // ⏱ Timer logic
    useEffect(() => {
        if (!['numerical', 'neural-gate', 'grid'].includes(step)) return;

        clearInterval(timerRef.current);

        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    handleGameEnd();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, [step]);

    // 🔁 Flow control (FIXED)
    const handleGameEnd = () => {
        setStep(prev => {
            if (prev === 'numerical') return 'neural-gate-intro';
            if (prev === 'neural-gate') return 'grid-intro';
            if (prev === 'grid') return 'result';
            return prev;
        });
    };

    // 🎯 Score update
    const updateScore = (game, points) => {
        setScore(prev => ({
            ...prev,
            [game]: Math.max(0, prev[game] + points)
        }));
    };

    const scoreKeyMap = {
        numerical: 'numerical',
        'neural-gate': 'neuralGate',
        grid: 'grid'
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black backdrop-blur-3xl overflow-hidden">
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative w-full h-full bg-black flex flex-col items-center justify-center p-6 md:p-12"
            >
                {/* ❌ Close */}
                <span
                    onClick={onClose}
                    className="absolute top-2 md:top-2 right-4 md:right-10 text-white/40 hover:text-accent z-[210] transition-colors p-2 md:p-4 group"
                >
                    <span className="text-lg md:text-xl font-light uppercase tracking-tighter group-hover:scale-110 block">CLOSE</span>
                </span>

                {/* ⏱ Timer + Score */}
                {['numerical', 'neural-gate', 'grid'].includes(step) && (
                    <div className="absolute top-8 md:top-12 left-1/2 -translate-x-1/2 flex items-center justify-between w-full max-w-[1400px] px-6 md:px-10 pointer-events-none z-[210]">
                        <div className="flex flex-col gap-1">
                        
                             <div className="text-accent font-black text-4xl md:text-6xl font-outfit tabular-nums tracking-tighter">
                                {timeLeft}s
                             </div>
                        </div>
                        
                        <div className="flex flex-col items-end gap-1">
                             
                             <div className="text-white/80 font-black text-2xl md:text-4xl font-outfit tabular-nums tracking-tighter">
                                 {score[scoreKeyMap[step]]}
                             </div>
                        </div>
                    </div>
                )}

                {/* 🎮 Content */}
                <div className="h-full w-full flex items-center justify-center p-4 md:p-8 text-center overflow-hidden">
                    <AnimatePresence mode="wait">

                        {/* INTRO */}
                        {step === 'intro' && (
                            <motion.div 
                                key="intro"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                className="flex flex-col items-center gap-8 md:gap-12 max-w-2xl px-6 md:px-12 py-10 md:py-16"
                            >
                                <div className="flex flex-col items-center gap-4">
                                    <span className="text-accent text-[10px] md:text-[12px] font-black uppercase tracking-[0.5em] mb-2 md:mb-4">Neural Analytics Protocol</span>
                                    <h1 className="text-[2.5rem] md:text-[6rem] font-black text-white font-outfit leading-[0.9] md:leading-[0.8] tracking-tighter uppercase text-center">
                                       Cognitive <br/> <span className="text-accent underline decoration-4 md:decoration-8 underline-offset-8 md:underline-offset-14">Assessment</span>
                                    </h1>
                                </div>
                                
                                <p className="text-white/40 text-lg md:text-xl font-medium leading-relaxed max-w-sm mx-auto tracking-tight">
                                    Benchmark your <span className="text-white">executive function</span>, <span className="text-white">spatial memory</span>, and <span className="text-white">quantitative reasoning</span> in 90 seconds.
                                </p>
                                
                                <span
                                    onClick={() => setStep('numerical-intro')}
                                    className="px-6 md:px-10  cursor-pointer md:py-6 font-black text-xl md:text-2xl uppercase rounded-full"
                                >
                                    
                                    <span className='bg-amber-50 p-2 px-4 text-black rounded-full text-sm md:text-2xl'>Start Assessment</span>
                                </span>
                                
                                <p className="text-white/10 text-[8px] md:text-[10px] uppercase tracking-[0.4em] font-bold">Biometric Synchronization Required</p>
                            </motion.div>
                        )}

                        {/* NUMERICAL */}
                        {step === 'numerical-intro' && (
                            <GameIntro 
                                title="Numerical Racer"
                                onStart={() => startGame('numerical')}
                            />
                        )}

                        {step === 'numerical' && (
                            <NumericalRacer onScore={(p) => updateScore('numerical', p)} />
                        )}

                        {/* NEURAL */}
                        {step === 'neural-gate-intro' && (
                            <GameIntro 
                                title="Neural Gate"
                                onStart={() => startGame('neural-gate')}
                            />
                        )}

                        {step === 'neural-gate' && (
                            <NeuralGate onScore={(p) => updateScore('neuralGate', p)} />
                        )}

                        {/* GRID */}
                        {step === 'grid-intro' && (
                            <GameIntro 
                                title="Grid Pattern"
                                onStart={() => startGame('grid')}
                            />
                        )}

                        {step === 'grid' && (
                            <GridPattern onScore={(p) => updateScore('grid', p)} />
                        )}

                        {/* RESULT */}
                        {step === 'result' && (
                            <motion.div 
                                key="result"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="assessmentWindow max-w-4xl w-full overflow-y-auto max-h-[90vh] py-8 md:py-12 bg-black flex flex-col items-center"
                            >
                                <div className="text-accent text-[10px] md:text-[12px] font-black tracking-[0.4em] mb-4 text-center">BIOMARKER ANALYSIS</div>
                                <h1 className="text-4xl md:text-6xl font-black text-white font-outfit uppercase tracking-tighter mb-12">
                                    NEURAL <span className="text-accent">PROFILE</span>
                                </h1>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 w-full px-4 md:px-8 mt-5">
                                    {/* Web Graph Section */}
                                    <div className="relative aspect-square w-full max-w-[400px] mx-auto flex items-center justify-center p-8 bg-white/5 rounded-[1rem] border border-white/10 overflow-hidden">
                                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(219,255,0,0.15),transparent_70%)]" />
                                        <SpiderGraph scores={score} />
                                    </div>

                                    {/* Stats & Global Ranking Table */}
                                    <div className="flex flex-col gap-6 w-full">
                                        <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-[1rem] relative overflow-hidden group">
                                            <div className="flex items-center justify-between mb-8">
                                                <div className="flex flex-col">
                                                    <span className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Global Ranking</span>
                                                    <span className="text-3xl md:text-4xl font-black text-white font-outfit">Top {100 - Math.min(99, Math.floor(60 + (score.numerical + score.neuralGate + score.grid) / 2))}%</span>
                                                </div>
                                                <div className="text-6xl font-black text-accent font-outfit">
                                                    {Math.min(99, Math.floor(65 + (score.numerical + score.neuralGate + score.grid) / 2))}%
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <ResultStatRow label="Quantitative Logic" score={score.numerical} total={10} color="#DBFF00" />
                                                <ResultStatRow label="Inhibitory Control" score={score.neuralGate} total={10} color="#FF3D00" />
                                                <ResultStatRow label="Spatial Memory" score={score.grid} total={10} color="#00E5FF" />
                                            </div>
                                        </div>

                                        <p className="text-white/60 text-center lg:text-left text-sm md:text-base leading-relaxed max-w-md">
                                            Assessment complete. Your neural focus stability and spatial retention markers are <span className="text-white font-black">optimal</span>. Data synchronized with Dhritam-Systems node.
                                        </p>

                                        <div className="mt-auto">
                                            <span 
                                                onClick={() => {
                                                   onOpenOnboarding();
                                                   onClose();
                                                }}
                                                className="w-full py-2 px-2 cursor-pointer bg-accent text-black text-sm font-black rounded-full hover:scale-105 transition-transform shadow-[0_15px_30px_rgba(219,255,0,0.2)] uppercase tracking-tight group overflow-hidden relative"
                                            >
                                                <span >Unlock Your Potential Now!</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                
                                <p className="mt-12 text-white/20 text-[10px] uppercase tracking-[0.3em] font-bold text-center">
                                    DHRITAM-SYSTEMS SECURE ASSESSMENT v1.02
                                </p>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};

const SpiderGraph = ({ scores }) => {
    // Custom SVG Spider Graph since we can't install recharts
    const size = 300;
    const center = size / 2;
    const radius = size * 0.4;
    
    // Normalize scores (assuming max around 10-15 per game for visual range)
    const normalize = (val) => Math.min(1, val / 15);
    
    const points = [
        { label: 'QNT', val: normalize(scores.numerical), angle: -Math.PI / 2 },
        { label: 'INH', val: normalize(scores.neuralGate), angle: Math.PI / 6 },
        { label: 'MEM', val: normalize(scores.grid), angle: (5 * Math.PI) / 6 }
    ];

    const generatePath = (valFunc) => {
        return points.map((p, i) => {
            const r = radius * valFunc(p.val);
            const x = center + r * Math.cos(p.angle);
            const y = center + r * Math.sin(p.angle);
            return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
        }).join(' ') + ' Z';
    };

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
            {/* Background Polygons */}
            {[1, 0.75, 0.5, 0.25].map(scale => (
                <path
                    key={scale}
                    d={generatePath(() => scale)}
                    fill="none"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="1"
                />
            ))}
            
            {/* Axis Lines */}
            {points.map(p => (
                <line
                    key={p.label}
                    x1={center}
                    y1={center}
                    x2={center + radius * Math.cos(p.angle)}
                    y2={center + radius * Math.sin(p.angle)}
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                />
            ))}

            {/* Labels */}
            {points.map(p => {
                const tr = radius + 25;
                const x = center + tr * Math.cos(p.angle);
                const y = center + tr * Math.sin(p.angle);
                return (
                    <text
                        key={p.label}
                        x={x}
                        y={y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="rgba(255,255,255,0.4)"
                        fontSize="10"
                        fontWeight="900"
                        className="font-outfit"
                    >
                        {p.label}
                    </text>
                );
            })}

            {/* Score Shape */}
            <motion.path
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                d={generatePath(v => v)}
                fill="rgba(219,255,0,0.3)"
                stroke="#DBFF00"
                strokeWidth="3"
                strokeLinejoin="round"
            />
            
            {/* Score Points */}
            {points.map((p, i) => {
                const r = radius * p.val;
                const x = center + r * Math.cos(p.angle);
                const y = center + r * Math.sin(p.angle);
                return (
                    <circle key={i} cx={x} cy={y} r="5" fill="#DBFF00" filter="drop-shadow(0 0 8px rgba(219,255,0,0.8))" />
                );
            })}
        </svg>
    );
};

const ResultStatRow = ({ label, score, total, color }) => (
    <div className="flex flex-col gap-2">
        <div className="flex justify-between items-end">
            <span className="text-[10px] text-white/50 uppercase font-black tracking-widest">{label}</span>
            <span className="text-xl font-black text-white font-outfit">{score}</span>
        </div>
        <div className="h-[6px] bg-white/5 rounded-full overflow-hidden">
            <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (score/total)*100)}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{ backgroundColor: color }}
            />
        </div>
    </div>
);

const GameIntro = ({ title, onStart }) => {
    useEffect(() => {
        const t = setTimeout(onStart, 2500);
        return () => clearTimeout(t);
    }, []);

    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            className="flex flex-col items-center gap-10 max-w-xl"
        >
            <div className="relative">
                {/* Minimalist Loading Pulsating Ring */}
                <motion.div 
                    animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.4, 0.1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute inset-x-0 inset-y-0 -m-10 border-[30px] border-accent/20 rounded-full blur-3xl p-32"
                />
                
                <h2 className="text-[4.5rem] md:text-[6.5rem] font-black leading-[0.85] text-white/95 uppercase font-outfit tracking-tighter">
                    {title.split(' ')[0]} <br/> 
                    <span className="text-accent underline decoration-8 underline-offset-12 decoration-accent/40">{title.split(' ')[1]}</span>
                </h2>
            </div>

            <div className="flex flex-col items-center gap-4">
                <div className="text-white/20 text-[10px] font-black uppercase tracking-[0.5em] animate-pulse">Syncing Neural Pathway...</div>
                <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden relative">
                    <motion.div 
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute inset-0 bg-accent"
                    />
                </div>
            </div>
        </motion.div>
    );
};

const ResultStat = ({ label, score, sub }) => (
    <div className="bg-white/5 border border-white/5 p-4 md:p-8 rounded-[1.5rem] md:rounded-[2rem] flex flex-col items-center hover:bg-white/10 transition-colors">
        <span className="text-[8px] md:text-[10px] text-white/30 font-black uppercase tracking-[0.4em] mb-1">{label}</span>
        <span className="text-3xl md:text-5xl font-black text-white font-outfit leading-none mb-3">{score}</span>
        <span className="text-[10px] md:text-[11px] text-accent/60 font-medium uppercase tracking-tight">{sub}</span>
    </div>
);



   

export default AssessmentWindow;