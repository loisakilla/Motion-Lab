import React from 'react';

export const OrbitRingMarkup: React.FC = () => {
    const items = Array.from({ length: 8 });
    return (
        <div className="h-56 flex items-center justify-center">
            <div className="orbit-container relative h-48 w-48">
                {items.map((_, i) => (
                    <div
                        key={i}
                        className="o-dot absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90 shadow"
                        style={{ opacity: 0.95 }}
                    />
                ))}
            </div>
        </div>
    );
};
