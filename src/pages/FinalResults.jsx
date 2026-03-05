import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import NeonButton from '../components/NeonButton';

export default function FinalResults() {
    const navigate = useNavigate();
    const [results, setResults] = useState([]);

    useEffect(() => {
        // Initial fetch
        fetch(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/final-results`)
            .then(res => res.json())
            .then(data => setResults(data))
            .catch(err => console.error("Error fetching final results:", err));

        // Optional: could listen to a socket event for live updates if admin edits it while screen is active
        // For now, it just loads statically when the screen mounts
    }, []);

    // Isolate top 3 for podium
    const top3 = results.filter(r => r.position <= 3).sort((a, b) => a.position - b.position);

    // Reorder for visual rendering: Rank 2 (Left), Rank 1 (Center), Rank 3 (Right)
    let podiumDisplay = [];
    if (top3.length > 0) {
        const pos1 = top3.find(r => r.position === 1);
        const pos2 = top3.find(r => r.position === 2);
        const pos3 = top3.find(r => r.position === 3);

        if (pos2) podiumDisplay.push({ ...pos2, height: 'h-40', color: '#7A5FFF' });
        if (pos1) podiumDisplay.push({ ...pos1, height: 'h-64', color: '#00E5FF', scale: 1.1 });
        if (pos3) podiumDisplay.push({ ...pos3, height: 'h-24', color: '#00FFA3' });
    }

    const rest = results.filter(r => r.position > 3).sort((a, b) => a.position - b.position);

    return (
        <div className="w-full h-full flex flex-col items-center p-8 bg-cyber-dark overflow-y-auto overflow-x-hidden">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl font-orbitron text-cyber-primary mb-16 mt-8 glow-text tracking-widest text-center"
            >
                HACKATHON FINAL RESULTS
            </motion.h2>

            {/* Podium Display */}
            <div className="flex items-end justify-center gap-8 mb-20 h-80 mt-12 w-full max-w-6xl">
                <AnimatePresence>
                    {podiumDisplay.map((p, i) => (
                        <motion.div
                            key={p._id}
                            initial={{ opacity: 0, scale: 0.5, y: 100 }}
                            animate={{ opacity: 1, scale: p.scale || 1, y: 0 }}
                            transition={{ delay: i * 0.4 + 0.5, type: "spring", stiffness: 100 }}
                            className="flex flex-col items-center flex-1 max-w-xs"
                            style={{ zIndex: p.position === 1 ? 10 : 1 }}
                        >
                            {/* Team Info Card */}
                            <motion.div
                                whileHover={{ y: -10 }}
                                className="flex flex-col items-center mb-4 p-6 glass-panel rounded-xl border border-white/20 relative"
                                style={{
                                    boxShadow: `0 0 30px ${p.color}40`,
                                    backgroundColor: 'rgba(10, 15, 28, 0.8)'
                                }}
                            >
                                {/* Crown for 1st */}
                                {p.position === 1 && (
                                    <div className="absolute -top-8 text-5xl">👑</div>
                                )}
                                <span className="font-orbitron font-bold text-2xl text-center mb-2" style={{ color: p.color, textShadow: `0 0 10px ${p.color}` }}>
                                    {p.teamName}
                                </span>
                                <div className="flex flex-col items-center text-sm text-white/80 font-inter text-center">
                                    {p.members.map(m => (
                                        <span key={m}>{m}</span>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Glowing Podium Block */}
                            <div
                                className={`w-full ${p.height} rounded-t-lg bg-black/60 border-t-4 shadow-[0_-10px_30px_rgba(0,0,0,0.8)] flex items-center justify-center relative overflow-hidden`}
                                style={{
                                    borderColor: p.color,
                                    boxShadow: `inset 0 10px 40px -10px ${p.color}, 0 -10px 20px -5px ${p.color}`
                                }}
                            >
                                {/* Internal glow lines */}
                                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-50" />
                                <span className="text-6xl font-orbitron font-bold opacity-30" style={{ color: p.color }}>
                                    {p.position}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Remaining Results Table */}
            {rest.length > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    className="w-full max-w-4xl glass-panel overflow-hidden mb-12"
                >
                    <div className="grid grid-cols-3 p-4 border-b border-white/20 text-white/70 font-orbitron text-lg bg-black/40">
                        <div className="text-center font-bold">POSITION</div>
                        <div className="font-bold">TEAM NAME</div>
                        <div className="font-bold">MEMBERS</div>
                    </div>

                    <div className="relative flex flex-col">
                        {rest.map((r, index) => (
                            <motion.div
                                key={r._id}
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 2.5 + (index * 0.1) }}
                                className="grid grid-cols-3 p-6 items-center border-b border-white/5 font-inter transition-colors hover:bg-white/10"
                            >
                                <div className="text-center font-orbitron text-2xl text-cyber-secondary font-bold">{r.position}</div>
                                <div className="font-bold tracking-wide text-xl text-white">{r.teamName}</div>
                                <div className="text-white/70 text-sm">
                                    {r.members.join(' • ')}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3 }}
            >
                <NeonButton onClick={() => navigate('/')}>
                    RETURN TO HOME
                </NeonButton>
            </motion.div>
        </div>
    );
}
