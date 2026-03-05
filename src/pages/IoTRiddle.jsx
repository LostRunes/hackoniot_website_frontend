import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import NeonButton from '../components/NeonButton';

export default function IoTRiddle() {
    const navigate = useNavigate();
    const [text, setText] = useState('');
    const [showReveal, setShowReveal] = useState(false);

    const riddleText = "> I sense distance without touching.\n> I speak with echoes.\n> What am I?";

    useEffect(() => {
        let i = 0;
        const typingInterval = setInterval(() => {
            setText(riddleText.slice(0, i));
            i++;
            if (i > riddleText.length) clearInterval(typingInterval);
        }, 60);
        return () => clearInterval(typingInterval);
    }, []);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 transition-colors duration-1000" style={{ backgroundColor: showReveal ? '#0A0F1C' : '#05080F' }}>

            <h2 className="text-3xl font-orbitron text-cyber-primary mb-8 glow-text tracking-widest text-center">
                SYSTEM OVERRIDE: RIDDLE
            </h2>

            {/* Hacker Terminal */}
            <motion.div
                layout
                className="glass-panel w-full max-w-3xl p-8 border-[#00FFA3] shadow-[0_0_20px_rgba(0,255,163,0.2)] font-mono text-[#00FFA3] text-xl leading-loose mb-8 min-h-[200px] flex flex-col"
            >
                <div className="flex-1 whitespace-pre-line drop-shadow-[0_0_5px_#00FFA3]">
                    {text}
                    {!showReveal && <span className="animate-pulse">_</span>}
                </div>

                {/* Reveal Area */}
                <AnimatePresence>
                    {showReveal && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-8 pt-8 border-t border-[#00FFA3]/30 flex flex-col md:flex-row items-center gap-8 justify-between"
                        >
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-3xl font-orbitron text-white mb-2 shadow-text">Ultrasonic Sensor</h3>
                                <p className="text-cyber-primary text-sm font-inter">HC-SR04 uses sonar to determine distance to an object like bats do.</p>
                            </div>

                            <div className="relative w-48 h-48 rounded-lg overflow-hidden border border-cyber-primary shadow-[0_0_20px_#00E5FF] p-2 bg-black/50">
                                {/* Image of the sensor */}
                                <img src="/src/assets/components/ultrasonic_hcsr04.png" alt="Ultrasonic Sensor" className="w-full h-full object-contain filter drop-shadow-[0_0_10px_#00E5FF]" />
                            </div>

                            {/* Schematic Diagram Base SVG */}
                            <div className="w-48 h-32 border border-[#00FFA3]/50 rounded bg-black/30 p-2 flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMDBGRkEzIiBvcGFjaXR5PSIwLjIiLz4KPC9zdmc+')] mix-blend-screen" />
                                <svg viewBox="0 0 100 50" className="w-full h-full stroke-[#00FFA3] fill-none stroke-2 drop-shadow-[0_0_5px_#00FFA3]">
                                    {/* TX wave */}
                                    <path d="M 20 25 Q 35 15, 50 25 T 80 25" className="animate-[dash_2s_linear_infinite]" strokeDasharray="5,5" />
                                    {/* RX wave */}
                                    <path d="M 80 30 Q 65 40, 50 30 T 20 30" className="animate-[dash_2s_linear_infinite]" strokeDasharray="5,5" stroke="#00E5FF" />
                                    <circle cx="20" cy="27.5" r="5" fill="#00FFA3" />
                                    <rect x="80" y="20" width="10" height="15" fill="#00E5FF" />
                                </svg>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <div className="flex gap-4">
                {!showReveal ? (
                    <NeonButton
                        onClick={() => setShowReveal(true)}
                        className="border-[#00FFA3] text-[#00FFA3] hover:bg-[#00FFA3]/10"
                    >
                        REVEAL ANSWER
                    </NeonButton>
                ) : (
                    <NeonButton onClick={() => navigate('/level1/qr')}>
                        CONTINUE PROTOCOL
                    </NeonButton>
                )}
            </div>

            <style>{`
        @keyframes dash {
          to { stroke-dashoffset: -20; }
        }
      `}</style>
        </div>
    );
}
