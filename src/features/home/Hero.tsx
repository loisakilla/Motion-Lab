import React, { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/shared/hooks/useIsomorphicLayoutEffect';
import { useGsapContext } from '@/shared/hooks/useGsapContext';

import { shouldReduceMotion } from '@/shared/lib/motion';
import { Button } from '@/components/ui/button';
import {Link} from "react-router-dom";

const title = 'Craft Motion with GSAP';
const subtitle = 'A tiny lab to build, tweak and export delightful animations.';

export const Hero: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const { ctx, gsap } = useGsapContext(rootRef);

  useIsomorphicLayoutEffect(() => {
    if (shouldReduceMotion()) return; // Graceful degrade (pref + manual toggle)

    const letters = gsap.utils.toArray<HTMLElement>('[data-letter]', rootRef.current || undefined);
    const subtitleEl = rootRef.current?.querySelector<HTMLElement>('[data-subtitle]') || null;
    const cta = rootRef.current?.querySelector<HTMLElement>('[data-cta]') || null;
    if (!subtitleEl || !cta) return; // безопасность типов

    ctx.add(() => {
      const tl = gsap.timeline();
      tl.from(letters, {
        yPercent: 120,
        opacity: 0,
        stagger: 0.02,
        ease: 'power4.out',
        duration: 0.8,
      })
        .from(subtitleEl, { y: 12, opacity: 0, duration: 0.6 }, '<0.1')
        .from(cta, { y: 8, opacity: 0, duration: 0.6 }, '<0.05');
    });

    return () => ctx.revert();
  }, [ctx, gsap]);

  return (
    <section ref={rootRef} className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:py-28 md:py-32">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">
          {title.split('').map((ch, i) => (
            <span key={i} data-letter className="inline-block will-change-transform">
              {ch === ' ' ? ' ' : ch}
            </span>
          ))}
        </h1>
        <p data-subtitle className="mt-5 text-base sm:text-lg md:text-xl text-white/70 max-w-2xl">
          {subtitle}
        </p>
        <div data-cta className="mt-8 flex gap-3">
          <Button asChild>
            <Link to="/playground">Get Started</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/recipes">View Recipes</Link>
          </Button>
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(60%_60%_at_50%_40%,#000_20%,transparent_60%)]"
      >
        <div className="absolute -top-32 -left-32 size-[32rem] rounded-full bg-[hsl(var(--primary))] blur-[120px]"></div>
        <div className="absolute -bottom-24 -right-24 size-[28rem] rounded-full bg-indigo-600 blur-[120px]"></div>
      </div>
    </section>
  );
};
