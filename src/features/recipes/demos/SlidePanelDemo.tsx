import React from 'react';

export const SlidePanelMarkup: React.FC = () => {
    return (
        <div className="relative h-56 rounded-xl border border-white/10 overflow-hidden">
            <div className="sp-backdrop absolute inset-0 bg-black/60 opacity-0" />
            <div className="sp-panel absolute inset-y-0 left-0 w-56 bg-white/10 border-r border-white/15 p-4">
                <h4 className="font-semibold">Menu</h4>
                <ul className="mt-3 space-y-2 text-sm text-white/80">
                    <li>Overview</li>
                    <li>Animations</li>
                    <li>Settings</li>
                </ul>
            </div>
            <div className="absolute inset-0 grid place-items-center pointer-events-none">
                <span className="text-xs text-white/60">Preview area</span>
            </div>
        </div>
    );
};
