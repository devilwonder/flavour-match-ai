# 🍳 FlavorMatch AI

FlavorMatch AI is a premium, AI-powered recipe recommendation engine that helps you decide what to cook based on what's in your fridge and how you're feeling. Powered by **Google Gemini 3.0 Alpha**, it provides personalized, Appetizing, and healthy meal suggestions in seconds.

## ✨ Features

- **Smart Ingredients Matching**: Enter whatever you have on hand, and let the AI find the perfect dish.
- **Mood-Based Suggestions**: Craving something spicy? Or a light lunch? Just tell the AI your mood.
- **Dietary & Cuisine Filters**: Filter by popular cuisines (Italian, Indian, Japanese, etc.) and dietary needs (Vegan, Keto, Gluten-Free, etc.).
- **Chef's Tips**: Every recommendation comes with a unique "Chef's Tip" for culinary success.
- **Premium UI/UX**: Built with a modern, glassmorphic aesthetic using the **Outfit** and **Playfair Display** font families.
- **Responsive Design**: Seamless experience across mobile, tablet, and desktop.

## 🚀 Tech Stack

- **Frontend**: [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **AI Engine**: [Google Gemini 3.0 Alpha](https://ai.google.dev/)
- **Fonts**: Outfit (Sans) & Playfair Display (Serif) via Google Fonts

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- A Google Gemini API Key (Get one at [Google AI Studio](https://aistudio.google.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/devilwonder/flavour-match-ai.git
   cd flavour-match-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory and add your API key:
   ```env
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

4. **Run the application**
   ```bash
   npm start
   # or
   npm run dev
   ```

## 📦 Building for Production

To create an optimized production build:

```bash
npm run build
```

The output will be in the `dist/` directory.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by [DevilWonder](https://github.com/devilwonder)
