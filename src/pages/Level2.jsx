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
                {/* Rules Panel */}
                <motion.div variants={itemVariants} className="arcade-panel p-6 border-[#00E5FF] hover:shadow-[0_0_20px_#00E5FF] transition-shadow duration-500">
                    <h3 className="text-2xl text-[#00E5FF] font-orbitron mb-4 border-b border-[#00E5FF]/30 pb-2">HACKATHON RULES</h3>
                    <ul className="list-disc pl-5 font-inter text-white/80 space-y-2">
                        <li>Teams must consist of 2-4 members.</li>
                        <li>All code must be written during the event.</li>
                        <li>Use of open-source libraries is permitted.</li>
                        <li>Hardware prototypes must be functional.</li>
                    </ul>
                </motion.div>

                {/* Timeline Panel */}
                <motion.div variants={itemVariants} className="arcade-panel p-6 border-[#00FFA3] hover:shadow-[0_0_20px_#00FFA3] transition-shadow duration-500">
                    <h3 className="text-2xl text-[#00FFA3] font-orbitron mb-4 border-b border-[#00FFA3]/30 pb-2">TIMELINE</h3>
                    <div className="space-y-4 font-inter text-white/80">
                        <div className="flex justify-between border-l-2 border-[#00FFA3] pl-4">
                            <span>09:00 AM</span>
                            <span className="font-bold text-white">Opening Ceremony</span>
                        </div>
                        <div className="flex justify-between border-l-2 border-[#00FFA3] pl-4">
                            <span>10:00 AM</span>
                            <span className="font-bold text-white">Hacking Begins</span>
                        </div>
                        <div className="flex justify-between border-l-2 border-[#00FFA3] pl-4">
                            <span>12:00 PM</span>
                            <span className="font-bold text-white">Mentor Check-in 1</span>
                        </div>
                        <div className="flex justify-between border-l-2 border-[#00E5FF] pl-4 opacity-50">
                            <span>08:00 AM (Next Day)</span>
                            <span className="font-bold text-white">Submissions Due</span>
                        </div>
                    </div>
                </motion.div>

                {/* Instructions Panel */}
                <motion.div variants={itemVariants} className="arcade-panel p-6 md:col-span-2 border-[#7A5FFF] hover:shadow-[0_0_20px_#7A5FFF] transition-shadow duration-500">
                    <h3 className="text-2xl text-[#7A5FFF] font-orbitron mb-4 border-b border-[#7A5FFF]/30 pb-2">INSTRUCTIONS</h3>
                    <p className="font-inter text-white/80 leading-relaxed">
                        Welcome to the main event. Your objective is to build an interconnected prototype that bridges the gap between digital and physical realms. You have full access to the hardware lab API. Ensure your endpoints are secure. The network is watching. Good luck, hackers.
                    </p>
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
