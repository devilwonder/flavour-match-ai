import React from 'react';
import { Recipe } from '../types';
import { Clock, Flame, BookOpen } from 'lucide-react';

interface RecipeCardProps {
    recipe: Recipe;
    onClick: () => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full border border-slate-100 group cursor-pointer overflow-hidden transform hover:-translate-y-1"
        >
            <div className="p-6 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-4">
                    <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        {recipe.cuisine}
                    </span>
                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                        <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {recipe.cookingTime}
                        </div>
                        <div className="flex items-center gap-1">
                            <Flame className="h-4 w-4" />
                            {recipe.calories}
                        </div>
                    </div>
                </div>

                <h3 className="text-2xl font-extrabold text-slate-800 leading-tight mb-3 group-hover:text-orange-600 transition-colors">
                    {recipe.name}
                </h3>

                <p className="text-slate-600 font-medium text-sm mb-6 line-clamp-3">
                    {recipe.description}
                </p>

                <div className="mb-6">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Key Ingredients</h4>
                    <div className="flex flex-wrap gap-1.5">
                        {recipe.ingredients.slice(0, 5).map((ingredient, idx) => (
                            <span key={idx} className="inline-block bg-slate-50 text-slate-600 text-[10px] px-2 py-1.5 rounded-lg border border-slate-100 font-semibold text-center">
                                {ingredient}
                            </span>
                        ))}
                        {recipe.ingredients.length > 5 && (
                            <span className="inline-block text-[10px] text-slate-400 font-bold px-2 py-1.5">
                                +{recipe.ingredients.length - 5} more
                            </span>
                        )}
                    </div>
                </div>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
                    <div className="bg-amber-50/50 p-2 rounded-lg flex-grow mr-4">
                        <p className="text-[11px] text-amber-800 italic line-clamp-2">
                            <span className="font-bold not-italic">Chef's Tip:</span> {recipe.tips}
                        </p>
                    </div>
                    <div className="bg-slate-900 text-white p-2 rounded-xl group-hover:bg-orange-500 transition-colors">
                        <BookOpen className="h-4 w-4" />
                    </div>
                </div>
            </div>
        </div>
    );
};
