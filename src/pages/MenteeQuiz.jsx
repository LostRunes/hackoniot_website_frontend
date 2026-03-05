import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { socket } from '../socket';

// Example Mentee questions. In production this could be fetched from MongoDB
const MENTEE_QUESTIONS = [
    {
        question: "Which component measures distance using sound?",
        options: ["Servo Motor", "Ultrasonic Sensor", "IR Sensor", "Breadboard"],
        answerIndex: 1
    },
    {
        question: "What is the operating voltage of an ESP32?",
        options: ["5V", "3.3V", "12V", "9V"],
        answerIndex: 1
    },
    {
        question: "Which of these is NOT a communication protocol?",
        options: ["I2C", "SPI", "PWM", "UART"],
        answerIndex: 2
    }
];

export default function MenteeQuiz() {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [isRevealed, setIsRevealed] = useState(false);

    // Fake audience vote data state (adds illusion of live voting)
    const [votes, setVotes] = useState([0, 0, 0, 0]);

    useEffect(() => {
        // Listen for next question
        const handleNext = () => {
            setCurrentIdx((prev) => (prev < MENTEE_QUESTIONS.length - 1 ? prev + 1 : prev));
            setIsRevealed(false);
            setVotes([0, 0, 0, 0]); // Reset votes for new question
        };

        // Listen to reveal answer
        const handleReveal = () => {
            setIsRevealed(true);
        };

        // End quiz resets or navigates away
        const handleEnd = () => {
            window.location.href = '/'; // Go back to map/home
        };

        socket.on('nextMenteeQuestion', handleNext);
        socket.on('revealMenteeAnswer', handleReveal);
        socket.on('endMenteeQuiz', handleEnd);

        return () => {
            socket.off('nextMenteeQuestion', handleNext);
            socket.off('revealMenteeAnswer', handleReveal);
            socket.off('endMenteeQuiz', handleEnd);
        };
    }, []);

    // Simulate audience voting while NOT revealed
    useEffect(() => {
        if (isRevealed) return;

        const interval = setInterval(() => {
            setVotes((prev) => {
                const next = [...prev];
                // randomly increase a vote by 1-5 to give illusion of live tracking
                const randOpt = Math.floor(Math.random() * 4);
                next[randOpt] += Math.floor(Math.random() * 5) + 1;
                return next;
            });
        }, 800);

        return () => clearInterval(interval);
    }, [isRevealed]);

    const q = MENTEE_QUESTIONS[currentIdx];

    // Calculate percentages for the bar graph
    const totalVotes = votes.reduce((a, b) => a + b, 0);
    const percentages = votes.map(v => totalVotes === 0 ? 0 : Math.round((v / totalVotes) * 100));

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-cyber-dark overflow-hidden">
            <motion.h2
                key={`q-${currentIdx}`}
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-orbitron text-white mb-16 text-center drop-shadow-[0_0_15px_#00E5FF] max-w-5xl"
            >
                {q.question}
            </motion.h2>

            <div className="w-full max-w-4xl grid grid-cols-2 lg:grid-cols-4 gap-8">
                <AnimatePresence mode="popLayout">
                    {q.options.map((opt, idx) => {
                        const isCorrect = idx === q.answerIndex;
                        const highlightColor = isRevealed
                            ? (isCorrect ? '#00FFA3' : 'rgba(255, 255, 255, 0.1)')
                            : '#00E5FF';

                        // Determine dimensions for bar graph
                        const barHeight = isRevealed ? percentages[idx] : percentages[idx];

                        return (
                            <motion.div
                                layout
                                key={`opt-${currentIdx}-${idx}`}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{
                                    opacity: isRevealed && !isCorrect ? 0.3 : 1,
                                    scale: 1
                                }}
                                className="flex flex-col items-center justify-end h-[400px]"
                            >
                                {/* Simulated vote count floating above bar */}
                                <motion.span
                                    className="text-xl font-orbitron font-bold mb-4"
                                    style={{ color: highlightColor }}
                                >
                                    {isRevealed ? `${percentages[idx]}%` : votes[idx]}
                                </motion.span>

                                {/* The Bar */}
                                <motion.div
                                    className="w-full rounded-t-lg relative overflow-hidden"
                                    initial={{ height: 0 }}
                                    animate={{ height: `${barHeight || 1}%` }} // Ensure at least 1% to render
                                    transition={{ duration: 0.5 }}
                                    style={{
                                        backgroundColor: isRevealed && isCorrect ? '#00FFA3' : 'rgba(0, 229, 255, 0.3)',
                                        boxShadow: isRevealed && isCorrect ? '0 0 30px #00FFA3' : 'none'
                                    }}
                                >
                                    {/* Neon top rim */}
                                    <div className="absolute top-0 left-0 w-full h-2 bg-white/50" />
                                </motion.div>

                                {/* Option Text Box below bar */}
                                <div
                                    className="w-full mt-4 p-4 text-center rounded-lg border-2"
                                    style={{
                                        borderColor: highlightColor,
                                        backgroundColor: isRevealed && isCorrect ? 'rgba(0, 255, 163, 0.1)' : 'rgba(0,0,0,0.5)',
                                    }}
                                >
                                    <span className="font-inter text-xl text-white block">{opt}</span>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
}
