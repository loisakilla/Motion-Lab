import type { FC } from 'react';


export type ControlRange = {
    type: 'range'; key: string; label: string; min: number; max: number; step?: number; default: number;
};
export type ControlSelect = { type: 'select'; key: string; label: string; options: string[]; default: string };
export type Control = ControlRange | ControlSelect;


export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';


export type Recipe = {
    id: string;
    title: string;
    description: string;
    difficulty: Difficulty;
    tags: string[];
    htmlgen?: (params: Record<string, any>) => string;
    controls: Control[];
    render: FC; // DOM демо (внутренняя разметка)
    runtime: (g: GSAP, scope: HTMLElement, params: Record<string, any>) => GSAPTimeline;
    codegen: (params: Record<string, any>) => string;
    previewHeight?: number; // px
};