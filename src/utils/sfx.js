// Simple 8-bit sound synthesizer using the Web Audio API
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playTone(freq, type, duration, vol = 0.1) {
    if (!audioCtx) return;
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = type; // 'square', 'sawtooth', 'triangle', 'sine'
    oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);

    // Envelope
    gainNode.gain.setValueAtTime(vol, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + duration);
}

export const playHoverSound = () => {
    playTone(400, 'triangle', 0.1, 0.05);
};

export const playClickSound = () => {
    playTone(800, 'square', 0.1, 0.1);
    setTimeout(() => playTone(1200, 'square', 0.15, 0.1), 50);
};

export const playCoinSound = () => {
    playTone(988, 'square', 0.1, 0.15); // B5
    setTimeout(() => playTone(1319, 'square', 0.4, 0.15), 100); // E6
};

export const playCorrectSound = () => {
    // Arpeggio up
    playTone(440, 'square', 0.1);
    setTimeout(() => playTone(554, 'square', 0.1), 100);
    setTimeout(() => playTone(659, 'square', 0.3), 200);
    setTimeout(() => playTone(880, 'square', 0.4), 300);
};

export const playWrongSound = () => {
    // Buzz down
    playTone(300, 'sawtooth', 0.2, 0.2);
    setTimeout(() => playTone(250, 'sawtooth', 0.4, 0.2), 150);
};

export const playLevelUpSound = () => {
    const notes = [261.63, 329.63, 392.00, 523.25]; // C E G C
    notes.forEach((freq, i) => {
        setTimeout(() => playTone(freq, 'square', 0.2, 0.1), i * 150);
    });
};
