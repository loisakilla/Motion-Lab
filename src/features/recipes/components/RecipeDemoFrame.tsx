import React, { useMemo, useRef, useState } from 'react';
import { useGsapContext } from '@/shared/hooks/useGsapContext';
import type { Recipe } from '@/features/recipes/types';
import { Play, Pause, RotateCw, Clipboard } from 'lucide-react';
import { copyToClipboard } from '@/shared/lib/clipboard';
import {Button} from "@/components/button";
import {useIsomorphicLayoutEffect} from "@/shared/hooks/useIsomorphicLayoutEffect";

export function RecipeDemoFrame({ recipe, params, onCodeRequest}: {recipe: Recipe; params: Record<string, any>; onCodeRequest?: () => void;}) {
    const scopeRef = useRef<HTMLDivElement>(null);
    const { ctx, gsap } = useGsapContext(scopeRef);
    const [copied, setCopied] = useState(false);
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    useIsomorphicLayoutEffect(() => {
        const scopeEl = scopeRef.current;
        if (!scopeEl) return; // важно: если реф ещё пуст — выходим

        ctx.add(() => {
            const tl = recipe.runtime(gsap, scopeEl, params);
            tlRef.current = tl;
            tl.play(0);
        });

        return () => ctx.revert();
        // зависимость — по параметрам (строковый слепок достаточен)
    }, [ctx, gsap, recipe, JSON.stringify(params)]);

    const handleCopy = async () => {
        const code = recipe.codegen(params);
        const ok = await copyToClipboard(code);
        setCopied(!!ok);
        setTimeout(() => setCopied(false),1500);
        onCodeRequest?.();
    };

    const play = () => tlRef.current?.resume();
    const pause = () => tlRef.current?.pause();
    const reset = () => tlRef.current?.seek(0).pause();


    const height = recipe.previewHeight ?? 260;

    return (
        <div className="relative border border-white/10 rounded-2xl overflow-hidden" style={{height}} ref={scopeRef}>
            <div className="absolute inset-x-0 top-0 z-10 flex items-center gap-2 p-2">
                <Button size="sm" variant="outline" onClick={play}><Play size={14}/> Play</Button>
                <Button size="sm" variant="outline" onClick={pause}><Pause size={14}/> Pause</Button>
                <Button size="sm" variant="outline" onClick={reset}><RotateCw size={14}/> Reset</Button>
                <Button size="sm" variant="outline" onClick={handleCopy}><Clipboard
                    size={14}/> {copied ? 'Copied' : 'Copy code'}</Button>
            </div>
            <div className="absolute inset-0 pt-12">
                <recipe.render/>
            </div>
        </div>
    );
}