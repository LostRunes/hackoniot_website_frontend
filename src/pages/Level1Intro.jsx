import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import NeonButton from '../components/NeonButton';

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
            {/* Hologram AI Figure effect using CSS & simple HTML elements */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
                animate={{ scale: 1, opacity: 0.8, filter: 'blur(0px)' }}
                transition={{ duration: 2 }}
                className="relative w-48 h-64 mb-12 flex items-center justify-center flex-col animate-pulse-glow"
            >
                <div className="w-16 h-16 bg-cyber-primary rounded-full blur-[20px] absolute top-4 opacity-50" />
                <div className="w-24 h-40 bg-cyber-primary rounded-t-full rounded-b-xl blur-[25px] absolute bottom-0 opacity-40" />

                {/* Particle/Grid Lines */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMDBFNUZGIiBvcGFjaXR5PSIwLjUiLz4KPC9zdmc+')] opacity-30 mix-blend-overlay" />

                <div className="w-12 h-12 bg-white rounded-full opacity-80 shadow-[0_0_30px_#00E5FF] mb-2" />
                <div className="w-16 h-2 bg-cyber-secondary rounded mt-1 opacity-50" />
                <div className="w-20 h-2 bg-cyber-primary rounded mt-1 opacity-50" />
            </motion.div>

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
