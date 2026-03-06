import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import NeonButton from '../components/NeonButton';

export default function Level2() {
    const navigate = useNavigate();

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring" } }
    };

    return (
        <div className="w-full h-full flex flex-col items-center p-8 bg-cyber-dark overflow-y-auto overflow-x-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCBMIDAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxMjIsIDk1LCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=')] pointer-events-none" />

            <h2 className="text-4xl md:text-5xl font-orbitron text-[#7A5FFF] mb-12 drop-shadow-[0_0_15px_#7A5FFF] tracking-widest text-center mt-12 relative z-10">
                LEVEL 2: INITIATION
            </h2>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 mb-12"
            >
                {/* ROUND 2 */}
                <motion.div variants={itemVariants} className="arcade-panel p-6 border-[#FF3B3B] hover:shadow-[0_0_20px_#FF3B3B] transition-shadow duration-500">
                    <h3 className="text-2xl text-[#FF3B3B] font-orbitron mb-4 border-b border-[#FF3B3B]/30 pb-2">
                        ROUND 2: ⚙ SECTOR-BASED PROTOTYPE
                    </h3>

                    <p className="font-inter text-white/80 leading-relaxed">
                        Participants will work on a specified application domain and develop a basic IoT-based prototype addressing a real-world problem with innovation and technical precision.
                    </p>
                </motion.div>

                {/* ROUND 3 */}
                <motion.div variants={itemVariants} className="arcade-panel p-6 border-[#FFD84D] hover:shadow-[0_0_20px_#FFD84D] transition-shadow duration-500">
                    <h3 className="text-2xl text-[#FFD84D] font-orbitron mb-4 border-b border-[#FFD84D]/30 pb-2">
                        ROUND 3: 🏆 FINAL MODEL PRESENTATION
                    </h3>

                    <p className="font-inter text-white/80 leading-relaxed">
                        Selected participants will present their developed model before the judging panel, demonstrate system functionality, and highlight the real-world impact of their solution.
                    </p>
                </motion.div>

                {/* TIMELINE */}
                <motion.div variants={itemVariants} className="arcade-panel p-6 md:col-span-2 border-[#00FFA3] hover:shadow-[0_0_20px_#00FFA3] transition-shadow duration-500">
                    <h3 className="text-2xl text-[#00FFA3] font-orbitron mb-4 border-b border-[#00FFA3]/30 pb-2">EVENT TIMELINE</h3>

                    <div className="space-y-4 font-inter text-white/80">
                        <div className="flex justify-between border-l-2 border-[#00FFA3] pl-4">
                            <span>03:00 PM</span>
                            <span className="font-bold text-white">Round 2 Begins</span>
                        </div>

                        <div className="flex justify-between border-l-2 border-[#00FFA3] pl-4">
                            <span>05:00 PM</span>
                            <span className="font-bold text-white">Round 2 Ends</span>
                        </div>

                        <div className="flex justify-between border-l-2 border-[#7A5FFF] pl-4">
                            <span>Next Day • 10:00 AM</span>
                            <span className="font-bold text-white">Final Presentation Begins</span>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="relative z-10 flex gap-4"
            >
                <NeonButton onClick={() => navigate('/leaderboard')} className="border-[#00FFA3] text-[#00FFA3] hover:bg-[#00FFA3]/10">
                    VIEW LEADERBOARD
                </NeonButton>
                <NeonButton onClick={() => navigate('/')}>
                    RETURN TO MAP
                </NeonButton>
            </motion.div>

        </div>
    );
}
