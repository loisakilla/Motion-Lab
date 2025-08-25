import React from 'react';
import type { Control } from '@/features/recipes/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


type Props = {
    schema: Control[];
    params: Record<string, any>;
    onChange: (key: string, value: any) => void;
};


export function Controls({ schema, params, onChange }: Props) {
    return (
        <div className="grid grid-cols-2 gap-3">
            {schema.map((c) => {
                if (c.type === 'range') {
                    return (
                        <label key={c.key} className="flex flex-col gap-1 text-xs text-white/70">
                            <span className="flex justify-between">
                                <span>{c.label}</span>
                                <span className="tabular-nums text-white/90">{params[c.key]}</span>
                            </span>
                            <input
                                type="range"
                                min={c.min}
                                max={c.max}
                                step={c.step ?? 0.1}
                                value={params[c.key]}
                                onChange={(e) => onChange(c.key, Number(e.target.value))}
                            />
                        </label>
                    );
                }
                if (c.type === 'select') {
                    return (
                        <div key={c.key} className="flex flex-col gap-1 text-xs text-white/70">
                            <span>{c.label}</span>
                            <Select value={params[c.key]} onValueChange={(v) => onChange(c.key, v)}>
                                <SelectTrigger className="h-9">
                                    <SelectValue placeholder={c.options[0]} />
                                </SelectTrigger>
                                <SelectContent>
                                    {c.options.map((o) => (
                                        <SelectItem key={o} value={o}>
                                            {o}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    );
                }
                return null;
            })}
        </div>
    );
}