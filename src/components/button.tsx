import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/shared/lib/utils";


const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-black",
    {
        variants: {
            variant: {
                default: "bg-[hsl(var(--primary))] text-black hover:opacity-90",
                outline: "border border-white/20 bg-transparent hover:bg-white/10",
                ghost: "bg-transparent hover:bg-white/10"
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-lg px-3",
                lg: "h-11 rounded-xl px-6"
            }
        },
        defaultVariants: { variant: "default", size: "default" }
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props}, ref) => {
        const Comp: any = asChild ? Slot : "button";
        return <Comp ref={ref} className={cn(buttonVariants({variant, size}), className)} {...props} />
    }
);
Button.displayName = "Button";