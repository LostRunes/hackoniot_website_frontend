import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import PixelBackground from '../components/PixelBackground';
import { Cpu, Zap, RadioReceiver, Trophy } from 'lucide-react';

export default function LevelMap() {
    const navigate = useNavigate();
    const containerRef = useRef(null);

    const handleNodeClick = (e, path) => {
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
                navigate(path);
            }
        });
    };

    return (
        <div className="w-full h-full overflow-hidden flex flex-col items-center justify-center relative bg-arcade-bg">
            <PixelBackground />

            <div
                ref={containerRef}
                className="relative z-10 w-full max-w-4xl h-[800px] flex flex-col items-center justify-between py-10 px-8"
            >
                {/* SVG Connecting Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ filter: 'drop-shadow(0 0 8px #2CC6FF)' }}>
                    {/* Path from Start (bottom) to Level 1 (right) */}
                    <path d="M 450 700 L 450 600 L 650 600 L 650 550" stroke="#2CC6FF" strokeWidth="4" fill="none" strokeDasharray="10 10" className="animate-[dash_20s_linear_infinite]" />
                    {/* Path from Level 1 to Level 2 (left) */}
                    <path d="M 650 450 L 650 400 L 250 400 L 250 350" stroke="#FF2E88" strokeWidth="4" fill="none" strokeDasharray="10 10" className="animate-[dash_20s_linear_infinite]" />
                    {/* Path from Level 2 to Final (center) */}
                    <path d="M 250 250 L 250 150 L 450 150 L 450 100" stroke="#00F0FF" strokeWidth="4" fill="none" strokeDasharray="10 10" className="animate-[dash_20s_linear_infinite]" />
                </svg>

                {/* FINAL Node (Top Center) */}
                <div className="w-full flex justify-center z-10 -mt-10">
                    <ArcadeNode
                        title="FINAL"
                        subtitle="Boss Stage"
                        icon={<Trophy size={32} />}
                        color="arcade-cyan"
                        hex="#00F0FF"
                        onClick={(e) => handleNodeClick(e, '/final-results')}
                    />
                </div>



                {/* LEVEL 2 Node (Left) */}
                <div className="w-full flex justify-start pl-10 z-10">
                    <ArcadeNode
                        title="LEVEL 2"
                        subtitle="Hackathon"
                        icon={<Zap size={32} />}
                        color="arcade-neon"
                        hex="#FF2E88"
                        onClick={(e) => handleNodeClick(e, '/level2')}
                        delay={0.4}
                    />
                </div>

                {/* LEVEL 1 Node (Right) */}
                <div className="w-full flex justify-end pr-10 z-10">
                    <ArcadeNode
                        title="LEVEL 1"
                        subtitle="IoT Awakening"
                        icon={<Cpu size={32} />}
                        color="arcade-blue"
                        hex="#2CC6FF"
                        onClick={(e) => handleNodeClick(e, '/intro')}
                        delay={0.2}
                    />
                </div>

                {/* START Point (Bottom Center) */}
                <div className="w-full flex justify-center z-10">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="bg-arcade-bg border-4 border-arcade-blue text-arcade-blue font-pixel p-4 rounded-full shadow-[0_0_20px_#2CC6FF]"
                    >
                        START
                    </motion.div>
                </div>

            </div>

            <style>{`
                @keyframes dash {
                    to { stroke-dashoffset: 1000; }
                }
            `}</style>
        </div>
    );
}

function ArcadeNode({ title, subtitle, icon, color, hex, onClick, delay = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, type: "spring", stiffness: 100 }}
            className="flex flex-col items-center cursor-pointer group"
            onClick={onClick}
        >
            <motion.div
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className={`
                    w-24 h-24 bg-[#1a103c] border-[6px] rounded-2xl flex items-center justify-center relative
                    transition-colors duration-300
                `}
                style={{
                    borderColor: hex,
                    boxShadow: `0 8px 0 ${hex}40, 0 0 20px ${hex}80, inset 0 0 15px ${hex}60`
                }}
            >
                <div style={{ color: hex }} className="drop-shadow-[0_0_5px_currentColor]">
                    {icon}
                </div>
            </motion.div>
            <div className="mt-6 text-center bg-black/50 p-2 rounded border-2 border-white/20">
                <h3 className="font-pixel text-sm text-white drop-shadow-md tracking-wider mb-2" style={{ color: hex }}>{title}</h3>
                <p className="font-pixel text-[8px] text-white/80">{subtitle}</p>
            </div>
        </motion.div >
    );
}
