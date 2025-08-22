import { useMemo } from "react";
import { gsap } from "gsap";


export const useGsapContext = (scope?: React.RefObject<HTMLElement | null>) => {
// gsap.context помогает автоматически снимать все эффекты при unmount
    const ctx = useMemo(() => gsap.context(() => {}, scope?.current || undefined), [scope?.current]);
    return { ctx, gsap } as const;
};