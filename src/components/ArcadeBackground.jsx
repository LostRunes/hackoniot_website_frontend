import React from 'react';
import { motion } from 'framer-motion';

export default function ArcadeBackground() {
    // Generate random twinkling stars
    const stars = Array.from({ length: 60 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}vw`,
        top: `${Math.random() * 60}vh`,
        size: Math.random() > 0.8 ? '4px' : '2px',
        delay: Math.random() * 3
    }));

    return (
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] overflow-hidden">

            {/* Background Stars Layer */}
            {stars.map(star => (
                <motion.div
                    key={star.id}
                    className="absolute bg-white"
                    style={{
                        left: star.left,
                        top: star.top,
                        width: star.size,
                        height: star.size,
                    }}
                    animate={{ opacity: [0.1, 1, 0.1] }}
                    transition={{ duration: 2, delay: star.delay, repeat: Infinity }}
                />
            ))}

            {/* Floating Pixel Clouds */}
            <motion.div
                className="absolute top-24 opacity-60 flex flex-col items-center z-10"
                initial={{ x: '-20vw' }}
                animate={{ x: '120vw' }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
                <div className="w-16 h-4 bg-arcade-cyan/30" />
                <div className="w-24 h-4 bg-arcade-cyan/30 flex justify-between">
                    <div className="w-2 h-4 bg-transparent" />
                </div>
                <div className="w-40 h-4 bg-arcade-cyan/30" />
            </motion.div>

            <motion.div
                className="absolute top-48 opacity-40 flex flex-col items-center z-10"
                initial={{ x: '120vw' }}
                animate={{ x: '-30vw' }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
                <div className="w-20 h-4 bg-arcade-pink/30" />
                <div className="w-32 h-4 bg-arcade-pink/30" />
                <div className="w-48 h-4 bg-arcade-pink/30" />
            </motion.div>

            {/* Pixelated Synthwave Sunset/Moon */}
            <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-b from-arcade-yellow to-arcade-pink opacity-80 z-10 shadow-[0_0_80px_rgba(255,46,136,0.6)]" />

            {/* Blocky City Skyline Silhouette */}
            <div className="absolute bottom-[20%] lg:bottom-[25%] left-0 w-full flex items-end justify-center opacity-80 z-20 overflow-hidden">
                {/* Repeating skyline blocks */}
                {Array.from({ length: 20 }).map((_, i) => {
                    const heights = ['h-24', 'h-40', 'h-64', 'h-32', 'h-80', 'h-56', 'h-20'];
                    const widths = ['w-12', 'w-20', 'w-16', 'w-24', 'w-32'];

                    const hClass = heights[i % heights.length];
                    const wClass = widths[(i * 3) % widths.length];

                    return (
                        <div
                            key={i}
                            className={`${wClass} ${hClass} bg-arcade-dark border-t-4 border-l-4 border-arcade-pink/50 relative flex-shrink-0`}
                        >
                            {/* Simulated window lights */}
                            {i % 3 === 0 && (
                                <div className="absolute top-4 left-4 w-2 h-2 bg-arcade-yellow animate-pulse" />
                            )}
                            {i % 4 === 0 && (
                                <div className="absolute top-12 left-8 w-2 h-2 bg-arcade-cyan animate-[pulse_2s_infinite]" />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Retro Synthwave Grid Floor */}
            <div className="absolute bottom-0 left-0 w-full h-[30%] z-30 perspective-[1000px] bg-arcade-dark opacity-90">
                <div className="absolute inset-0"
                    style={{
                        backgroundImage: `
                 linear-gradient(rgba(255, 46, 136, 0.4) 2px, transparent 2px),
                 linear-gradient(90deg, rgba(255, 46, 136, 0.4) 2px, transparent 2px)
               `,
                        backgroundSize: '40px 40px',
                        backgroundPosition: 'center top',
                        transform: 'rotateX(80deg) scale(2.5)',
                        transformOrigin: 'top center',
                    }}
                />
                {/* Grid horizon fade */}
                <div className="absolute inset-0 bg-gradient-to-b from-arcade-dark to-transparent opacity-80" />
            </div>

        </div>
    );
}
