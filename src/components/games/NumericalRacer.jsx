import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const NumericalRacer = ({ onScore }) => {
    const [problem, setProblem] = useState({ a: 0, b: 0, op: '+', ans: 0 });
    const [options, setOptions] = useState([]);
    const [difficulty, setDifficulty] = useState(1);

    const generateProblem = () => {
        const ops = ['+', '-', '*', '/'];
        const op = ops[Math.floor(Math.random() * (difficulty > 3 ? 4 : 3))]; 
        let a, b, ans;

        if (op === '+') {
            a = Math.floor(Math.random() * (20 * difficulty)) + 5;
            b = Math.floor(Math.random() * (20 * difficulty)) + 5;
            ans = a + b;
        } else if (op === '-') {
            a = Math.floor(Math.random() * (30 * difficulty)) + 20;
            b = Math.floor(Math.random() * a) + 5;
            ans = a - b;
        } else if (op === '*') {
            a = Math.floor(Math.random() * (8 + difficulty)) + 3;
            b = Math.floor(Math.random() * (8 + difficulty)) + 3;
            ans = a * b;
        } else {
            ans = Math.floor(Math.random() * (8 + difficulty)) + 2;
            b = Math.floor(Math.random() * (8 + difficulty)) + 2;
            a = ans * b;
        }

        setProblem({ a, b, op, ans });

        const opts = new Set([ans]);
        while (opts.size < 4) {
            const range = Math.max(15, Math.floor(ans * 0.4));
            const wrong = ans + (Math.floor(Math.random() * range) - Math.floor(range / 2));
            if (wrong !== ans && wrong > 0) opts.add(wrong);
        }

        setOptions(Array.from(opts).sort(() => Math.random() - 0.5));
    };

    useEffect(() => {
        generateProblem();
    }, [difficulty]);

    const handleAnswer = (choice) => {
        if (choice === problem.ans) {
            onScore(1);
            setDifficulty(prev => Math.min(prev + 0.8, 15)); // faster difficulty ramp
        } else {
            setDifficulty(prev => Math.max(1, prev - 1)); // harsher penalty
            onScore(-1);
        }
    };

    return (
        <div className="flex flex-col items-center gap-8 md:gap-16 max-w-2xl w-full">
            <div className="flex flex-col items-center gap-2">
                <span className="text-accent text-[8px] md:text-[10px] uppercase tracking-[0.4em] font-bold opacity-50">Quantitative Assessment</span>
                <motion.div 
                    key={`${problem.a}${problem.op}${problem.b}`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-6xl md:text-[10rem] font-black text-white font-outfit tracking-tighter flex items-center gap-4"
                >
                    <span>{problem.a}</span>
                    <span className="text-accent/80 mx-2">{problem.op}</span>
                    <span>{problem.b}</span>
                </motion.div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:gap-6 w-full max-w-lg">
                {options.map((opt, i) => (
                    <motion.button
                        key={`${problem.a}-${problem.b}-${opt}-${i}`}
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(219,255,0,0.1)', borderColor: 'rgba(219,255,0,0.5)' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAnswer(opt)}
                        className="py-4 md:py-8 bg-white/5 border-2 border-white/10 rounded-[1.5rem] md:rounded-[2rem] text-3xl md:text-5xl font-black text-white transition-all shadow-xl hover:shadow-accent/5 font-outfit group relative overflow-hidden"
                    >
                        
                        <span className="flex z-10 bg-amber-50 text-black p-2 md:p-4 hover:bg-accent rounded-xl gap-10">{opt}</span>
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default NumericalRacer;