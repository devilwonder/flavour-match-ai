import React from 'react';
import { Recipe } from '../types';
import { X, Clock, Flame, ChefHat, CheckCircle2, List, BookOpen } from 'lucide-react';

interface RecipeModalProps {
    recipe: Recipe;
    onClose: () => void;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, onClose }) => {
    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            />

            <div className="relative bg-white w-full max-w-3xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-8 duration-500">
                {/* Modal Header */}
                <div className="p-6 md:p-8 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
                    <div>
                        <div className="flex gap-2 mb-2">
                            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                                {recipe.cuisine}
                            </span>
                        </div>
                        <h2 className="text-3xl font-extrabold text-slate-900 leading-tight mb-2">
                            {recipe.name}
                        </h2>
                        <div className="flex gap-4 text-sm font-bold text-slate-500">
                            <div className="flex items-center gap-1.5">
                                <Clock className="h-4 w-4 text-orange-500" />
                                {recipe.cookingTime}
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Flame className="h-4 w-4 text-red-500" />
                                {recipe.calories}
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                    >
                        <X className="h-6 w-6 text-slate-400" />
                    </button>
                </div>

                {/* Modal Content */}
                <div className="flex-grow overflow-y-auto p-6 md:p-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* Ingredients List */}
                        <div className="md:col-span-1">
                            <div className="flex items-center gap-2 mb-4">
                                <List className="h-5 w-5 text-orange-600" />
                                <h3 className="text-lg font-bold text-slate-900 uppercase tracking-wide">Ingredients</h3>
                            </div>
                            <ul className="space-y-3">
                                {recipe.ingredients.map((item, idx) => (
                                    <li key={idx} className="flex gap-3 text-sm text-slate-600 font-medium">
                                        <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-8 bg-amber-50 p-4 rounded-2xl border border-amber-100">
                                <div className="flex items-center gap-2 mb-2 text-amber-800">
                                    <ChefHat className="h-4 w-4" />
                                    <span className="text-xs font-bold uppercase tracking-wider">Chef's Tip</span>
                                </div>
                                <p className="text-sm text-amber-900/80 italic font-medium leading-relaxed">
                                    {recipe.tips}
                                </p>
                            </div>
                        </div>

                        {/* Instructions List */}
                        <div className="md:col-span-2">
                            <div className="flex items-center gap-2 mb-6 text-slate-900 border-b border-slate-100 pb-2">
                                <div className="bg-orange-600 text-white p-1 rounded-lg">
                                    <BookOpen className="h-4 w-4" />
                                </div>
                                <h3 className="text-lg font-bold uppercase tracking-wide">Process</h3>
                            </div>
                            <div className="space-y-8">
                                {recipe.instructions.map((step, idx) => (
                                    <div key={idx} className="flex gap-4 group">
                                        <div className="flex flex-col items-center">
                                            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-bold shrink-0 shadow-lg group-hover:bg-orange-600 transition-colors">
                                                {idx + 1}
                                            </div>
                                            {idx !== recipe.instructions.length - 1 && (
                                                <div className="w-0.5 grow bg-slate-100 my-2" />
                                            )}
                                        </div>
                                        <div className="pb-4">
                                            <p className="text-slate-700 font-medium leading-relaxed">
                                                {step}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 bg-slate-50 border-t border-slate-100 text-center">
                    <button
                        onClick={onClose}
                        className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-black transition-all shadow-lg shadow-slate-200"
                    >
                        Got it, thanks!
                    </button>
                </div>
            </div>
        </div>
    );
};
