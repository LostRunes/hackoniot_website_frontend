import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { socket } from '../socket';
import menteeQuestions from '../assets/mentee_questions.json';
import { QRCodeSVG } from 'qrcode.react';
import { playArcadeSound } from '../utils/audio';
import confetti from 'canvas-confetti';

export default function MenteeDisplay() {
    const votingUrl = `${window.location.origin}/mentee-vote`;
    const [state, setState] = useState({
        activeQuestionIndex: 0,
        isRevealed: false,
        votes: { A: 0, B: 0, C: 0, D: 0 },
        isActive: false
    });

    useEffect(() => {
        // Initial state fetch via HTTP (Fallback if socket sync is missed)
        const fetchInitialState = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/mentee-state`);
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
            playArcadeSound('levelup');
        });

        socket.on('openMenteeQuiz', () => {
            playArcadeSound('click');
        });

        socket.on('nextMenteeQuestion', (newState) => {
            setState(newState);
            playArcadeSound('click');
        });

        socket.on('revealMenteeAnswer', (newState) => {
            setState(newState);
            playArcadeSound('levelup');
            // Trigger confetti if correct answer is revealed
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#00FFA3', '#00E5FF', '#FF2E88']
            });
        });

        socket.on('voteUpdate', (votes) => {
            setState(prev => ({ ...prev, votes }));
        });

        socket.on('endMenteeQuiz', () => {
            setState(prev => ({ ...prev, isActive: false }));
        });

        return () => {
            socket.off('mentee_state_sync');
            socket.off('startMenteeQuiz');
            socket.off('nextMenteeQuestion');
            socket.off('revealMenteeAnswer');
            socket.off('voteUpdate');
            socket.off('endMenteeQuiz');
            socket.off('openMenteeQuiz');
        };
    }, []);

    const q = menteeQuestions[state.activeQuestionIndex];
    if (!q) return <div className="p-8 text-white font-pixel">END OF SESSION</div>;

    const totalVotes = Object.values(state.votes).reduce((a, b) => a + b, 0);

    const getPercentage = (count) => {
        if (totalVotes === 0) return 0;
        return Math.round((count / totalVotes) * 100);
    };

    if (!state.isActive) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-[#0A0F1C] relative overflow-hidden">
                {/* Background Decorations */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyber-primary rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyber-secondary rounded-full blur-[120px]" />
                </div>

                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="z-10 flex flex-col items-center text-center"
                >
                    <div className="mb-8">
                        <span className="font-pixel text-cyber-secondary text-sm tracking-[0.5em] block mb-2">SCAN TO PARTICIPATE</span>
                        <h1 className="text-5xl md:text-7xl font-orbitron text-white drop-shadow-[0_0_15px_rgba(0,229,255,0.4)]">
                            LIVE INTERACTIVE QUIZ
                        </h1>
                    </div>

                    <div className="arcade-panel p-8 bg-white mb-8 shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                        <QRCodeSVG value={votingUrl} size={320} level="H" />
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-sm">
                            <span className="font-orbitron text-2xl text-cyber-primary tracking-widest">{votingUrl.replace('http://', '').replace('https://', '')}</span>
                        </div>
                        <p className="font-pixel text-xs text-white/40 animate-pulse">
                            WAITING FOR ADMIN TO START SESSION...
                        </p>
                    </div>

                    {/* Participant Counter (Optional placeholder) */}
                    <div className="mt-12 flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#00FFA3] animate-ping" />
                        <span className="font-pixel text-[10px] text-[#00FFA3]">NETWORK READY · STANDBY FOR UPLINK</span>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-cyber-dark overflow-hidden relative">
            {/* Top Right QR Code for Voting Access */}
            <div className="absolute top-8 right-8 flex flex-col items-center gap-2 p-3 bg-white/5 border border-white/10 rounded-sm backdrop-blur-md z-50">
                <div className="bg-white p-2 rounded-sm shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    <QRCodeSVG value={votingUrl} size={100} level="M" />
                </div>
                <span className="font-pixel text-[8px] text-cyber-primary tracking-tighter">SCAN TO VOTE</span>
                <span className="font-orbitron text-[8px] text-white/40 tracking-widest">{votingUrl.replace('http://', '').replace('https://', '')}</span>
            </div>

            {/* Header */}
            <motion.div
                key={`header-${state.activeQuestionIndex}`}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mb-12 text-center"
            >
                <span className="text-cyber-secondary font-pixel text-xl mb-4 block tracking-widest">LIVE AUDIENCE QUIZ</span>
                <h1 className="text-4xl md:text-6xl font-orbitron text-white max-w-5xl leading-tight drop-shadow-[0_0_20px_rgba(0,229,255,0.5)]">
                    {q.question}
                </h1>
            </motion.div>

            {/* Comparison Bars */}
            <div className="w-full max-w-6xl grid grid-cols-1 gap-6 px-4">
                {q.options.map((opt, idx) => {
                    const letter = String.fromCharCode(65 + idx);
                    const count = state.votes[letter];
                    const percent = getPercentage(count);
                    const isCorrect = idx === q.answer;

                    return (
                        <div key={idx} className="relative flex flex-col">
                            <div className="flex justify-between items-end mb-2 px-2">
                                <span className={`font-orbitron text-2xl ${state.isRevealed && isCorrect ? 'text-[#00FFA3]' : 'text-white'}`}>
                                    {letter}) {opt}
                                </span>
                                <span className="font-pixel text-2xl text-cyber-primary">{percent}% ({count})</span>
                            </div>

                            <div className="h-12 w-full bg-white/5 border-2 border-white/10 rounded-sm overflow-hidden relative">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percent}%` }}
                                    transition={{ type: "spring", stiffness: 50, damping: 15 }}
                                    className={`h-full relative ${state.isRevealed ? (isCorrect ? 'bg-[#00FFA3] shadow-[0_0_30px_#00FFA3]' : 'bg-white/20') : 'bg-cyber-primary shadow-[0_0_20px_#2CC6FF]'}`}
                                >
                                    {/* Scanline effect on bars */}
                                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmZiIgb3BhY2l0eT0iMC4xIi8+Cjwvc3ZnPg==')] pointer-events-none" />
                                </motion.div>

                                {state.isRevealed && isCorrect && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#00FFA3] text-black px-3 py-1 font-pixel text-xs rounded-sm"
                                    >
                                        CORRECT
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Footer */}
            <div className="mt-16 flex items-center gap-4 text-white/40 font-pixel text-sm">
                <div className="w-4 h-4 rounded-full border-2 border-cyber-primary animate-ping" />
                <span>RECEIVING LIVE DATA: {totalVotes} VOTES RECORDED</span>
            </div>
        </div>
    );
}
