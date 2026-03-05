import React from 'react';
import { motion } from 'framer-motion';

export default function PixelBackground() {
    return (
        <div className="fixed inset-0 w-full h-full z-[-1] overflow-hidden bg-arcade-bg">
            {/* Sky Gradient Base (Starts deep purple, fades down) */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#1a103c] via-arcade-bg to-[#4A2D8B] opacity-80" />

            {/* Glowing Stars (Static + Twinkling) */}
            {Array.from({ length: 30 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-white rounded-full"
                    style={{
                        width: Math.random() > 0.8 ? '3px' : '2px',
                        height: Math.random() > 0.8 ? '3px' : '2px',
                        top: `${Math.random() * 60}%`,
                        left: `${Math.random() * 100}%`,
                        opacity: Math.random() * 0.5 + 0.3
                    }}
                    animate={{
                        opacity: [0.3, 1, 0.3],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{
                        duration: Math.random() * 3 + 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            ))}

            {/* Parallax Clouds (Slow drifting) */}
            <motion.div
                className="absolute top-20 w-[200%] flex opacity-60"
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            >
                <div className="w-1/2 flex justify-around">
                    <PixelCloud scale={1.2} />
                    <PixelCloud scale={0.8} />
                    <PixelCloud scale={1.5} />
                </div>
                <div className="w-1/2 flex justify-around">
                    <PixelCloud scale={1.2} />
                    <PixelCloud scale={0.8} />
                    <PixelCloud scale={1.5} />
                </div>
            </motion.div>

            {/* Deep Background City Silhouette */}
            <motion.div
                className="absolute bottom-0 w-[200%] h-64 flex opacity-40"
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
            >
                <div className="w-1/2 h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIj48cGF0aCBkPSJNMCAxMDBWMzBIOFYyMEgyMFYzMEgyNlY0MEg0MFYxMEg1MFY0MEg2MFY1MEg4MFYyMEg5MFY4MEgxMDBWMTAwfHoiIGZpbGw9IiMzQTE5NzciLz48L3N2Zz4=')] bg-repeat-x bg-contain bg-bottom" />
                <div className="w-1/2 h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIj48cGF0aCBkPSJNMCAxMDBWMzBIOFYyMEgyMFYzMEgyNlY0MEg0MFYxMEg1MFY0MEg2MFY1MEg4MFYyMEg5MFY4MEgxMDBWMTAwfHoiIGZpbGw9IiMzQTE5NzciLz48L3N2Zz4=')] bg-repeat-x bg-contain bg-bottom" />
            </motion.div>

            {/* Foreground City Silhouette (Slightly faster parallax) */}
            <motion.div
                className="absolute bottom-[-10px] w-[200%] h-80 flex opacity-90"
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
            >
                <div className="w-1/2 h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIj48cGF0aCBkPSJNMCAxMDBWNjBIMTRWODBIMjJWNTBIMzhWNTRINDUwSDU0VjMySDcwVjYwSDg2Vjc0SDEwMFYxMDBIMHoiIGZpbGw9IiMyNjFBNDkiLz48L3N2Zz4=')] bg-repeat-x bg-contain bg-bottom" style={{ filter: 'drop-shadow(0 -5px 10px rgba(44, 198, 255, 0.2))' }} />
                <div className="w-1/2 h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIj48cGF0aCBkPSJNMCAxMDBWNjBIMTRWODBIMjJWNTBIMzhWNTRINDUwSDU0VjMySDcwVjYwSDg2Vjc0SDEwMFYxMDBIMHoiIGZpbGw9IiMyNjFBNDkiLz48L3N2Zz4=')] bg-repeat-x bg-contain bg-bottom" style={{ filter: 'drop-shadow(0 -5px 10px rgba(44, 198, 255, 0.2))' }} />
            </motion.div>

            {/* Grid Floor Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-arcade-bg to-transparent opacity-80" />
        </div>
    );
}

// Helper component for chunky pixel clouds using Box Shadows
function PixelCloud({ scale = 1 }) {
    return (
        <div
            className="w-16 h-4 opacity-50 bg-[#7A5FFF]"
            style={{
                transform: `scale(${scale})`,
                marginTop: `${Math.random() * 40}px`,
                boxShadow: `
                    -16px 16px 0 0 #7A5FFF,
                    0px 16px 0 0 #7A5FFF,
                    16px 16px 0 0 #7A5FFF,
                    32px 16px 0 0 #7A5FFF,
                    16px -16px 0 0 #7A5FFF,
                    0px 32px 0 0 #7A5FFF
                `
            }}
        />
    )
}
