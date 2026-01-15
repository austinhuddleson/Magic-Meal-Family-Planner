
import React from 'react';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  index: number;
}

const GRADIENTS = [
  'from-pink-400 to-rose-600',
  'from-blue-400 to-indigo-600',
  'from-green-400 to-emerald-600',
  'from-yellow-400 to-orange-600',
  'from-purple-400 to-violet-600',
];

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, index }) => {
  const gradient = GRADIENTS[index % GRADIENTS.length];
  
  return (
    <div className="bg-white rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white flex flex-col lg:flex-row transform hover:-translate-y-1 transition-all duration-300">
      {/* Visual Header/Sidebar */}
      <div className={`lg:w-1/3 bg-gradient-to-br ${gradient} p-10 text-white flex flex-col justify-between relative overflow-hidden`}>
        {/* Background Sparkle Effect */}
        <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
          <i className="fa-solid fa-sparkles text-[10rem] rotate-12"></i>
        </div>
        
        <div className="relative z-10">
          <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-white/30">
            <i className="fa-solid fa-film mr-2"></i> {recipe.movieReference}
          </span>
          <h4 className="text-4xl font-black mb-4 leading-[1.1] drop-shadow-md">{recipe.name}</h4>
          <p className="text-white text-lg font-medium italic mb-8 leading-relaxed opacity-90 border-l-4 border-white/50 pl-4">
            "{recipe.description}"
          </p>
        </div>
        <div className="flex flex-wrap gap-3 items-center relative z-10">
          <div className="bg-black/10 backdrop-blur-sm px-5 py-2.5 rounded-2xl flex items-center gap-3 border border-white/20">
            <i className="fa-solid fa-clock-rotate-left"></i>
            <span className="text-sm font-black">{recipe.prepTime} + {recipe.cookTime}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:w-2/3 p-10 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Ingredients Section */}
          <div>
            <h5 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-3 uppercase tracking-tighter">
              <span className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-500">
                <i className="fa-solid fa-basket-shopping text-lg"></i>
              </span> 
              Basket Items
            </h5>
            <ul className="space-y-3">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="text-gray-600 font-bold text-sm flex justify-between border-b-2 border-dashed border-gray-100 pb-2 hover:border-orange-200 transition-colors">
                  <span>{ing.name}</span>
                  <span className="bg-gray-50 px-2 py-0.5 rounded text-gray-400 text-xs">{ing.amount}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Kids Help Section - SPECIAL UI */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-[2.5rem] p-8 border-4 border-blue-100 shadow-inner relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <i className="fa-solid fa-hand-holding-heart text-5xl"></i>
            </div>
            
            <h5 className="text-xl font-black text-blue-800 mb-6 flex items-center gap-3 uppercase tracking-tighter">
              <span className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white">
                <i className="fa-solid fa-child-reaching text-lg"></i>
              </span>
              Kid's Mission
            </h5>
            <div className="space-y-4">
              {recipe.kidsHelp.map((task, i) => (
                <div key={i} className="flex gap-4 items-start group">
                  <div className="mt-1 flex-shrink-0 w-7 h-7 bg-white text-blue-600 rounded-lg shadow-sm flex items-center justify-center text-xs font-black border-2 border-blue-200 group-hover:scale-110 transition-transform">
                    {i + 1}
                  </div>
                  <p className="text-blue-900 font-bold text-sm leading-relaxed">{task}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t-2 border-blue-200 text-[11px] text-blue-400 uppercase tracking-[0.2em] font-black text-center italic">
              Magic needs an adult helper too! 🪄
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-12 bg-gray-50/50 p-8 rounded-[2.5rem] border-2 border-gray-100">
          <h5 className="text-xl font-black text-gray-800 mb-8 flex items-center gap-3 uppercase tracking-tighter">
            <span className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white">
              <i className="fa-solid fa-utensils text-lg"></i>
            </span>
            Cooking Steps
          </h5>
          <ol className="space-y-6">
            {recipe.instructions.map((step, i) => (
              <li key={i} className="flex gap-6 group">
                <span className="flex-shrink-0 w-10 h-10 rounded-2xl bg-white border-2 border-green-200 text-green-600 font-black flex items-center justify-center shadow-sm group-hover:bg-green-500 group-hover:text-white group-hover:border-green-500 transition-all">
                  {i + 1}
                </span>
                <p className="text-gray-700 font-medium leading-relaxed pt-1.5">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
