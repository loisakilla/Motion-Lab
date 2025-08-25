import React from 'react';
import { gsap } from 'gsap';
import type { Recipe } from '@/features/recipes/types';
import { StaggerCardsMarkup } from '@/features/recipes/demos/StaggerCardsDemo';
import { OrbitRingMarkup } from '@/features/recipes/demos/OrbitRingDemo';
import { SlidePanelMarkup } from '@/features/recipes/demos/SlidePanelDemo';
import { FlipGridMarkup } from '@/features/recipes/demos/FlipGridDemo';
import { ensureGSAPPlugins, Flip } from '@/shared/lib/gsap-plugins';
import { MagneticButtonsMarkup } from '@/features/recipes/demos/MagneticButtonsDemo';


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
        id: 'orbit-ring',
        title: 'Orbit Ring',
        description: 'Точки равномерно распределяются по кругу и бесконечно вращаются вокруг центра.',
        difficulty: 'Beginner',
        tags: ['loop', 'transform', 'math'],
        controls: [
            { type: 'range', key: 'duration', label: 'Duration (s)', min: 3, max: 20, step: 1, default: 8 },
            { type: 'range', key: 'radius', label: 'Radius (px)', min: 30, max: 120, step: 5, default: 70 },
            { type: 'select', key: 'direction', label: 'Direction', options: ['clockwise', 'counterclockwise'], default: 'clockwise' }
        ],
        render: OrbitRingMarkup,
        runtime: (g, scope, p) => {
            if (!scope) return g.timeline();
            const container = scope.querySelector('.orbit-container') as HTMLElement | null;
            const dots = Array.from(scope.querySelectorAll<HTMLElement>('.o-dot'));
            if (!container || dots.length === 0) return g.timeline();

            const n = dots.length;
            g.set(container, { rotate: 0, transformOrigin: '50% 50%' });
            dots.forEach((d, i) => {
                const a = (i / n) * Math.PI * 2;
                g.set(d, { x: Math.cos(a) * p.radius, y: Math.sin(a) * p.radius });
            });

            const tl = g.timeline();
            tl.to(container, {
                rotate: p.direction === 'counterclockwise' ? -360 : 360,
                duration: p.duration,
                ease: 'none',
                repeat: -1
            });
            return tl;
        },
        codegen: (p) => `import { gsap } from 'gsap';

const container = document.querySelector('.orbit-container');
const dots = Array.from(document.querySelectorAll('.o-dot'));
const n = dots.length;

gsap.set(container, { rotate: 0, transformOrigin: '50% 50%' });
dots.forEach((d, i) => {
  const a = (i / n) * Math.PI * 2;
  gsap.set(d, { x: Math.cos(a) * ${p.radius}, y: Math.sin(a) * ${p.radius} });
});

gsap.to(container, {
  rotate: ${p.direction === 'counterclockwise' ? -360 : 360},
  duration: ${p.duration},
  ease: 'none',
  repeat: -1
});`,
        previewHeight: 240
    },
    {
        id: 'slide-panel',
        title: 'Slide-In Panel',
        description: 'Панель выезжает слева, фон затемняется, в конце лёгкий «овершут».',
        difficulty: 'Beginner',
        tags: ['ui', 'overlay', 'panel'],
        controls: [
            { type: 'range', key: 'duration', label: 'Duration (s)', min: 0.3, max: 2, step: 0.1, default: 0.8 },
            { type: 'range', key: 'overshoot', label: 'Overshoot (px)', min: 0, max: 40, step: 2, default: 12 },
            { type: 'select', key: 'ease', label: 'Ease', options: ['power3.out', 'back.out(1.4)', 'power2.out'], default: 'power3.out' }
        ],
        render: SlidePanelMarkup,
        runtime: (g, scope, p) => {
            if (!scope) return g.timeline();
            const panel = scope.querySelector('.sp-panel') as HTMLElement | null;
            const backdrop = scope.querySelector('.sp-backdrop') as HTMLElement | null;
            if (!panel || !backdrop) return g.timeline();

            g.set(panel, { xPercent: -100 });
            g.set(backdrop, { opacity: 0, pointerEvents: 'none' });

            const tl = g.timeline();
            const fadeDur = Math.min(p.duration * 0.5, 0.6);

            tl.to(backdrop, { opacity: 1, duration: fadeDur, ease: 'power1.out' }, 0)
                .to(panel, { xPercent: 0, duration: p.duration, ease: p.ease }, 0);

            if (p.overshoot > 0) {
                tl.to(panel, { x: p.overshoot, duration: 0.12, ease: 'power2.out' })
                    .to(panel, { x: 0, duration: 0.18, ease: 'power2.inOut' });
            }
            return tl;
        },
        codegen: (p) => {
            const fadeDur = Math.min(p.duration * 0.5, 0.6);
            return `import { gsap } from 'gsap';

const panel = document.querySelector('.sp-panel');
const backdrop = document.querySelector('.sp-backdrop');

gsap.set(panel, { xPercent: -100 });
gsap.set(backdrop, { opacity: 0, pointerEvents: 'none' });

const tl = gsap.timeline();
tl.to(backdrop, { opacity: 1, duration: ${fadeDur}, ease: 'power1.out' }, 0)
  .to(panel, { xPercent: 0, duration: ${p.duration}, ease: '${p.ease}' }, 0);
${p.overshoot > 0 ? `tl.to(panel, { x: ${p.overshoot}, duration: 0.12, ease: 'power2.out' })
  .to(panel, { x: 0, duration: 0.18, ease: 'power2.inOut' });` : ''}`;
        },
        previewHeight: 240
    },
    {
        id: 'flip-grid-shuffle',
        title: 'Flip Grid Shuffle',
        description: 'Карточки грида случайно перестраиваются с плавной анимацией FLIP.',
        difficulty: 'Intermediate',
        tags: ['grid', 'flip', 'layout'],
        controls: [
            { type: 'range', key: 'duration', label: 'Duration (s)', min: 0.3, max: 1.6, step: 0.1, default: 0.8 },
            { type: 'range', key: 'stagger', label: 'Stagger', min: 0, max: 0.12, step: 0.01, default: 0.03 },
            { type: 'select', key: 'ease', label: 'Ease', options: ['power2.out', 'power3.out', 'power1.inOut'], default: 'power2.out' },
            { type: 'select', key: 'scale', label: 'Scale', options: ['true', 'false'], default: 'true' },
            { type: 'select', key: 'absolute', label: 'Absolute', options: ['true', 'false'], default: 'true' }
        ],
        render: FlipGridMarkup,
        runtime: (g, scope, p) => {
            ensureGSAPPlugins();
            if (!scope) return g.timeline();

            const container = scope.querySelector('.grid') as HTMLElement | null;
            const items = Array.from(scope.querySelectorAll<HTMLElement>('.fg-item'));
            if (!container || items.length === 0) return g.timeline();

            // 1) Снимем состояние ДО перестановки
            const state = Flip.getState(items);

            // 2) Перемешаем DOM безопасно
            const order = items.slice() as HTMLElement[];
            for (let i = order.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                const tmp = order[i]!;
                order[i] = order[j]!;
                order[j] = tmp;
            }
            order.forEach((el) => container.appendChild(el));

            // 3) FLIP-анимация
            const tl = g.timeline();
            tl.add(Flip.from(state, {
                duration: p.duration,
                ease: p.ease,
                stagger: p.stagger,
                absolute: p.absolute === 'true',
                scale: p.scale === 'true'
            }), 0);

            return tl;
        },

        codegen: (p) => `import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(Flip);

const container = document.querySelector('.grid');
const items = Array.from(document.querySelectorAll('.fg-item'));
const state = Flip.getState(items);

// shuffle DOM
const order = items.slice();
for (let i = order.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [order[i], order[j]] = [order[j], order[i]];
}
order.forEach(el => container.appendChild(el));

// animate
Flip.from(state, {
  duration: ${p.duration},
  ease: '${p.ease}',
  stagger: ${p.stagger},
  absolute: ${p.absolute},
  scale: ${p.scale}
});`,
        previewHeight: 220
    },
    {
        id: 'magnetic-buttons',
        title: 'Magnetic Buttons',
        description: 'Кнопки «тянутся» к курсору с пружинкой и лёгким наклоном.',
        difficulty: 'Intermediate',
        tags: ['ui', 'hover', 'spring'],
        controls: [
            { type: 'range', key: 'radius',   label: 'Radius (px)',   min: 30, max: 180, step: 5, default: 100 },
            { type: 'range', key: 'strength', label: 'Strength (px)', min: 8,  max: 60,  step: 1, default: 28 },
            { type: 'range', key: 'spring',   label: 'Spring (s)',    min: 0.05, max: 0.5, step: 0.01, default: 0.18 },
            { type: 'range', key: 'tilt',     label: 'Tilt (°)',      min: 0,   max: 12,  step: 1, default: 6 }
        ],
        render: MagneticButtonsMarkup,
        runtime: (g, scope, p) => {
            if (!scope) return g.timeline();
            const btns = Array.from(scope.querySelectorAll<HTMLElement>('.mb-btn'));
            if (!btns.length) return g.timeline();

            // Снимем предыдущие обработчики, если были (чтоб не плодились при изменении params)
            (scope as any).__mb_unsub?.();

            const unsubFns: Array<() => void> = [];
            const getRectCenter = (el: HTMLElement) => {
                const r = el.getBoundingClientRect();
                return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
            };

            // Быстрые setters для плавности
            // Быстрые setters (оставь как есть)
            const api = btns.map((el) => ({
                x: g.quickTo(el, 'x', { duration: p.spring, ease: 'power2.out', overwrite: 'auto' }),
                y: g.quickTo(el, 'y', { duration: p.spring, ease: 'power2.out', overwrite: 'auto' }),
                r: g.quickTo(el, 'rotate', { duration: p.spring, ease: 'power2.out', overwrite: 'auto' })
            }));

            const onMove = (e: MouseEvent) => {
                for (let i = 0; i < btns.length; i++) {
                    const el = btns[i]!;
                    const a = api[i]!; // non-null (длина одинакова)
                    const r = el.getBoundingClientRect();
                    const cx = r.left + r.width / 2;
                    const cy = r.top + r.height / 2;
                    const dx = e.clientX - cx;
                    const dy = e.clientY - cy;
                    const dist = Math.hypot(dx, dy);

                    if (dist < p.radius) {
                        const t = 1 - dist / p.radius;
                        const k = t * p.strength;
                        a.x((dx / (dist || 1)) * k);
                        a.y((dy / (dist || 1)) * k);
                        a.r((dx / (p.radius || 1)) * p.tilt);
                    } else {
                        a.x(0); a.y(0); a.r(0);
                    }
                }
            };

            const onLeave = () => {
                for (let i = 0; i < api.length; i++) {
                    const a = api[i]!;
                    a.x(0); a.y(0); a.r(0);
                }
            };


            scope.addEventListener('mousemove', onMove);
            scope.addEventListener('mouseleave', onLeave);
            unsubFns.push(() => scope.removeEventListener('mousemove', onMove));
            unsubFns.push(() => scope.removeEventListener('mouseleave', onLeave));

            // Сохраняем «отписку» на scope, чтобы следующая инициализация её вызвала
            (scope as any).__mb_unsub = () => unsubFns.forEach(fn => fn());

            // Небольшой «появляющийся» старт, чтобы Play/Restart давал визуальную отдачу
            const tl = g.timeline();
            tl.from(btns, { scale: 0.9, opacity: 0, duration: 0.35, ease: 'power3.out', stagger: 0.05 });
            return tl;
        },
        codegen: (p) => `import { gsap } from 'gsap';

const scope = document.querySelector('#your-scope');
const btns = Array.from(scope.querySelectorAll('.mb-btn'));

const api = btns.map((el) => ({
  x: gsap.quickTo(el, 'x', { duration: ${p.spring}, ease: 'power2.out', overwrite: 'auto' }),
  y: gsap.quickTo(el, 'y', { duration: ${p.spring}, ease: 'power2.out', overwrite: 'auto' }),
  r: gsap.quickTo(el, 'rotate', { duration: ${p.spring}, ease: 'power2.out', overwrite: 'auto' })
}));

function onMove(e) {
  for (let i = 0; i < btns.length; i++) {
    const el = btns[i];
    const a = api[i];
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const dx = e.clientX - cx, dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist < ${p.radius}) {
      const t = 1 - dist / ${p.radius};
      const k = t * ${p.strength};
      a.x((dx / (dist || 1)) * k);
      a.y((dy / (dist || 1)) * k);
      a.r((dx / ${p.radius}) * ${p.tilt});
    } else {
      a.x(0); a.y(0); a.r(0);
    }
  }
}

function onLeave() {
  for (let i = 0; i < api.length; i++) {
    const a = api[i];
    a.x(0); a.y(0); a.r(0);
  }
}

scope.addEventListener('mousemove', onMove);
scope.addEventListener('mouseleave', onLeave);`,
        previewHeight: 220
    }
];
