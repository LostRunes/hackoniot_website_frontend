import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import questionsDataFallback from '../assets/questions.json';
import { socket } from '../socket'; // needed if they listen to isolated leaderboards (optional for MobileQuiz itself if it doesn't show leaderboard, but good practice)

const API_URL = import.meta.env.VITE_API_URL || "https://hackoniotwebsitebackend-production.up.railway.app";

export default function MobileQuiz() {
    const navigate = useNavigate();
    const { id } = useParams();
    const internalQuizId = `quiz${id}`;
    const [hasStarted, setHasStarted] = useState(false);
    const [participantInfo, setParticipantInfo] = useState({ name: '', email: '' });

    const [currentIdx, setCurrentIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(15);
    const [selectedOpt, setSelectedOpt] = useState(null);
    const [startTime, setStartTime] = useState(null);

    const [questionsData, setQuestionsData] = useState(questionsDataFallback);

    useEffect(() => {
        // Fetch dynamic questions
        fetch(`${API_URL}/api/questions/${internalQuizId}`)
            .then(res => res.json())
            .then(data => {
                if (data && data.length) setQuestionsData(data);
            })
            .catch(console.error);
    }, [internalQuizId]);

    useEffect(() => {
        if (!hasStarted) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleNext();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [hasStarted]);

    const handleStart = async (e) => {
        e.preventDefault();
        if (participantInfo.name && participantInfo.email) {
            try {
                const res = await fetch(`${API_URL}/api/join/${internalQuizId}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: participantInfo.name.trim(),
                        email: participantInfo.email.trim()
                    })
                });
                const data = await res.json();
                if (data.participantId) {
                    setParticipantInfo(prev => ({ ...prev, id: data.participantId }));
                    setHasStarted(true);
                    setStartTime(Date.now()); // Reset start time to when questions actually appear
                }
            } catch (err) {
                console.error("Join error:", err);
                alert("Connection failed. Please try again.");
            }
        }
    };

    const handleSelectOption = (idx) => {
        if (selectedOpt !== null) return;
        setSelectedOpt(idx);

        let nextScore = score;
        if (idx === questionsData[currentIdx].answer) {
            nextScore = score + 1;
            setScore(nextScore);
        }

        // Auto proceed after 1s
        setTimeout(() => {
            handleNext(nextScore);
        }, 1000);
    };

    const handleNext = async (currentScore = score) => {
        if (currentIdx < questionsData.length - 1) {
            setCurrentIdx(prev => prev + 1);
            setSelectedOpt(null);
            setTimeLeft(15);
        } else {
            // Quiz finished
            const timeTaken = Math.floor((Date.now() - startTime) / 1000);
            const accuracy = Math.round((currentScore / questionsData.length) * 100);

            // Submit score
            try {
                await fetch(`${API_URL}/api/submit-quiz/${internalQuizId}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        participantId: participantInfo.id,
                        score: currentScore,
                        timeTaken
                    })
                });
            } catch (err) {
                console.error("Submit error:", err);
            }

            // Navigate
            navigate('/level1/complete', {
                state: { score: currentScore, total: questionsData.length, accuracy, timeTaken, name: participantInfo.name }
            });
        }
    };

    if (!hasStarted) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-cyber-dark">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="arcade-panel p-8 w-full max-w-sm"
                >
                    <h2 className="text-2xl font-orbitron text-cyber-primary mb-6 text-center">INITIATE CONNECTION</h2>
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
                        <button type="submit" className="neon-button mt-4">
                            ENTER QUIZ
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    const q = questionsData[currentIdx];
    const progress = ((currentIdx + 1) / questionsData.length) * 100;

    return (
        <div className="w-full h-full flex flex-col items-center p-4 bg-cyber-dark max-w-md mx-auto">
            {/* Top Bar */}
            <div className="w-full flex justify-between items-center mb-4 text-cyber-primary font-orbitron">
                <span className="text-sm">Q: {currentIdx + 1}/{questionsData.length}</span>
                <span className={`text-lg font-bold ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-cyber-accent'}`}>
                    00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
                </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-black/50 rounded-full mb-8 overflow-hidden shadow-[inset_0_0_5px_rgba(0,0,0,0.5)]">
                <div
                    className="h-full bg-gradient-to-r from-cyber-secondary to-cyber-primary transition-all duration-300 shadow-[0_0_10px_#00E5FF]"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Question Card */}
            <div className="w-full flex-1 relative flex flex-col">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIdx}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -50, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="w-full flex-1 flex flex-col"
                    >
                        <div className="arcade-panel p-6 mb-8 text-center min-h-[150px] flex items-center justify-center border-cyber-secondary/50 shadow-[0_0_20px_rgba(122,95,255,0.2)]">
                            <h3 className="text-xl md:text-2xl font-inter text-white drop-shadow-[0_0_2px_#ffffff]">{q.question}</h3>
                        </div>

                        <div className="flex flex-col gap-4">
                            {q.options.map((opt, idx) => {
                                let btnStyle = "border-white/20 hover:border-cyber-primary hover:shadow-[0_0_15px_#00E5FF]";
                                if (selectedOpt !== null) {
                                    if (idx === q.answer) {
                                        btnStyle = "border-[#00FFA3] bg-[#00FFA3]/20 shadow-[0_0_20px_#00FFA3] text-[#00FFA3]";
                                    } else if (idx === selectedOpt) {
                                        btnStyle = "border-red-500 bg-red-500/20 shadow-[0_0_20px_red] text-red-500";
                                    } else {
                                        btnStyle = "opacity-50 border-white/10";
                                    }
                                }

                                return (
                                    <button
                                        key={idx}
                                        disabled={selectedOpt !== null}
                                        onClick={() => handleSelectOption(idx)}
                                        className={`
                      w-full p-4 rounded-xl border bg-black/40 text-left font-inter text-lg transition-all duration-300
                      ${btnStyle}
                      ${selectedOpt === idx ? 'animate-[pulse_0.5s_ease-in-out_infinite]' : ''}
                    `}
                                    >
                                        {opt}
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
