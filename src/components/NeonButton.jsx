import React from 'react';

export default function NeonButton({ children, onClick, className = '' }) {
    return (
        <button onClick={onClick} className={`neon-button ${className}`}>
            {children}
        </button>
    );
}
