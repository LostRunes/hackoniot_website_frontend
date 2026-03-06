import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { socket } from '../socket';
import menteeQuestions from '../assets/mentee_questions.json';
import { playArcadeSound } from '../utils/audio';

const API_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL || `http://${window.location.hostname}:5000`;

export default function MenteeVote() {
    const [state, setState] = useState({
        activeQuestionIndex: 0,
        isRevealed: false,
        votes: { A: 0, B: 0, C: 0, D: 0 },
        isActive: false
    });

    const [votedForIndex, setVotedForIndex] = useState(-1);
    const [hasJoined, setHasJoined] = useState(false);
    const [participantInfo, setParticipantInfo] = useState({ name: '', email: '' });

    const handleStart = async (e) => {
        e.preventDefault();
        if (participantInfo.name && participantInfo.email) {
            try {
                const res = await fetch(`${API_URL}/api/join/mentee`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(participantInfo)
                });
                const data = await res.json();
                if (data.participantId) {
                    setParticipantInfo(prev => ({ ...prev, id: data.participantId }));
                    setHasJoined(true);
                }
            } catch (err) {
                console.error("Join error:", err);
            }
        }
    };

    useEffect(() => {
        // Initial state fetch via HTTP (Fallback if socket sync is missed)
        const fetchInitialState = async () => {
            try {
                const res = await fetch(`${API_URL}/api/mentee-state`);
                const syncedState = await res.json();
                if (syncedState) setState(syncedState);
            } catch (err) {
                console.error("Failed to fetch initial mentee state:", err);
            }
        };
        fetchInitialState();

        // Socket listeners
        socket.on('mentee_state_sync', (syncedState) => {
            if (syncedState) setState(syncedState);
        });

        socket.on('startMenteeQuiz', (newState) => {
            setState(newState);
            setVotedForIndex(-1);
        });

        socket.on('nextMenteeQuestion', (newState) => {
            setState(newState);
            setVotedForIndex(-1);
        });

        socket.on('revealMenteeAnswer', (newState) => {
            setState(newState);
        });

        socket.on('endMenteeQuiz', () => {
            setState(prev => ({ ...prev, isActive: false }));
        });

        return () => {
            socket.off('mentee_state_sync');
            socket.off('startMenteeQuiz');
            socket.off('nextMenteeQuestion');
            socket.off('revealMenteeAnswer');
            socket.off('endMenteeQuiz');
        };
    }, []);

    const handleVote = (option) => {
        if (votedForIndex === state.activeQuestionIndex || !state.isActive || state.isRevealed) return;

        socket.emit('voteSubmitted', { option, participantId: participantInfo.id });
        setVotedForIndex(state.activeQuestionIndex);
        playArcadeSound('coin');
    };

    if (!hasJoined) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-[#0D0221] min-h-screen">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="arcade-panel p-8 w-full max-w-sm border-[#FF2E88]"
                >
                    <h2 className="text-2xl font-orbitron text-cyber-primary mb-6 text-center">JOIN MENTEE QUIZ</h2>
                    <form onSubmit={handleStart} className="flex flex-col gap-4">
                        <input
                            type="text"
                            required
                            placeholder="Participant Name"
                            className="bg-black/50 border border-cyber-primary/50 text-white p-3 rounded font-inter focus:outline-none focus:border-cyber-primary focus:shadow-[0_0_10px_#00E5FF]"
                            value={participantInfo.name}
                            onChange={e => setParticipantInfo({ ...participantInfo, name: e.target.value })}
                        />
                        <input
                            type="email"
                            required
                            placeholder="College Email"
                            className="bg-black/50 border border-cyber-primary/50 text-white p-3 rounded font-inter focus:outline-none focus:border-[#7A5FFF] focus:shadow-[0_0_10px_#7A5FFF]"
                            value={participantInfo.email}
                            onChange={e => setParticipantInfo({ ...participantInfo, email: e.target.value })}
                        />
                        <button type="submit" className="w-full py-4 mt-4 bg-cyber-primary text-black font-orbitron font-bold text-xl rounded-sm hover:scale-105 transition-transform shadow-[0_0_15px_#00E5FF]">
                            ENTER QUIZ
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    if (!state.isActive || state.standby) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-[#0D0221] min-h-screen">
                <div className="arcade-panel p-8 text-center border-[#FF2E88]">
                    <h1 className="text-2xl font-orbitron text-cyber-primary mb-4 animate-pulse">WAITING FOR SYSTEM START...</h1>
                    <p className="font-pixel text-[10px] text-white/40">THE MENTEE QUIZ PROTOCOL IS CURRENTLY STANDBY</p>
                </div>
            </div>
        );
    }

    const q = menteeQuestions[state.activeQuestionIndex];
    if (!q) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-[#0D0221] min-h-screen">
                <div className="arcade-panel p-8 text-center border-[#00FFA3]">
                    <h1 className="text-2xl font-orbitron text-cyber-primary mb-4">SESSION COMPLETE</h1>
                    <p className="font-pixel text-[10px] text-white/40">PLEASE LOOK AT THE MAIN DISPLAY FOR RESULTS</p>
                </div>
            </div>
        );
    }

    const hasVoted = votedForIndex === state.activeQuestionIndex;

    return (
        <div className="w-full h-full flex flex-col p-6 bg-[#0D0221] min-h-screen select-none">
            <header className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                <div className="flex flex-col">
                    <span className="text-cyber-primary font-orbitron text-xs">MENTEE MODULE</span>
                    <span className="text-white font-pixel text-[10px]">Q{state.activeQuestionIndex + 1} ACTIVE</span>
                </div>
                <div className={`w-3 h-3 rounded-full ${hasVoted ? 'bg-[#00FFA3] shadow-[0_0_10px_#00FFA3]' : 'bg-red-500 animate-pulse'}`} />
            </header>

            <main className="flex-1 flex flex-col justify-center gap-8">
                <h2 className="text-2xl font-orbitron text-white leading-tight drop-shadow-md">
                    {q.question}
                </h2>

                <div className="grid grid-cols-1 gap-4">
                    {q.options.map((opt, idx) => {
                        const letter = String.fromCharCode(65 + idx);
                        const isCorrect = idx === q.answer;

                        let btnStyle = "border-white/20 text-white/60 bg-white/5";
                        if (hasVoted) {
                            if (state.isRevealed) {
                                if (isCorrect) btnStyle = "border-[#00FFA3] text-[#00FFA3] bg-[#00FFA3]/20 shadow-[0_0_15px_rgba(0,255,163,0.3)]";
                                else btnStyle = "border-red-900 text-red-900 bg-red-900/10 opacity-50";
                            } else {
                                btnStyle = "border-white/10 text-white/20 bg-white/5 opacity-50";
                            }
                        } else {
                            btnStyle = "border-cyber-primary text-cyber-primary bg-cyber-primary/5 active:bg-cyber-primary/20 active:scale-95";
                        }

                        return (
                            <button
                                key={idx}
                                disabled={hasVoted || state.isRevealed}
                                onClick={() => handleVote(letter)}
                                className={`
                                    w-full text-left p-5 border-2 rounded-sm font-orbitron transition-all duration-200 flex items-center gap-4
                                    ${btnStyle}
                                `}
                            >
                                <span className="w-8 h-8 rounded-full border border-inherit flex items-center justify-center text-sm">
                                    {letter}
                                </span>
                                <span className="text-sm tracking-wide flex-1">{opt}</span>
                            </button>
                        );
                    })}
                </div>
            </main>

            <footer className="mt-8 text-center">
                <AnimatePresence mode="wait">
                    {hasVoted ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-[#00FFA3] font-pixel text-[12px] tracking-tighter"
                        >
                            VOTE TRANSMITTED SUCCESSFULLY!
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-white/30 font-pixel text-[8px]"
                        >
                            SELECT AN OPTION TO REGISTER YOUR VOTE
                        </motion.div>
                    )}
                </AnimatePresence>
            </footer>
        </div>
    );
}
