import { useMemo } from 'react';
import { gsap } from 'gsap';

export const useGsapContext = (scope?: React.RefObject<HTMLElement | null>) => {
  // Привязываем контекст к React ref (даже если current = null на 1-й рендер)
  const ctx = useMemo(
    () => gsap.context(() => {}, scope as unknown as HTMLElement | undefined),
    [scope]
  );
  return { ctx, gsap } as const;
};
