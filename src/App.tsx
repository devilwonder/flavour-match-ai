import React, { useState } from 'react';
import { Recipe } from './types';
import { geminiService } from './services/gemini';
import { RecipeCard } from './components/RecipeCard';
import { RecipeModal } from './components/RecipeModal';
import {
    Utensils,
    Search,
    RefreshCw,
    AlertCircle,
    BookOpen,
    ChefHat,
    Sparkles
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const CUISINES = ['Italian', 'Mexican', 'Indian', 'Japanese', 'Mediterranean', 'American', 'Thai', 'French'];
const DIETARY = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Keto', 'Paleo', 'Dairy-Free', 'High Protein'];

export default function App() {
    const [ingredients, setIngredients] = useState('');
    const [mood, setMood] = useState('');
    const [selectedCuisines, setSelectedCuisines] = useState<Set<string>>(new Set());
    const [selectedDietary, setSelectedDietary] = useState<Set<string>>(new Set());

    const [recommendations, setRecommendations] = useState<Recipe[]>([]);
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const toggleCuisine = (cuisine: string) => {
        const next = new Set(selectedCuisines);
        if (next.has(cuisine)) next.delete(cuisine);
        else next.add(cuisine);
        setSelectedCuisines(next);
    };

    const toggleDietary = (diet: string) => {
        const next = new Set(selectedDietary);
        if (next.has(diet)) next.delete(diet);
        else next.add(diet);
        setSelectedDietary(next);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setHasSearched(true);
        setRecommendations([]);

        try {
            if (!import.meta.env.VITE_GEMINI_API_KEY) {
                throw new Error('API Key is missing. Please add VITE_GEMINI_API_KEY to your .env.local file.');
            }
            const results = await geminiService.getRecommendations(
                Array.from(selectedDietary),
                Array.from(selectedCuisines),
                ingredients,
                mood
            );
            setRecommendations(results);
        } catch (err: any) {
            if (err?.message?.includes('429') || err?.message?.includes('quota')) {
                setError('You have exceeded your Gemini API quota. Please wait a few moments or check your API plan at ai.google.dev.');
            } else {
                setError('Failed to generate recommendations. Please try again.');
            }
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const reset = () => {
        setHasSearched(false);
        setRecommendations([]);
        setIngredients('');
        setMood('');
        setSelectedCuisines(new Set());
        setSelectedDietary(new Set());
        setError(null);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div
                        className="flex items-center gap-2 cursor-pointer group"
                        onClick={reset}
                    >
                        <div className="h-10 w-10 relative group-hover:scale-110 transition-transform duration-300">
                            <img src="/pratik_logo.png" alt="FlavorMatch AI Logo" className="h-full w-full object-contain rounded-lg" />
                        </div>
                        <h1 className="text-xl font-bold tracking-tight">
                            FlavorMatch <span className="text-orange-500">AI</span>
                        </h1>
                    </div>
                </div>
            </header>

            <main className="flex-grow flex flex-col items-center justify-start p-4 md:p-8 w-full max-w-7xl mx-auto">

                {/* Hero / Form Section */}
                <div className={cn(
                    "w-full transition-all duration-700 ease-in-out",
                    !hasSearched ? "max-w-3xl mt-12" : "max-w-full mb-12"
                )}>

                    {!hasSearched && (
                        <div className="text-center mb-10 animate-fade-in">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-wider mb-4">
                                <Sparkles className="h-3 w-3" />
                                AI-Powered Recommendations
                            </div>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
                                What are you craving?
                            </h2>
                            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
                                Get personalized recipe recommendations based on your ingredients, mood, and dietary preferences.
                            </p>
                        </div>
                    )}

                    <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                        <div className="p-6 md:p-10">
                            <form onSubmit={handleSubmit}>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                                    {/* Left Column: Inputs */}
                                    <div className="space-y-8">
                                        <div className="group">
                                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3 group-focus-within:text-orange-600 transition-colors">
                                                <BookOpen className="h-4 w-4" />
                                                I have these ingredients...
                                            </label>
                                            <input
                                                type="text"
                                                value={ingredients}
                                                onChange={(e) => setIngredients(e.target.value)}
                                                placeholder="e.g. chicken breast, spinach, lemon"
                                                className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none bg-slate-50/50 focus:bg-white text-slate-800 placeholder:text-slate-400"
                                            />
                                        </div>

                                        <div className="group">
                                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3 group-focus-within:text-orange-600 transition-colors">
                                                <ChefHat className="h-4 w-4" />
                                                I'm in the mood for...
                                            </label>
                                            <input
                                                type="text"
                                                value={mood}
                                                onChange={(e) => setMood(e.target.value)}
                                                placeholder="e.g. something spicy, comfort food, light lunch"
                                                className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none bg-slate-50/50 focus:bg-white text-slate-800 placeholder:text-slate-400"
                                            />
                                        </div>
                                    </div>

                                    {/* Right Column: Filters */}
                                    <div className="space-y-8">
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-4">Cuisines</label>
                                            <div className="flex flex-wrap gap-2">
                                                {CUISINES.map((cuisine) => {
                                                    const isActive = selectedCuisines.has(cuisine);
                                                    return (
                                                        <button
                                                            key={cuisine}
                                                            type="button"
                                                            onClick={() => toggleCuisine(cuisine)}
                                                            className={cn(
                                                                "px-4 py-2 rounded-xl text-sm font-semibold transition-all border shadow-sm",
                                                                isActive
                                                                    ? "bg-orange-500 text-white border-orange-500 shadow-orange-200"
                                                                    : "bg-white text-slate-600 border-slate-200 hover:border-orange-300 hover:bg-orange-50"
                                                            )}
                                                        >
                                                            {cuisine}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-4">Dietary Needs</label>
                                            <div className="flex flex-wrap gap-2">
                                                {DIETARY.map((diet) => {
                                                    const isActive = selectedDietary.has(diet);
                                                    return (
                                                        <button
                                                            key={diet}
                                                            type="button"
                                                            onClick={() => toggleDietary(diet)}
                                                            className={cn(
                                                                "px-4 py-2 rounded-xl text-sm font-semibold transition-all border shadow-sm",
                                                                isActive
                                                                    ? "bg-green-600 text-white border-green-600 shadow-green-200"
                                                                    : "bg-white text-slate-600 border-slate-200 hover:border-green-300 hover:bg-green-50"
                                                            )}
                                                        >
                                                            {diet}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end pt-8 border-t border-slate-100">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="group relative bg-slate-900 hover:bg-black text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-slate-200 hover:shadow-2xl hover:shadow-slate-300 transform active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-3 overflow-hidden"
                                    >
                                        {isLoading ? (
                                            <>
                                                <RefreshCw className="h-5 w-5 animate-spin" />
                                                <span>Finding the perfect match...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Find Recommendations</span>
                                                <Search className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                {hasSearched && (
                    <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <div className="flex justify-between items-end mb-8">
                            <div>
                                <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Your Recommendations</h2>
                                <p className="text-slate-500 font-medium">Curated by AI based on your taste</p>
                            </div>
                            <button
                                onClick={handleSubmit}
                                className="flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors bg-orange-50 px-4 py-2 rounded-xl border border-orange-100"
                            >
                                <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
                                Regenerate
                            </button>
                        </div>

                        {error && (
                            <div className="bg-red-50 text-red-700 p-6 rounded-2xl border border-red-100 mb-10 flex items-center gap-4">
                                <AlertCircle className="h-6 w-6 shrink-0" />
                                <p className="font-semibold">{error}</p>
                            </div>
                        )}

                        {!isLoading && recommendations.length === 0 && !error && (
                            <div className="bg-amber-50 text-amber-800 p-12 rounded-3xl border border-amber-100 mb-10 text-center">
                                <p className="text-xl font-bold mb-2">No recipes found.</p>
                                <p className="opacity-80">Try adjusting your preferences or adding more ingredients!</p>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
                            {isLoading ? (
                                Array.from({ length: 3 }).map((_, i) => (
                                    <div key={i} className="bg-white rounded-2xl shadow-lg p-5 border border-slate-100 h-[32rem] flex flex-col animate-pulse">
                                        <div className="h-48 bg-slate-100 rounded-xl mb-6"></div>
                                        <div className="h-8 bg-slate-100 rounded-lg w-3/4 mb-4"></div>
                                        <div className="h-4 bg-slate-100 rounded-md w-full mb-2"></div>
                                        <div className="h-4 bg-slate-100 rounded-md w-2/3 mb-8"></div>
                                        <div className="mt-auto h-24 bg-slate-50 rounded-xl"></div>
                                    </div>
                                ))
                            ) : (
                                recommendations.map((recipe, idx) => (
                                    <RecipeCard
                                        key={idx}
                                        recipe={recipe}
                                        onClick={() => setSelectedRecipe(recipe)}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                )}
            </main>

            {/* Detail Modal */}
            {selectedRecipe && (
                <RecipeModal
                    recipe={selectedRecipe}
                    onClose={() => setSelectedRecipe(null)}
                />
            )}

            <footer className="w-full py-8 border-t border-slate-200 mt-auto bg-white">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-sm font-medium">
                    <div className="flex items-center gap-2">
                        <span>Built by</span>
                        <a
                            href="https://pratikdev.tech"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-600 hover:text-orange-700 font-bold transition-colors"
                        >
                            Pratik Pandey
                        </a>
                    </div>

                    <div className="flex items-center gap-6">
                        <a
                            href="https://github.com/devilwonder/flavour-match-ai"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:text-slate-900 transition-colors"
                        >
                            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                            GitHub
                        </a>
                        <p>© 2026 FlavorMatch AI</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
