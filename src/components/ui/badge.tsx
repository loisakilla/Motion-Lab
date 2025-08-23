import * as React from 'react';
import { cn } from '@/shared/lib/utils';


export const Badge = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
    <span className={cn('inline-flex items-center rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-xs', className)} {...props} />
);