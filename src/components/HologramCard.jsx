import React from 'react';
import { motion } from 'framer-motion';

export default function HologramCard({ children, className = '', glowColor = '#FF2E88', onClick, whileHover = { y: -5 } }) {
    return (
        <motion.div
            whileHover={whileHover}
            whileTap={{ scale: 0.98, y: 0 }}
            onClick={onClick}
            className={`relative bg-arcade-dark border-[4px] p-6 cursor-pointer group transition-all duration-100 ${className}`}
            style={{
                borderColor: glowColor,
                boxShadow: `8px 8px 0 ${glowColor}60`
            }}
        >
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-100 pointer-events-none"
                style={{ backgroundColor: glowColor }}
            />
            {/* Retro Corner Pixels */}
            <div className="absolute top-1 left-1 w-2 h-2 bg-white/30 pointer-events-none" />
            <div className="absolute top-1 right-1 w-2 h-2 bg-white/30 pointer-events-none" />
            <div className="absolute bottom-1 left-1 w-2 h-2 bg-white/30 pointer-events-none" />
            <div className="absolute bottom-1 right-1 w-2 h-2 bg-white/30 pointer-events-none" />

            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </motion.div>
    );
}
