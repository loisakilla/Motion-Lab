import React from 'react';
import { gsap } from 'gsap';
import type { Recipe } from '@/features/recipes/types';
import { StaggerCardsMarkup } from '@/features/recipes/demos/StaggerCardsDemo';
import { ScrollPinMarkup } from '@/features/recipes/demos/ScrollPinDemo';
import { ensureGSAPPlugins, ScrollTrigger } from '@/shared/lib/gsap-plugins';


export const recipes: Recipe[] = [
    {
        id: 'stagger-cards',
        title: 'Stagger Cards',
        description: 'Grid из карточек выезжает снизу и проявляется с лёгким stagger.',
        difficulty: 'Beginner',
        tags: ['basics', 'stagger', 'grid'],
        controls: [
            { type: 'range', key: 'duration', label: 'Duration', min: 0.2, max: 2, step: 0.1, default: 0.8 },
            { type: 'range', key: 'stagger', label: 'Stagger', min: 0, max: 0.3, step: 0.01, default: 0.06 },
            { type: 'range', key: 'y', label: 'Y (%)', min: 0, max: 150, step: 5, default: 120 },
            { type: 'select', key: 'ease', label: 'Ease', options: ['power2.out', 'power3.out', 'power4.out', 'back.out(1.7)'], default: 'power4.out' }
        ],
        render: StaggerCardsMarkup,
        runtime: (g, scope, p) => {
            if (!scope) return g.timeline();
            const cards = scope.querySelectorAll('.r-card');
            const tl = g.timeline();
            tl.from(cards, { yPercent: p.y, opacity: 0, stagger: p.stagger, ease: p.ease, duration: p.duration });
            return tl;
        },
        codegen: (p) => `import { gsap } from 'gsap';

const cards = document.querySelectorAll('.r-card');
gsap.from(cards, {
yPercent: ${p.y},
opacity: 0,
stagger: ${p.stagger},
ease: '${p.ease}',
duration: ${p.duration}
});`,
        previewHeight: 220
    },
    {
        id: 'scroll-pin',
        title: 'ScrollTrigger Pin',
        description: 'Внутри прокручиваемого контейнера блок «прикалывается» и плавно исчезает к концу.',
        difficulty: 'Intermediate',
        tags: ['scroll', 'pin', 'container'],
        controls: [
            { type: 'range', key: 'start', label: 'Start offset', min: 0, max: 200, step: 10, default: 20 },
            { type: 'range', key: 'end', label: 'End offset', min: 200, max: 800, step: 20, default: 500 },
            { type: 'range', key: 'opacity', label: 'Fade to', min: 0, max: 1, step: 0.05, default: 0.2 },
            { type: 'select', key: 'scrub', label: 'Scrub', options: ['true', '0.5', '1'], default: 'true' }
        ],
        render: ScrollPinMarkup,
        runtime: (g, scope, p) => {
            if (!scope) return g.timeline();
            ensureGSAPPlugins();
            const scroller = scope.querySelector('.overflow-auto') as HTMLElement | null;
            const pinEl = scope.querySelector('.pin') as HTMLElement | null;
            if (!scroller || !pinEl) return g.timeline();
            const tl = g.timeline({ paused: true });
// scroll-linked opacity
            g.to(pinEl, { opacity: p.opacity, ease: 'none', scrollTrigger: {
                    scroller, trigger: pinEl, start: `top+${p.start}px top`, end: `top+${p.end}px top`, scrub: p.scrub === 'true' ? true : Number(p.scrub)
                }});
// pin itself
            ScrollTrigger.create({ scroller, trigger: pinEl, start: `top+${p.start}px top`, end: `top+${p.end}px top`, pin: true, pinSpacing: false });
            return tl;
        },
        codegen: (p) => `import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);


const scroller = document.querySelector('.overflow-auto');
const pinEl = document.querySelector('.pin');


gsap.to(pinEl, {
opacity: ${p.opacity},
ease: 'none',
scrollTrigger: {
scroller, trigger: pinEl,
start: 'top+${p.start}px top',
end: 'top+${p.end}px top',
scrub: ${p.scrub}
}
});
ScrollTrigger.create({ scroller, trigger: pinEl, start: 'top+${p.start}px top', end: 'top+${p.end}px top', pin: true, pinSpacing: false });`
    }
];