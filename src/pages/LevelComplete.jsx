import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import NeonButton from '../components/NeonButton';
import { playArcadeSound } from '../utils/audio';

export default function LevelComplete() {
    const location = useLocation();
    const navigate = useNavigate();
    const { score, total, accuracy, timeTaken, name } = location.state || { score: 0, total: 15, accuracy: 0, timeTaken: 0, name: 'Hacker' };

    useEffect(() => {
        // Confetti effect
        const duration = 3 * 1000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#00E5FF', '#7A5FFF', '#00FFA3']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#00E5FF', '#7A5FFF', '#00FFA3']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };
        frame();

        // Play complete audio
        playArcadeSound('levelup');
    }, []);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-cyber-dark relative overflow-hidden">

            {/* Background Pulse Effect */}
            <div className="absolute inset-0 bg-cyber-primary opacity-5 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />

            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring" }}
                className="arcade-panel p-8 md:p-12 max-w-lg w-full text-center relative z-10 border-[#00FFA3] shadow-[0_0_50px_rgba(0,255,163,0.3)]"
            >
                <h2 className="text-4xl md:text-5xl font-orbitron text-[#00FFA3] mb-4 drop-shadow-[0_0_15px_#00FFA3]">
                    LEVEL 1 COMPLETED
                </h2>
                <p className="text-xl text-cyber-primary font-inter mb-8">System Secured by {name}</p>

                <div className="flex flex-col gap-6 mb-8">
                    <div className="bg-black/50 rounded-lg p-4 border border-white/10 flex justify-between items-center group hover:border-[#7A5FFF] transition-colors">
                        <span className="font-orbitron text-white/70">ACCURACY</span>
                        <span className="font-inter text-2xl font-bold text-[#7A5FFF] drop-shadow-[0_0_8px_#7A5FFF]">{accuracy}%</span>
                    </div>

                    <div className="bg-black/50 rounded-lg p-4 border border-white/10 flex justify-between items-center group hover:border-[#00E5FF] transition-colors">
                        <span className="font-orbitron text-white/70">TIME</span>
                        <span className="font-inter text-2xl font-bold text-[#00E5FF] drop-shadow-[0_0_8px_#00E5FF]">{timeTaken}s</span>
                    </div>

                    <div className="bg-black/50 rounded-lg p-4 border border-white/10 flex justify-between items-center group hover:border-[#00FFA3] transition-colors">
                        <span className="font-orbitron text-white/70">SCORE</span>
                        <span className="font-inter text-2xl font-bold text-[#00FFA3] drop-shadow-[0_0_8px_#00FFA3]">{score} / {total}</span>
                    </div>
                </div>

                <NeonButton onClick={() => navigate('/leaderboard')} className="w-full border-[#00FFA3] text-[#00FFA3] hover:bg-[#00FFA3]/10">
                    VIEW LEADERBOARD
                </NeonButton>
            </motion.div>
        </div>
    );
}
