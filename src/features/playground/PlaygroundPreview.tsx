// src/features/playground/PlaygroundPreview.tsx
import React, { useEffect, useRef, useState } from 'react';
import { buildSrcDoc } from '@/features/playground/srcdoc';

export function PlaygroundPreview({ html, code, runKey }: { html: string; code: string; runKey: number; }) {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const iframe = iframeRef.current;
        if (!iframe) return;
        setLoading(true);
        const doc = buildSrcDoc(html, code);
        iframe.srcdoc = doc;
    }, [html, code, runKey]);

    return (
        <div className="relative">
            {/* iframe с тёмным фоном, чтобы не «моргал» */}
            <iframe
                ref={iframeRef}
                className="w-full h-[360px] rounded-xl border border-white/10 bg-[#0b0b0f]"
                sandbox="allow-scripts"
                title="Preview"
                onLoad={() => setLoading(false)}
            />
            {loading && (
                <div className="absolute inset-0 grid place-items-center rounded-xl border border-white/10 bg-[#0b0b0f]">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                </div>
            )}
        </div>
    );
}
