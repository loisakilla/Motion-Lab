import React, {useMemo, useState, useRef, useEffect} from 'react';
import { useSearchParams } from 'react-router-dom';
import { decodeState, encodeState } from '@/features/playground/share';
import { PlaygroundEditor } from '@/features/playground/PlaygroundEditor';
import { PlaygroundPreview } from '@/features/playground/PlaygroundPreview';
import { Button } from '@/components/ui/button';

import { useGsapContext } from '@/shared/hooks/useGsapContext';
import { useIsomorphicLayoutEffect } from '@/shared/hooks/useIsomorphicLayoutEffect';
import { shouldReduceMotion } from '@/shared/lib/motion';


const DEFAULT_HTML = '<div id="app" style="padding:24px;border:1px dashed rgba(255,255,255,.2);border-radius:12px;">Hello GSAP</div>';
const DEFAULT_CODE = `// You can write plain JS here. 'gsap' is available.
const el = document.querySelector('#app');
gsap.from(el, { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' });`;


export const PlaygroundPage: React.FC = () => {
    const [sp] = useSearchParams();
    const initial = useMemo(() => decodeState(sp.get('state')) || { code: DEFAULT_CODE, html: DEFAULT_HTML }, [sp]);


    const [code, setCode] = useState(initial.code);
    const [html, setHtml] = useState(initial.html);
    const [runKey, setRunKey] = useState(0);

    const rootRef = useRef<HTMLElement>(null);
    const { ctx, gsap } = useGsapContext(rootRef);

    useEffect(() => { setRunKey(k => k + 1); }, []); // импортируй useEffect


    useIsomorphicLayoutEffect(() => {
        if (shouldReduceMotion()) return;
        ctx.add(() => {
            const title = rootRef.current?.querySelector('[data-title]');
            const toolbar = rootRef.current?.querySelector('[data-toolbar]');
            const panels = gsap.utils.toArray<HTMLElement>('[data-panel]', rootRef.current || undefined);

            const tl = gsap.timeline();
            if (title) {
                tl.from(title,   { y: 8,  opacity: 0, duration: 0.5, ease: 'power2.out' });
            }
            if (toolbar) {
                tl.from(toolbar, { y: 6,  opacity: 0, duration: 0.4 }, '<0.05');
            }
            if (panels) {
                tl.from(panels,  { y: 12, opacity: 0, duration: 0.5, stagger: 0.06, ease: 'power3.out' }, '<0.1');
            }
        });
        return () => ctx.revert();
    }, [ctx, gsap]);

    const run = () => setRunKey(k => k + 1);
    const reset = () => { setCode(DEFAULT_CODE); setHtml(DEFAULT_HTML); setRunKey(k => k + 1); };
    const share = async () => {
        const url = `${window.location.origin}/playground?state=${encodeState({ code, html })}`;
        try { await navigator.clipboard.writeText(url); alert('Share link copied!'); } catch { /* noop */ }
    };


    const exportToCodePen = () => {
        const data = {
            title: 'Motion Lab Playground',
            html,
            js: code,
            js_external: 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js'
        };
        const form = document.createElement('form');
        form.action = 'https://codepen.io/pen/define';
        form.method = 'POST';
        form.target = '_blank';
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'data';
        input.value = JSON.stringify(data);
        form.appendChild(input);
        document.body.appendChild(form);
        form.submit();
        form.remove();
    };


    return (
        <section ref={rootRef} className="mx-auto max-w-6xl px-4 py-10">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight" data-title>Playground</h1>
                <div className="flex gap-2" data-toolbar>
                    <Button onClick={run}>Run</Button>
                    <Button variant="outline" onClick={reset}>Reset</Button>
                    <Button variant="outline" onClick={share}>Share</Button>
                    <Button variant="outline" onClick={exportToCodePen}>Export → CodePen</Button>
                </div>
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4" data-panel>
                    <h3 className="font-semibold">JavaScript</h3>
                    <PlaygroundEditor value={code} onChange={setCode} language="js" />
                    <h3 className="font-semibold">HTML</h3>
                    <PlaygroundEditor value={html} onChange={setHtml} language="html" />
                </div>
                <div className="space-y-4" data-panel>
                    <h3 className="font-semibold">Preview</h3>
                    <PlaygroundPreview html={html} code={code} runKey={runKey} />
                </div>
            </div>
        </section>
    );
};