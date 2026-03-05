import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import NeonButton from '../components/NeonButton';
import riddlesData from '../assets/riddles.json';
import { playArcadeSound } from '../utils/audio';

export default function IoTRiddle() {
    const navigate = useNavigate();
    const [currentIdx, setCurrentIdx] = useState(0);
    const [text, setText] = useState('');
    const [showOptions, setShowOptions] = useState(false);
    const [selectedOpt, setSelectedOpt] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [showReveal, setShowReveal] = useState(false);

    const q = riddlesData[currentIdx];

    useEffect(() => {
        setText('');
        setShowOptions(false);
        setSelectedOpt(null);
        setIsCorrect(null);
        setShowReveal(false);

        let i = 0;
        const typingInterval = setInterval(() => {
            setText(q.question.slice(0, i));
            i++;
            if (i > q.question.length) {
                clearInterval(typingInterval);
                setShowOptions(true);
            }
        }, 30);
        return () => clearInterval(typingInterval);
    }, [currentIdx]);

    const handleOptionSelect = (idx) => {
        if (selectedOpt !== null) return;
        setSelectedOpt(idx);
        const correct = idx === q.answer;
        setIsCorrect(correct);
        playArcadeSound(correct ? 'correct' : 'wrong');

        setTimeout(() => {
            setShowReveal(true);
            if (correct) playArcadeSound('coin');
        }, 1000);
    };

    const handleNext = () => {
        if (currentIdx < riddlesData.length - 1) {
            setCurrentIdx(prev => prev + 1);
        } else {
            navigate('/level1/qr/1');
        }
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-cyber-dark min-h-screen">
            <h2 className="text-2xl md:text-3xl font-orbitron text-cyber-primary mb-8 glow-text tracking-widest text-center">
                SYSTEM OVERRIDE: RIDDLE {currentIdx + 1}/{riddlesData.length}
            </h2>

            <motion.div
                layout
                className="arcade-panel w-full max-w-3xl p-6 md:p-8 border-[#00FFA3] shadow-[0_0_20px_rgba(0,255,163,0.2)] font-mono text-[#00FFA3] text-lg md:text-xl leading-relaxed mb-8 min-h-[300px] flex flex-col"
            >
                <div className="flex-1 whitespace-pre-line drop-shadow-[0_0_5px_#00FFA3]">
                    {text}
                    {!showOptions && <span className="animate-pulse">_</span>}
                </div>

                <AnimatePresence>
                    {showOptions && !showReveal && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                            {q.options.map((opt, idx) => (
                                <button
                                    key={idx}
                                    disabled={selectedOpt !== null}
                                    onClick={() => handleOptionSelect(idx)}
                                    className={`
                                        p-3 border-2 font-pixel text-[10px] uppercase tracking-tighter transition-all
                                        ${selectedOpt === idx
                                            ? (idx === q.answer ? 'border-[#00FFA3] bg-[#00FFA3]/20' : 'border-red-500 bg-red-500/20')
                                            : 'border-[#00FFA3]/30 hover:border-[#00FFA3] hover:bg-[#00FFA3]/10'}
                                    `}
                                >
                                    {String.fromCharCode(65 + idx)}) {opt}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {showReveal && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-8 pt-8 border-t border-[#00FFA3]/30 flex flex-col md:flex-row items-center gap-8"
                        >
                            <div className="flex-1 text-center md:text-left">
                                <h3 className={`text-2xl font-orbitron mb-2 ${isCorrect ? 'text-[#00FFA3]' : 'text-red-500'}`}>
                                    {isCorrect ? 'ACCESS GRANTED' : 'ACCESS DENIED'}
                                </h3>
                                <p className="text-white text-xl font-pixel mb-2">{q.revealTitle}</p>
                                <p className="text-cyber-primary text-sm font-inter">{q.revealDesc}</p>
                            </div>

                            {q.image && (
                                <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-cyber-primary shadow-[0_0_20px_#00E5FF] p-2 bg-black/50">
                                    <img src={q.image} alt={q.revealTitle} className="w-full h-full object-contain filter drop-shadow-[0_0_10px_#00E5FF]" />
                                </div>
                            )}

                            {!q.image && (
                                <div className="w-32 h-32 border-4 border-dashed border-[#00FFA3]/20 flex items-center justify-center">
                                    <span className="text-[10px] text-[#00FFA3]/40 font-pixel">NO IMAGE</span>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <div className="flex gap-4">
                {showReveal && (
                    <NeonButton onClick={handleNext}>
                        {currentIdx < riddlesData.length - 1 ? 'NEXT RIDDLE' : 'INITIATE DATA TRANSVERSE'}
                    </NeonButton>
                )}
            </div>
        </div>
    );
}
