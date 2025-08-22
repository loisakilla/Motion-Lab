import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import {Button} from "@/components/button";
import { MotionToggle } from "@/app/layouts/MotionToggle";


export const RootLayout: React.FC = () => {
    return (
        <div className="min-h-dvh bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
            <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur supports-[backdrop-filter]:bg-black/30">
                <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
                    <NavLink to="/" className="font-semibold tracking-tight text-lg">
                        Motion <span className="text-[hsl(var(--primary))]">Lab</span>
                    </NavLink>
                    <nav className="flex items-center gap-2">
                        <MotionToggle />
                        <NavLink to="/" className={({isActive}) => `px-3 py-1.5 rounded-md text-sm ${isActive ? "bg-white/10" : "hover:bg-white/5"}`}>Home</NavLink>
                        <Button variant="ghost" size="sm" asChild>
                            <a href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
                        </Button>
                    </nav>
                </div>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
};