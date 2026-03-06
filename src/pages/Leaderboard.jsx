import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import NeonButton from '../components/NeonButton';

import { socket } from '../socket';

export default function Leaderboard() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [leaders, setLeaders] = useState([]);

    const quizIdentifier = id === 'mentee' ? 'mentee' : `quiz${id}`;

    useEffect(() => {
        // Initial fetch
        fetch(`https://hackoniotwebsitebackend-production.up.railway.app/api/leaderboard/${quizIdentifier}`)
            .then(res => res.json())
            .then(data => setLeaders(data))
            .catch(err => console.error("Error fetching leaderboard:", err));

        // Socket listener for real-time updates
        const handleUpdate = (updatedLeaderboard) => {
            setLeaders(updatedLeaderboard);
        };

        socket.on(`leaderboardUpdate_${quizIdentifier}`, handleUpdate);

        return () => {
            socket.off(`leaderboardUpdate_${quizIdentifier}`, handleUpdate);
        };
    }, [id, quizIdentifier]);

    // Top 3 for podium
    const top3 = leaders.slice(0, 3);
    // Reorder for visual rendering: Rank 2, Rank 1, Rank 3
    let podiumDisplay = [];
    if (top3.length === 3) {
        podiumDisplay = [
            { ...top3[1], rank: 2, height: 'h-32', color: '#7A5FFF' },
            { ...top3[0], rank: 1, height: 'h-48', color: '#00E5FF' },
            { ...top3[2], rank: 3, height: 'h-24', color: '#00FFA3' }
        ];
    }

    const rest = leaders.slice(3, 10);

    return (
        <div className="w-full h-full flex flex-col items-center p-8 bg-cyber-dark overflow-y-auto overflow-x-hidden">
            <h2 className="text-4xl font-orbitron text-cyber-primary mb-12 glow-text tracking-widest text-center">
                GLOBAL RANKINGS
            </h2>

            {/* Podium */}
            {podiumDisplay.length === 3 && (
                <div className="flex items-end justify-center gap-4 mb-16 h-64 mt-8">
                    {podiumDisplay.map((p) => (
                        <motion.div
                            layout
                            key={p.id}
                            className="flex flex-col items-center"
                        >
                            {/* Player Info */}
                            <div className="flex flex-col items-center mb-2">
                                <span className="font-orbitron font-bold text-xl drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" style={{ color: p.color, textShadow: `0 0 10px ${p.color}` }}>                                    {p.name}
                                </span>
                                <span className="font-inter font-bold text-white drop-shadow-md">
                                    {p.score} pts ({p.time}s)
                                </span>
                            </div>
                            {/* Podium Block */}
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: p.height }}
                                className={`w-24 border-t-4 border-l border-r border-b-0 rounded-t-lg bg-black/50 shadow-[0_-5px_20px_rgba(0,0,0,0.5)]`}
                                style={{
                                    borderColor: p.color,
                                    boxShadow: `inset 0 10px 20px -10px ${p.color}, 0 -5px 15px -5px ${p.color}`
                                }}
                            >
                                <div className="w-full h-full flex items-center justify-center">
                                    <span className="text-3xl font-orbitron font-bold opacity-30" style={{ color: p.color }}>{p.rank}</span>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Table grid */}
            <div className="w-full max-w-4xl arcade-panel mb-8 flex flex-col h-[500px]">
                <div className="grid grid-cols-4 p-4 border-b border-white/20 text-white/70 font-orbitron text-sm sticky top-0 bg-arcade-bg z-10">
                    <div className="text-center">RANK</div>
                    <div>NAME</div>
                    <div className="text-center">SCORE</div>
                    <div className="text-center">TIME</div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    <div className="relative flex flex-col">
                        <AnimatePresence>
                            {leaders.map((leader, index) => (
                                <motion.div
                                    key={leader._id || String(index)}
                                    layout
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                    className={`grid grid-cols-4 p-4 items-center border-b border-white/20 font-inter transition-colors hover:bg-white/10 ${index < 3 ? 'text-cyber-primary' : 'text-white'}`}
                                >
                                    <div className="text-center font-orbitron text-cyber-secondary font-bold text-lg">{index + 1}</div>
                                    <div className="font-bold tracking-wide text-lg drop-shadow-md truncate">{leader.name}</div>
                                    <div className="text-center text-cyber-primary font-bold text-lg drop-shadow-md">{leader.score}</div>
                                    <div className="text-center text-[#00FFA3] font-bold text-lg drop-shadow-md">{leader.timeTaken || leader.time || 0}s</div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <NeonButton onClick={() => navigate('/')}>
                RETURN TO MAP
            </NeonButton>
        </div>
    );
}
