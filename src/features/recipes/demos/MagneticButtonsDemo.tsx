import React from 'react';

export const MagneticButtonsMarkup: React.FC = () => {
    return (
        <div className="h-56 grid place-items-center">
            <div className="flex gap-4">
                {['Primary', 'Secondary', 'Ghost'].map((t, i) => (
                    <button
                        key={i}
                        className="mb-btn relative rounded-xl border border-white/15 bg-white/10 px-5 py-3 text-sm"
                    >
                        <span className="pointer-events-none select-none">{t}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};
