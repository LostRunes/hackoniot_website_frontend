import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import NeonButton from '../components/NeonButton';

export default function QREntry() {
    const navigate = useNavigate();
    const { id } = useParams();

    // Note: in a real environment this would be the ngrok/local IP URL to the quiz
    const joinUrl = `${window.location.origin}/mobilequiz/${id}`;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full h-full flex flex-col items-center justify-center p-6 relative"
        >
            <h2 className="text-3xl md:text-5xl font-orbitron text-cyber-primary mb-2 glow-text tracking-widest text-center uppercase">
                Participants Join Now - Quiz {id}
            </h2>
            <p className="text-cyber-secondary font-inter mb-12 tracking-wide text-lg">
                Scan to enter the IoT challenge
            </p>

            <div className="relative p-6 glass-panel border-[#00FFA3] shadow-[0_0_40px_rgba(0,255,163,0.3)] mb-12 flex items-center justify-center group">
                {/* Animated Scanner line over QR */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-[#00FFA3] shadow-[0_0_15px_#00FFA3] z-10 animate-[scan_2s_ease-in-out_infinite]" />

                {/* Glowing corners */}
                <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-[#00FFA3]" />
                <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-[#00FFA3]" />
                <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-[#00FFA3]" />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-[#00FFA3]" />

                <div className="bg-white p-4 rounded aspect-square">
                    <QRCodeSVG
                        value={joinUrl}
                        size={256}
                        bgColor={"#ffffff"}
                        fgColor={"#0A0F1C"}
                        level={"H"}
                        includeMargin={false}
                    />
                </div>
            </div>

            <NeonButton onClick={() => navigate(`/mobilequiz/${id}`)}>
                MANUAL OVERRIDE (ENTER QUIZ)
            </NeonButton>

            <style>{`
        @keyframes scan {
          0%, 100% { top: 10px; opacity: 0; }
          10% { opacity: 1; }
          50% { top: calc(100% - 10px); }
          90% { opacity: 1; }
        }
      `}</style>
        </motion.div>
    );
}
