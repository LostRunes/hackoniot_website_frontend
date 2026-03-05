import { motion } from 'framer-motion';
import { playArcadeSound } from '../utils/audio';

export default function PixelStartButton({ onClick, children, className = "" }) {
    return (
        <motion.button
            onClick={(e) => {
                playArcadeSound('click');
                if (onClick) onClick(e);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95, y: 4 }}
            className={`
                relative px-8 py-4 bg-arcade-yellow text-[#5A3E00] font-pixel text-xl 
                border-4 border-white
                transition-all uppercase outline-none
                ${className}
            `}
            style={{
                boxShadow: `
                    -8px 8px 0px #FF8C00,
                    0 0 15px rgba(255, 216, 77, 0.6)
                `
            }}
        >
            {/* Inner top/left highlight glow for 3D effect */}
            <div className="absolute top-0 left-0 w-full h-1 bg-white opacity-50" />
            <div className="absolute top-0 left-0 w-1 h-full bg-white opacity-50" />

            {children}
        </motion.button>
    );
}
