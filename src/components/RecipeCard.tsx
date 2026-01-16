import React, { useMemo } from 'react';
import { Recipe } from '../types';
import { Clock, Flame, Utensils } from 'lucide-react';

interface RecipeCardProps {
    recipe: Recipe;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
    const imageUrl = useMemo(() => {
        const seed = recipe.name.replace(/\s/g, '').length + recipe.cuisine.length;
        return `https://picsum.photos/seed/${seed}/400/250`;
    }, [recipe.name, recipe.cuisine]);

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-slate-100 group">
            <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <img
                    src={imageUrl}
                    alt={recipe.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-slate-700 shadow-sm">
                    {recipe.cuisine}
                </div>
            </div>

            <div className="p-5 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-slate-800 leading-tight">{recipe.name}</h3>
                </div>

                <p className="text-slate-600 text-sm mb-4 line-clamp-3">{recipe.description}</p>

                <div className="flex gap-4 mb-4 text-xs font-medium text-slate-500 border-y border-slate-100 py-3">
                    <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-orange-500" />
                        {recipe.cookingTime}
                    </div>
                    <div className="flex items-center gap-1">
                        <Flame className="h-4 w-4 text-red-500" />
                        {recipe.calories}
                    </div>
                </div>

                <div className="mb-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Key Ingredients</h4>
                    <div className="flex flex-wrap gap-1.5">
                        {recipe.ingredients.map((ingredient, idx) => (
                            <span key={idx} className="inline-block bg-slate-100 text-slate-600 text-[10px] px-2 py-1 rounded-md">
                                {ingredient}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mt-auto bg-amber-50 p-3 rounded-lg border border-amber-100">
                    <p className="text-xs text-amber-800 italic">
                        <span className="font-bold not-italic">Chef's Tip:</span> {recipe.tips}
                    </p>
                </div>
            </div>
        </div>
    );
};
