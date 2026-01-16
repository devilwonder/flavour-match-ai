import { GoogleGenAI, Type } from '@google/genai';
import { Recipe } from '../types';

export class GeminiService {
    private ai: GoogleGenAI;

    constructor(apiKey: string) {
        this.ai = new GoogleGenAI({ apiKey });
    }

    async getRecommendations(
        dietary: string[],
        cuisine: string[],
        ingredients: string,
        mood: string
    ): Promise<Recipe[]> {
        const model = 'gemini-3.0-alpha'; // Switched to experimental 3.0 preview

        let prompt = `Recommend 3 distinct and delicious meals based on the following preferences:\n`;
        if (dietary.length) prompt += `- Dietary Restrictions: ${dietary.join(', ')}\n`;
        if (cuisine.length) prompt += `- Preferred Cuisines: ${cuisine.join(', ')}\n`;
        if (ingredients) prompt += `- Ingredients on hand: ${ingredients}\n`;
        if (mood) prompt += `- Current Mood/Craving: ${mood}\n`;

        prompt += `\nMake the descriptions appetizing. Provide realistic cooking times and calorie estimates.`;

        const schema = {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    description: { type: Type.STRING },
                    cuisine: { type: Type.STRING },
                    cookingTime: { type: Type.STRING },
                    calories: { type: Type.STRING },
                    ingredients: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING }
                    },
                    tips: { type: Type.STRING }
                },
                required: ["name", "description", "cuisine", "cookingTime", "calories", "ingredients", "tips"]
            }
        };

        try {
            const response = await this.ai.models.generateContent({
                model: model,
                contents: prompt,
                config: {
                    responseMimeType: 'application/json',
                    responseSchema: schema,
                    temperature: 0.7
                }
            });

            const text = response.text;
            if (!text) return [];

            return JSON.parse(text) as Recipe[];
        } catch (error) {
            console.error('Error generating recommendations:', error);
            throw error;
        }
    }
}

// Singleton instance helper
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
    console.warn('VITE_GEMINI_API_KEY is missing in your environment variables.');
}
export const geminiService = new GeminiService(apiKey || '');
