
import React from 'react';
import { DayPlan } from '../types';
import RecipeCard from './RecipeCard';

interface MealPlanDisplayProps {
  days: DayPlan[];
}

const DAY_COLORS = [
  { bg: 'bg-pink-500', text: 'text-pink-600', light: 'bg-pink-50' },
  { bg: 'bg-blue-500', text: 'text-blue-600', light: 'bg-blue-50' },
  { bg: 'bg-green-500', text: 'text-green-600', light: 'bg-green-50' },
  { bg: 'bg-yellow-500', text: 'text-yellow-600', light: 'bg-yellow-50' },
  { bg: 'bg-purple-500', text: 'text-purple-600', light: 'bg-purple-50' },
  { bg: 'bg-orange-500', text: 'text-orange-600', light: 'bg-orange-50' },
  { bg: 'bg-rose-500', text: 'text-rose-600', light: 'bg-rose-50' },
];

const MealPlanDisplay: React.FC<MealPlanDisplayProps> = ({ days }) => {
  return (
    <div className="space-y-16">
      {days.map((dayPlan, index) => {
        const color = DAY_COLORS[index % DAY_COLORS.length];
        return (
          <section key={index} className="relative group">
            <div className="flex items-center gap-5 mb-8">
              <div className={`${color.bg} text-white w-16 h-16 rounded-[1.5rem] flex items-center justify-center font-black text-2xl shadow-xl border-4 border-white rotate-3 group-hover:rotate-0 transition-transform`}>
                {index + 1}
              </div>
              <div className="bg-white px-6 py-3 rounded-3xl shadow-sm border-2 border-gray-100">
                <h3 className="text-3xl font-black text-gray-800 tracking-tight">{dayPlan.day}</h3>
                <p className={`${color.text} font-black uppercase text-xs tracking-[0.2em]`}>Movie Vibe: {dayPlan.recipe.theme}</p>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="relative">
                <div className="absolute -top-4 -left-4 z-10 bg-black text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">Main Course</div>
                <RecipeCard recipe={dayPlan.recipe} index={index} />
              </div>
              
              {dayPlan.dessert && (
                <div className="relative mt-8 ml-8 sm:ml-12">
                  <div className="absolute -top-4 -left-4 z-10 bg-yellow-500 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                    <i className="fa-solid fa-ice-cream mr-1"></i> Magical Dessert
                  </div>
                  <RecipeCard recipe={{...dayPlan.dessert, isDessert: true}} index={index + 1} />
                </div>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default MealPlanDisplay;
