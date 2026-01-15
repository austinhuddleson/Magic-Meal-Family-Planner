
import React, { useState, useCallback } from 'react';
import { 
  DietaryRestriction, 
  TimeLimit, 
  PlannerPreferences, 
  MealPlan,
  DayPlan
} from './types';
import { generateMealPlan } from './geminiService';
import PreferencesForm from './components/PreferencesForm';
import MealPlanDisplay from './components/MealPlanDisplay';
import ShoppingList from './components/ShoppingList';
import Header from './components/Header';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'plan' | 'list'>('plan');

  const handleGenerate = async (prefs: PlannerPreferences) => {
    setLoading(true);
    setError(null);
    try {
      const plan = await generateMealPlan(prefs);
      setMealPlan(plan);
      setActiveTab('plan');
    } catch (err: any) {
      console.error(err);
      setError("Oops! The magic wand slipped. Let's try generating that again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-50/30 pb-20">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        {!mealPlan && !loading && (
          <div className="flex flex-col items-center">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl w-full max-w-2xl border-4 border-yellow-200/50">
              <h2 className="text-3xl font-black mb-6 text-center">
                <span className="text-pink-500">Plan</span>{" "}
                <span className="text-blue-500">Your</span>{" "}
                <span className="text-green-500">Week</span>{" "}
                <span className="text-purple-500">of</span>{" "}
                <span className="text-orange-500">Magic</span>
              </h2>
              <PreferencesForm onGenerate={handleGenerate} />
            </div>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-6 bg-white rounded-3xl shadow-md border-b-8 border-orange-400 transform hover:scale-105 transition-transform">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <i className="fa-solid fa-wand-magic-sparkles text-3xl text-orange-500"></i>
                </div>
                <h3 className="font-black text-lg text-gray-800 uppercase tracking-tight">Themed Recipes</h3>
                <p className="text-gray-600 text-sm mt-2">Disney, Pixar, and more fun movie-inspired meals.</p>
              </div>
              <div className="p-6 bg-white rounded-3xl shadow-md border-b-8 border-blue-400 transform hover:scale-105 transition-transform">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <i className="fa-solid fa-child text-3xl text-blue-500"></i>
                </div>
                <h3 className="font-black text-lg text-gray-800 uppercase tracking-tight">Kid-Friendly</h3>
                <p className="text-gray-600 text-sm mt-2">Specific ways for little helpers to join the kitchen fun.</p>
              </div>
              <div className="p-6 bg-white rounded-3xl shadow-md border-b-8 border-green-400 transform hover:scale-105 transition-transform">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <i className="fa-solid fa-basket-shopping text-3xl text-green-500"></i>
                </div>
                <h3 className="font-black text-lg text-gray-800 uppercase tracking-tight">Smart Shopping</h3>
                <p className="text-gray-600 text-sm mt-2">Grocery lists organized by store aisle to save you time.</p>
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative w-32 h-32 mb-8">
              <div className="absolute inset-0 border-8 border-pink-200 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 border-t-8 border-blue-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <i className="fa-solid fa-hat-wizard text-4xl text-purple-500 animate-bounce"></i>
              </div>
            </div>
            <h3 className="text-3xl font-black text-gray-800 text-center px-4">Whipping up your <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">magical menu</span>...</h3>
            <p className="text-gray-500 mt-4 font-bold text-lg">Consulting with the master chefs!</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-4 border-red-200 text-red-600 p-6 rounded-[2rem] mb-8 flex items-center gap-4 shadow-lg">
            <i className="fa-solid fa-face-frown text-3xl"></i>
            <p className="font-bold text-lg">{error}</p>
          </div>
        )}

        {mealPlan && !loading && (
          <div>
            <div className="flex justify-between items-center mb-10 flex-wrap gap-6 bg-white/50 p-6 rounded-[2.5rem] backdrop-blur-sm border-2 border-white">
              <div className="flex-1 min-w-[200px]">
                <h2 className="text-4xl font-black text-gray-800 drop-shadow-sm">{mealPlan.title}</h2>
                <p className="text-purple-600 font-black text-lg tracking-wide uppercase italic mt-1">Ready for an Adventure?</p>
              </div>
              <div className="flex bg-white rounded-2xl shadow-xl p-1.5 border-4 border-indigo-100">
                <button 
                  onClick={() => setActiveTab('plan')}
                  className={`px-8 py-3 rounded-xl font-black text-lg transition-all ${activeTab === 'plan' ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg scale-105' : 'text-gray-400 hover:text-pink-500'}`}
                >
                  <i className="fa-solid fa-calendar-star mr-2"></i> Plan
                </button>
                <button 
                  onClick={() => setActiveTab('list')}
                  className={`px-8 py-3 rounded-xl font-black text-lg transition-all ${activeTab === 'list' ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg scale-105' : 'text-gray-400 hover:text-blue-500'}`}
                >
                  <i className="fa-solid fa-cart-flatbed mr-2"></i> List
                </button>
              </div>
              <button 
                onClick={() => setMealPlan(null)}
                className="text-orange-500 hover:text-orange-700 font-black flex items-center gap-2 text-sm uppercase tracking-widest border-2 border-orange-200 px-4 py-2 rounded-full hover:bg-orange-50 transition-colors"
              >
                <i className="fa-solid fa-sparkles"></i> New Magic
              </button>
            </div>

            {activeTab === 'plan' ? (
              <MealPlanDisplay days={mealPlan.days} />
            ) : (
              <ShoppingList days={mealPlan.days} />
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
