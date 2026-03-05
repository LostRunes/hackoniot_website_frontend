import React from 'react';
import { motion } from 'framer-motion';

export default function RobotMascot({ coins = true }) {
    return (
        <div className="relative flex justify-center items-center w-64 h-64 my-8">
            {/* Mascot Image Float Animation */}
            <motion.img
                src="/images/robot.png"
                alt="HackIoT Robot Mascot"
                className="w-48 h-48 object-contain z-10"
                style={{ filter: 'drop-shadow(0 0 20px rgba(44, 198, 255, 0.4))' }}
                animate={{
                    y: [-15, 15, -15],
                    rotateZ: [-2, 2, -2]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Orbiting Arcade Coins */}
            {coins && (
                <>
                    <Coin delay={0} xOffset={120} yPos={20} />
                    <Coin delay={1} xOffset={-110} yPos={-30} />
                    <Coin delay={2} xOffset={80} yPos={-80} />
                    <Coin delay={1.5} xOffset={-90} yPos={70} />
                </>
            )}
        </div>
    );
}

// Separate component for the pixel coin animation
function Coin({ delay, xOffset, yPos }) {
    return (
        <motion.div
            className="absolute rounded-full bg-arcade-yellow border-2 border-[#b08d00] flex items-center justify-center font-pixel text-[#b08d00] text-[8px] font-bold"
            style={{
                width: '24px',
                height: '24px',
                boxShadow: '0 4px 0 #b08d00, 0 0 10px rgba(255, 216, 77, 0.8)'
            }}
            initial={{ opacity: 0, y: yPos + 20, x: xOffset }}
            animate={{
                opacity: [0.5, 1, 0.5],
                y: [yPos, yPos - 15, yPos],
                scale: [1, 1.2, 1]
            }}
            transition={{
                duration: 3,
                delay: delay,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        >
            I
        </motion.div>
    );
}
