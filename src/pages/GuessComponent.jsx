import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import NeonButton from '../components/NeonButton';
import { playArcadeSound } from '../utils/audio';

// A simple plane that displays the texture and rotates when correct
function RotatingComponent({ textureUrl, isRotating }) {
    const meshRef = useRef();
    const texture = useTexture(textureUrl);

    useFrame((state, delta) => {
        if (isRotating && meshRef.current) {
            meshRef.current.rotation.y += delta * 2;
        }
    });

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[3, 3]} />
            <meshBasicMaterial map={texture} transparent={true} />
        </mesh>
    );
}

const GUESS_QUESTIONS = [
    {
        hidden: '/guess/hidden/arduinohidden.png',
        reveal: '/guess/reveal/arduino.png',
        options: [
            { id: 1, text: 'Raspberry Pi 4', correct: false },
            { id: 2, text: 'Arduino Uno', correct: true },
            { id: 3, text: 'ESP32 Module', correct: false },
            { id: 4, text: 'Intel Edison', correct: false }
        ],
        title: 'Arduino Uno',
        desc: 'A microcontroller board based on the ATmega328P. It is the most used and documented board of the whole Arduino & Genuino family.'
    },
    {
        hidden: '/guess/hidden/rasberryhidden.png',
        reveal: '/guess/reveal/rasberry.png',
        options: [
            { id: 1, text: 'Arduino Mega', correct: false },
            { id: 2, text: 'NVIDIA Jetson', correct: false },
            { id: 3, text: 'Raspberry Pi 4', correct: true },
            { id: 4, text: 'BeagleBone Black', correct: false }
        ],
        title: 'Raspberry Pi',
        desc: 'A series of small single-board computers developed in the United Kingdom by the Raspberry Pi Foundation.'
    },
    {
        hidden: '/guess/hidden/espcamhidden.png',
        reveal: '/guess/reveal/espcam.png',
        options: [
            { id: 1, text: 'ESP32 Cam', correct: true },
            { id: 2, text: 'Webcam Module', correct: false },
            { id: 3, text: 'Action Camera', correct: false },
            { id: 4, text: 'Raspberry Pi Camera', correct: false }
        ],
        title: 'ESP32 CAM',
        desc: 'A very small camera module with the ESP32-S chip that costs around $10. Extremely useful for IoT video streaming.'
    },
    {
        hidden: '/guess/hidden/gashidden.png',
        reveal: '/guess/reveal/gas.png',
        options: [
            { id: 1, text: 'PIR Sensor', correct: false },
            { id: 2, text: 'Gas Sensor (MQ-2)', correct: true },
            { id: 3, text: 'Sound Sensor', correct: false },
            { id: 4, text: 'Ultrasonic Sensor', correct: false }
        ],
        title: 'MQ-2 Gas Sensor',
        desc: 'Used in gas leakage detecting equipments in family and industry. It can detect LPG, i-butane, propane, methane, alcohol, Hydrogen, and smoke.'
    },
    {
        hidden: '/guess/hidden/moisturehidden.png',
        reveal: '/guess/reveal/moisture.png',
        options: [
            { id: 1, text: 'Soil Moisture Sensor', correct: true },
            { id: 2, text: 'Temperature Sensor', correct: false },
            { id: 3, text: 'Water Level Sensor', correct: false },
            { id: 4, text: 'Vibration Sensor', correct: false }
        ],
        title: 'Soil Moisture Sensor',
        desc: 'Measures the volumetric content of water inside the soil and gives us the moisture level as output.'
    },
    {
        hidden: '/guess/hidden/pressurehidden.png',
        reveal: '/guess/reveal/presssure.png',
        options: [
            { id: 1, text: 'LDR Sensor', correct: false },
            { id: 2, text: 'BMP180 Pressure Sensor', correct: true },
            { id: 3, text: 'Gyroscope MPU6050', correct: false },
            { id: 4, text: 'Thermistor', correct: false }
        ],
        title: 'Barometric Pressure Sensor',
        desc: 'Measures barometric pressure and temperature, often used in weather stations or altitude estimation.'
    }
];

export default function GuessComponent() {
    const navigate = useNavigate();
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [answered, setAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showSpark, setShowSpark] = useState(false);

    const question = GUESS_QUESTIONS[currentQuestionIdx];

    const handleGuess = (correct) => {
        if (answered) return;
        setAnswered(true);
        setIsCorrect(correct);

        if (correct) {
            playArcadeSound('correct');
        } else {
            setShowSpark(true);
            playArcadeSound('wrong');
            setTimeout(() => setShowSpark(false), 500);
        }
    };

    const handleNext = () => {
        if (currentQuestionIdx < GUESS_QUESTIONS.length - 1) {
            setCurrentQuestionIdx(prev => prev + 1);
            setAnswered(false);
            setIsCorrect(false);
        } else {
            navigate('/level1/riddle');
        }
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center relative p-4">

            {/* Spark effect for wrong answer */}
            <AnimatePresence>
                {showSpark && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1.2 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center"
                    >
                        <div className="w-full h-full bg-red-500/20 mix-blend-screen" />
                        <div className="absolute font-orbitron text-red-500 text-6xl rotate-12 blur-[1px]">ERROR</div>
                    </motion.div>
                )}
            </AnimatePresence>

            <h2 className="text-3xl font-orbitron text-cyber-primary mb-8 glow-text tracking-widest text-center">
                IDENTIFY THE COMPONENT
            </h2>

            {/* Holographic Circular Display */}
            <div className="relative w-80 h-80 rounded-full border-4 border-cyber-secondary shadow-[0_0_30px_#7A5FFF] flex items-center justify-center overflow-hidden bg-cyber-dark/80 backdrop-blur-md mb-12">
                {/* Glow behind component */}
                <div className={`absolute inset-0 transition-opacity duration-1000 ${isCorrect ? 'opacity-50' : 'opacity-0'}`} style={{ background: 'radial-gradient(circle, #00FFA3 0%, transparent 70%)' }} />

                {/* The Component (Silhouette or 3D) */}
                {!answered ? (
                    <div className="relative w-full h-full">
                        <img
                            src={question.hidden}
                            alt="Guess Component Silhouette"
                            className="absolute inset-0 w-full h-full object-contain p-8 silhouette scale-110"
                        />
                        {/* Custom Pixel dissolve animation overlay could be added here */}
                    </div>
                ) : (
                    <div className="w-full h-full">
                        <Canvas camera={{ position: [0, 0, 5] }}>
                            <ambientLight intensity={1} />
                            {/* We can optionally spin the revealed image as a 2D plane texture */}
                            <RotatingComponent textureUrl={question.reveal} isRotating={isCorrect} />
                        </Canvas>
                    </div>
                )}
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 gap-4 max-w-2xl w-full">
                {question.options.map((opt) => (
                    <motion.button
                        key={opt.id}
                        whileHover={{ scale: answered ? 1 : 1.05 }}
                        whileTap={{ scale: answered ? 1 : 0.95 }}
                        onClick={() => handleGuess(opt.correct)}
                        disabled={answered}
                        className={`
              arcade-panel p-4 text-center font-orbitron text-lg transition-all duration-300
              ${answered && opt.correct ? 'border-cyber-accent text-cyber-accent shadow-[0_0_20px_#00FFA3]' : ''}
              ${answered && !opt.correct ? 'opacity-30' : 'hover:border-cyber-primary'}
            `}
                    >
                        {opt.text}
                    </motion.button>
                ))}
            </div>

            {/* Description Panel (Shows after answering) */}
            <AnimatePresence>
                {answered && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-8 arcade-panel p-6 max-w-2xl text-center border-cyber-primary"
                    >
                        <h3 className="text-cyber-accent font-orbitron mb-2 text-xl">{question.title}</h3>
                        <p className="text-white/80 font-inter text-sm mb-6">
                            {question.desc}
                        </p>
                        <NeonButton onClick={handleNext}>
                            {currentQuestionIdx < GUESS_QUESTIONS.length - 1 ? 'NEXT COMPONENT' : 'PROCEED TO RIDDLE'}
                        </NeonButton>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
