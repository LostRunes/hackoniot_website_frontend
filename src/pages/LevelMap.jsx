import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';

export default function LevelMap() {
    const navigate = useNavigate();
    const containerRef = useRef(null);

    const handleNodeClick = (e, path) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const xOffset = window.innerWidth / 2 - centerX;
        const yOffset = window.innerHeight / 2 - centerY;

        // GSAP Retro Zoom Effect into Level
        gsap.to(containerRef.current, {
            x: xOffset * 3,
            y: yOffset * 3,
            scale: 6,
            opacity: 0,
            duration: 1,
            ease: 'power3.in',
            onComplete: () => {
                navigate(path);
            }
        });
    };

    return (
        <div className="w-full h-full overflow-hidden flex flex-col items-center justify-center relative">
            <div
                ref={containerRef}
                className="relative w-full max-w-2xl h-[800px] flex flex-col items-center justify-between py-12 px-4"
            >
                {/* SVG Connecting Line */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" preserveAspectRatio="none">
                    <path
                        d="M 50% 10% L 30% 35% L 70% 65% L 50% 90%"
                        fill="none"
                        stroke="#FF2E88"
                        strokeWidth="8"
                        strokeLinejoin="miter"
                        className="drop-shadow-[0_0_15px_rgba(255,46,136,0.8)]"
                    />
                    <path
                        d="M 50% 10% L 30% 35% L 70% 65% L 50% 90%"
                        fill="none"
                        stroke="#FFF"
                        strokeWidth="2"
                        strokeLinejoin="miter"
                        strokeDasharray="10 10"
                        className="animate-[pulse_1s_linear_infinite]"
                    />
                </svg>

                {/* Node 4: Final */}
                <div className="relative z-10 w-full flex justify-center mb-8">
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="flex flex-col items-center cursor-pointer group"
                        onClick={(e) => handleNodeClick(e, '/final-results')}
                    >
                        <h3 className="font-press text-arcade-yellow text-sm md:text-base mb-4 drop-shadow-[4px_4px_0_#2E1F5E]">FINAL</h3>
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-arcade-dark border-[6px] border-arcade-yellow rounded-md shadow-[0_0_30px_#FFD84D,inset_0_0_15px_#FFD84D] flex items-center justify-center group-hover:bg-arcade-yellow transition-colors">
                            <span className="font-press text-white group-hover:text-arcade-dark">BOSS</span>
                        </div>
                    </motion.div>
                </div>

                {/* Node 3: Quiz */}
                <div className="relative z-10 w-full flex justify-start pl-[15%] md:pl-[20%]">
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="flex flex-col items-center cursor-pointer group"
                        onClick={(e) => handleNodeClick(e, '/mentee-quiz')}
                    >
                        <h3 className="font-press text-arcade-cyan text-sm md:text-base mb-4 drop-shadow-[4px_4px_0_#2E1F5E]">QUIZ</h3>
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-arcade-dark border-[6px] border-arcade-cyan rounded-md shadow-[0_0_30px_#00F0FF,inset_0_0_15px_#00F0FF] flex items-center justify-center group-hover:bg-arcade-cyan transition-colors">
                            <span className="font-press text-white group-hover:text-arcade-dark">?</span>
                        </div>
                    </motion.div>
                </div>

                {/* Node 2: Level 2 */}
                <div className="relative z-10 w-full flex justify-end pr-[15%] md:pr-[20%]">
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="flex flex-col items-center cursor-pointer group"
                        onClick={(e) => handleNodeClick(e, '/level2')}
                    >
                        <h3 className="font-press text-[#a251ff] text-sm md:text-base mb-4 drop-shadow-[4px_4px_0_#2E1F5E]">LEVEL 2</h3>
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-arcade-dark border-[6px] border-[#a251ff] rounded-md shadow-[0_0_30px_#a251ff,inset_0_0_15px_#a251ff] flex items-center justify-center group-hover:bg-[#a251ff] transition-colors">
                            <span className="font-press text-white group-hover:text-arcade-dark">LV2</span>
                        </div>
                    </motion.div>
                </div>

                {/* Node 1: Level 1 */}
                <div className="relative z-10 w-full flex justify-center mt-8">
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="flex flex-col items-center cursor-pointer group"
                        onClick={(e) => handleNodeClick(e, '/intro')}
                    >
                        <h3 className="font-press text-arcade-pink text-sm md:text-base mb-4 animate-pulse drop-shadow-[4px_4px_0_#2E1F5E]">LEVEL 1</h3>
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-arcade-dark border-[6px] border-arcade-pink rounded-md shadow-[0_0_30px_#FF2E88,inset_0_0_15px_#FF2E88] flex items-center justify-center group-hover:bg-arcade-pink transition-colors">
                            <span className="font-press text-white group-hover:text-arcade-dark">LV1</span>
                        </div>
                    </motion.div>
                </div>

                {/* Start Marker */}
                <div className="absolute bottom-[2%] text-center text-white/50 font-press text-[10px] tracking-widest pointer-events-none">
                    PLAYER SPAWN
                </div>
            </div>

            {/* Back to Home Button */}
            <motion.button
                onClick={() => navigate('/')}
                className="absolute top-6 left-6 arcade-button !px-4 !py-3 !text-[10px]"
            >
                &lt; BACK
            </motion.button>
        </div>
    );
}
