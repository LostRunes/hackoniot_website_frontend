import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PixelBackground from '../components/PixelBackground';
import RobotMascot from '../components/RobotMascot';
import PixelStartButton from '../components/PixelStartButton';

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
            <PixelBackground />

            <div className="relative z-10 flex flex-col items-center justify-center p-8 text-center h-full">

                {/* KIIT FEST Logo (text placeholder if img missing, easily swapped) */}
                <motion.div
                    className="mb-8"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="text-arcade-cyan font-pixel text-xl tracking-widest drop-shadow-[0_0_10px_#00F0FF]">
                        <span className="text-arcade-yellow">KIIT</span>FEST 9.0
                    </h2>
                </motion.div>

                {/* Robot Mascot */}
                <RobotMascot coins={true} />

                {/* Title */}
                <motion.div
                    className="my-10"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                >
                    <h1 className="text-5xl md:text-7xl font-pixel text-white mb-2" style={{ textShadow: '4px 4px 0px #FF2E88, 0 0 20px rgba(255, 46, 136, 0.8)' }}>
                        HACK
                    </h1>
                    <div className="flex items-center justify-center space-x-4">
                        <span className="bg-arcade-yellow text-[#2E1F5E] px-4 py-2 font-pixel text-2xl border-4 border-[#2E1F5E] rounded-md shadow-[4px_4px_0_#2E1F5E]">ON</span>
                        <h1 className="text-5xl md:text-7xl font-pixel text-white" style={{ textShadow: '4px 4px 0px #2CC6FF, 0 0 20px rgba(44, 198, 255, 0.8)' }}>
                            THE IOT
                        </h1>
                    </div>
                </motion.div>

                <p className="font-pixel text-sm text-arcade-cyan mb-12 tracking-widest animate-pulse">
                    Think · Create · Innovate
                </p>

                {/* Start Button */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                >
                    <PixelStartButton onClick={() => navigate('/map')}>
                        INSERT COIN TO START
                    </PixelStartButton>
                </motion.div>

            </div>
        </div>
    );
}
