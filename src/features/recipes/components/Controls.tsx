import React from 'react';
import type { Control } from '@/features/recipes/types';

export function Controls({ schema, params, onChange}: {schema: Control[]; params: Record<string, any>; onChange: (k: string, v: any) => void}) {
    return (
        <div className="grid grid-cols-2 gap-3">
            {schema.map((c) => {
                if (c.type === 'range'){
                    return (
                        <label key={c.key} className="flex flex-col gap-1 text-xs text-white/70">
                            <span className="flex justify-between">
                                <span>
                                    {c.label}
                                </span>
                                <span className="tabular-nums text-white/90">
                                    {params[c.key]}
                                </span>
                            </span>
                            <input type="range"
                                   min={c.min}
                                   max={c.max}
                                   step={c.step ?? 0.1}
                                   value={params[c.key]}
                                   onChange={(e) => onChange(c.key, Number(e.target.value))}/>
                        </label>
                    );
                }
                return (
                    <label key={c.key} className="flex flex-col gap-1 text-xs text-white/70">
                        <span>
                            {c.label}
                        </span>
                        <select
                            className="bg-transparent border border-white/10 rounded-lg h-9 px-2 text-sm"
                            value={params[c.key]}
                            onChange={(e) => onChange(c.key, e.target.value)}>
                                {c.options.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                    </label>
                );
            })}
        </div>
    );
}

