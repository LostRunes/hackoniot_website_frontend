import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
    const navigate = useNavigate();

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 relative overflow-hidden">

            {/* Top Logo */}
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className="absolute top-8 md:top-12 w-full flex justify-center"
            >
                <h2 className="text-arcade-cyan font-press text-xl tracking-[0.3em] drop-shadow-[0_0_10px_rgba(0,240,255,1)]">
                    KIIT FEST 9.0
                </h2>
            </motion.div>

            {/* Mascot and Title Container */}
            <div className="flex flex-col items-center justify-center z-10 w-full max-w-4xl mt-8">

                {/* Floating Robot Logo */}
                <motion.div
                    animate={{ y: [-10, 10, -10], rotate: [-2, 2, -2] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative mb-8"
                >
                    <img src="/images/robot.png" alt="KIIT Fest Robot Mascot" className="w-[280px] md:w-[350px] drop-shadow-[0_0_40px_rgba(255,46,136,0.6)] object-contain" />

                    {/* Floating Coins */}
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                y: [-15, 15, -15],
                                rotateY: [0, 360] // Flip animation
                            }}
                            transition={{
                                duration: 3,
                                delay: i * 0.8,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="absolute w-8 h-8 md:w-12 md:h-12 bg-arcade-yellow rounded-full border-4 border-[#FFA000] shadow-[0_0_15px_rgba(255,216,77,0.8)] flex items-center justify-center overflow-hidden"
                            style={{
                                top: `${20 + (i * 30)}%`,
                                left: i % 2 === 0 ? '-15%' : '105%',
                                transformStyle: 'preserve-3d'
                            }}
                        >
                            <span className="font-press text-[#FFA000] text-[8px] md:text-[10px] transform-gpu scale-x-[0.8]">$</span>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Main Title */}
                <motion.h1
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="text-4xl md:text-6xl text-center font-press text-white mb-16 leading-tight z-10"
                    style={{ textShadow: "4px 4px 0 #2E1F5E, -3px -3px 0 #FF2E88, 0 0 20px rgba(44,198,255,0.8)" }}
                >
                    HACK ON <br />
                    <span className="text-arcade-yellow text-5xl md:text-7xl block mt-4" style={{ textShadow: "4px 4px 0 #2E1F5E, -3px -3px 0 #FF2E88, 0 0 30px rgba(255,216,77,1)" }}>
                        THE IOT
                    </span>
                </motion.h1>

                {/* Start Game Button */}
                <motion.button
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/map')}
                    className="arcade-button text-lg md:text-xl px-12 py-6 relative z-20 group"
                >
                    <span className="group-hover:animate-pulse">START GAME</span>
                </motion.button>
            </div>

            {/* Insert Coin Text */}
            <motion.p
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-10 font-press text-arcade-cyan text-sm tracking-[0.2em]"
            >
                INSERT COIN TO PLAY
            </motion.p>
        </div>
    );
}
