import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import HologramCard from '../components/HologramCard';
import { Cpu, Zap, Activity, Hexagon } from 'lucide-react';

export default function LevelMap() {
    const navigate = useNavigate();
    const containerRef = useRef(null);

    const handleLevel1Click = (e) => {
        // GSAP Cinematic Zoom to the clicked card
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const xOffset = window.innerWidth / 2 - centerX;
        const yOffset = window.innerHeight / 2 - centerY;

        gsap.to(containerRef.current, {
            x: xOffset * 3,
            y: yOffset * 3,
            scale: 4,
            opacity: 0,
            duration: 1.5,
            ease: 'power3.inOut',
            onComplete: () => {
                navigate('/intro');
            }
        });
    };

    const handleLevel2Click = () => {
        navigate('/level2');
    };

    return (
        <div className="w-full h-full overflow-hidden flex flex-col items-center justify-center relative">
            {/* Background node particles/grid could be added here, but ThreeJS handles the back layer */}

            <div
                ref={containerRef}
                className="relative w-full max-w-4xl h-[800px] flex flex-col items-center justify-between py-10"
            >
                {/* The Circuit Pathway Line */}
                <div className="absolute top-20 bottom-20 w-1 bg-cyber-primary/20 left-1/2 transform -translate-x-1/2" style={{ boxShadow: '0 0 10px #00E5FF' }}>
                    <div className="w-full h-1/2 bg-gradient-to-b from-cyber-primary to-transparent animate-pulse-fast" />
                </div>

                {/* Final Node */}
                <div className="relative z-10 flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full border-2 border-cyber-accent bg-cyber-dark flex items-center justify-center shadow-[0_0_20px_#00FFA3]">
                        <Hexagon className="text-cyber-accent" />
                    </div>
                    <p className="mt-2 text-cyber-accent font-orbitron text-sm">FINAL NODE</p>
                </div>

                {/* Level 2 Card */}
                <div className="relative z-10 w-full flex justify-start pl-[20%]">
                    <HologramCard
                        className="w-64"
                        glowColor="#7A5FFF"
                        onClick={handleLevel2Click}
                    >
                        <div className="flex flex-col items-center text-center">
                            <Zap className="text-[#7A5FFF] w-12 h-12 mb-2" />
                            <h3 className="font-orbitron font-bold text-lg text-white mb-1">LEVEL 2</h3>
                            <p className="text-[#7A5FFF] font-inter text-sm">"Hackathon Initiation"</p>
                            <div className="mt-4 text-xs text-white/50 flex space-x-2">
                                <span className="bg-white/10 px-2 py-1 rounded">Rules</span>
                                <span className="bg-white/10 px-2 py-1 rounded">Timeline</span>
                            </div>
                        </div>
                    </HologramCard>
                </div>

                {/* Level 1 Card */}
                <div className="relative z-10 w-full flex justify-end pr-[20%]">
                    <HologramCard
                        className="w-64"
                        glowColor="#00E5FF"
                        onClick={handleLevel1Click}
                    >
                        <div className="flex flex-col items-center text-center">
                            <Cpu className="text-cyber-primary w-12 h-12 mb-2" />
                            <h3 className="font-orbitron font-bold text-lg text-white mb-1">LEVEL 1</h3>
                            <p className="text-cyber-primary font-inter text-sm">"IoT Awakening"</p>
                            <div className="mt-4 text-xs text-cyber-primary animate-pulse">
                                CLICK TO ENTER PROTOCOL
                            </div>
                        </div>
                    </HologramCard>
                </div>

                {/* Start Node */}
                <div className="relative z-10 flex flex-col items-center">
                    <p className="mb-2 text-cyber-primary font-orbitron text-sm">START NODE</p>
                    <div className="w-16 h-16 rounded-full border-2 border-cyber-primary bg-cyber-dark flex items-center justify-center shadow-[0_0_20px_#00E5FF]">
                        <Activity className="text-cyber-primary animate-pulse" />
                    </div>
                </div>

            </div>
        </div>
    );
}
