import React from 'react';
import { motion } from 'framer-motion';

export default function HologramCard({ children, className = '', glowColor = '#00E5FF', onClick, whileHover = { scale: 1.05 } }) {
    return (
        <motion.div
            whileHover={whileHover}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`relative glass-panel rounded-xl border p-6 cursor-pointer overflow-hidden group ${className}`}
            style={{
                borderColor: glowColor,
                boxShadow: `0 0 15px ${glowColor}40`
            }}
        >
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
                style={{ background: `linear-gradient(45deg, transparent, ${glowColor}, transparent)` }}
            />
            {/* Subtle grid pattern background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
                backgroundSize: '20px 20px'
            }} />
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
}
