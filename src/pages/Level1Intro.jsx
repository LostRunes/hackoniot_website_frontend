import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import NeonButton from '../components/NeonButton';
import RobotMascot from '../components/RobotMascot';

export default function Level1Intro() {
    const navigate = useNavigate();
    const [text, setText] = useState('');
    const fullText = "You have entered the IoT Command Lab.\nThe network has collapsed.\nOnly those who understand the machines can restore the system.";

    useEffect(() => {
        let i = 0;
        const typingInterval = setInterval(() => {
            setText(fullText.slice(0, i));
            i++;
            if (i > fullText.length) clearInterval(typingInterval);
        }, 50);
        return () => clearInterval(typingInterval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full flex flex-col items-center justify-center p-8 relative"
        >
            <RobotMascot />

            {/* Typing Text Container */}
            <div className="max-w-2xl text-center min-h-[120px]">
                <h2 className="text-xl md:text-2xl font-orbitron text-cyber-primary leading-relaxed whitespace-pre-line tracking-wide drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]">
                    {text}
                    <span className="animate-pulse ml-1 text-cyber-accent">_</span>
                </h2>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: text.length === fullText.length ? 1 : 0, y: text.length === fullText.length ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-12"
            >
                <NeonButton onClick={() => navigate('/level1/guess')}>
                    START PROTOCOL
                </NeonButton>
            </motion.div>
        </motion.div>
    );
}
