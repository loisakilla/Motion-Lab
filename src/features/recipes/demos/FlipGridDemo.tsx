import React from 'react';

export const FlipGridMarkup: React.FC = () => {
    const items = Array.from({ length: 12 });
    return (
        <div className="grid grid-cols-4 gap-3 p-3">
            {items.map((_, i) => (
                <div
                    key={i}
                    className="fg-item h-16 rounded-xl border border-white/10 bg-white/10"
                    style={{ backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,.12), rgba(255,255,255,.04))' }}
                />
            ))}
        </div>
    );
};
