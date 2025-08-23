import React, { useMemo } from 'react';
import { recipes } from '@/features/recipes/data/recipes';
import { RecipeCard } from '@/features/recipes/components/RecipeCard';
import { Input } from '@/components/ui/input';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { clearTags, setOnlyFav, setSearch, toggleTag } from '@/features/recipes/store/recipesSlice';


export const RecipesPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { favorites, search, tags, onlyFav } = useAppSelector(s => s.recipes);
    const allTags = useMemo(() => Array.from(new Set(recipes.flatMap(r => r.tags))), []);


    const list = useMemo(() => {
        return recipes.filter(r => {
            if (onlyFav && !favorites.includes(r.id)) return false;
            if (search && !(`${r.title} ${r.description} ${r.tags.join(' ')}`.toLowerCase().includes(search.toLowerCase()))) return false;
            if (tags.length && !tags.every(t => r.tags.includes(t))) return false;
            return true;
        });
    }, [favorites, onlyFav, search, tags]);


    return (
        <section className="mx-auto max-w-6xl px-4 py-10">
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Recipes</h1>
                <div className="flex items-center gap-3">
                    <Input placeholder="Search…" value={search} onChange={e => dispatch(setSearch(e.target.value))} className="w-64" />
                    <label className="flex items-center gap-2 text-sm text-white/80">
                        <input type="checkbox" checked={onlyFav} onChange={e => dispatch(setOnlyFav(e.target.checked))} />
                        Only favorites
                    </label>
                </div>
            </div>


            <div className="mb-6 flex flex-wrap items-center gap-2">
                {allTags.map(t => (
                    <button key={t} onClick={() => dispatch(toggleTag(t))} className={`text-xs px-3 py-1.5 rounded-full border ${tags.includes(t) ? 'bg-white/20 border-white/20' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>#{t}</button>
                ))}
                {!!tags.length && (
                    <button onClick={() => dispatch(clearTags())} className="text-xs px-3 py-1.5 rounded-full bg-transparent border border-white/10 hover:bg-white/10">Clear</button>
                )}
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {list.map(r => <RecipeCard key={r.id} recipe={r} />)}
            </div>
        </section>
    );
};