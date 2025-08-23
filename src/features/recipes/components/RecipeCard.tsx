import React, { useMemo, useState } from 'react';
import type { Recipe } from '@/features/recipes/types';

import { Badge } from '@/components/ui/badge';
import { Controls } from '@/features/recipes/components/Controls';
import { RecipeDemoFrame } from '@/features/recipes/components/RecipeDemoFrame';
import { Heart } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { toggleFavorite } from '@/features/recipes/store/recipesSlice';
import {recipes} from "@/features/recipes/data/recipes";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/card";

export const RecipeCard: React.FC<{ recipe: Recipe}> = ({ recipe }) => {
    const dispatch = useAppDispatch();
    const  favs = useAppSelector(s => s.recipes.favorites);
    const isFav =favs.includes(recipe.id);

    const initialParams = useMemo(() =>
        Object.fromEntries(
            recipe.controls.map(c => [c.key, (c as any).default])),
        [recipe.controls]
    );
    const [params, setParams] = useState<Record<string, any>>(initialParams);

    return (
        <Card className="overflow-hidden">
            <CardHeader className="flex items-start justify-between">
                <div>
                    <CardTitle>{recipe.title}</CardTitle>
                    <div className="mt-2 flex flex-wrap gap-2">
                        <Badge>{recipe.difficulty}</Badge>
                        {recipe.tags.map(t => <Badge key={t} className="text-white/70">#{t}</Badge>)}
                    </div>
                </div>
                <button
                    aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
                    onClick={() => dispatch(toggleFavorite(recipe.id))}
                    className={`p-2 rounded-xl border border-white/10 ${isFav ? 'bg-pink-500/20 text-pink-300' : 'bg-white/5 hover:bg-white/10'}`}
                >
                    <Heart size={18} fill={isFav ? 'currentColor' : 'none'} />
                </button>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-sm text-white/70">{recipe.description}</p>
                <RecipeDemoFrame recipe={recipe} params={params} />
                <Controls schema={recipe.controls} params={params} onChange={(k, v) => setParams(p => ({ ...p, [k]: v }))} />
            </CardContent>
        </Card>
    );
};