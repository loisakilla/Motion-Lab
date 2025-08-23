import * as React from 'react';
import { cn } from '@/shared/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({className, ...props}, ref) => (
    <input ref={ref} className={cn('flex h-10 w-full rounded-xl border border-white/10 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-white/20', className)} {...props}/>
));
Input.displayName = 'Input';