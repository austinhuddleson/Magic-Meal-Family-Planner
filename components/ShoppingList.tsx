
import React, { useMemo, useState } from 'react';
import { DayPlan, Ingredient } from '../types';

interface ShoppingListProps {
  days: DayPlan[];
}

const SECTION_COLORS: Record<string, string> = {
  'Produce': 'text-green-500 border-green-500 bg-green-50',
  'Meat': 'text-red-500 border-red-500 bg-red-50',
  'Dairy': 'text-blue-500 border-blue-500 bg-blue-50',
  'Pantry': 'text-orange-500 border-orange-500 bg-orange-50',
  'Frozen': 'text-cyan-500 border-cyan-500 bg-cyan-50',
  'Bakery': 'text-yellow-600 border-yellow-600 bg-yellow-50',
  'General': 'text-purple-500 border-purple-500 bg-purple-50',
};

const ShoppingList: React.FC<ShoppingListProps> = ({ days }) => {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const groupedIngredients = useMemo(() => {
    const sections: Record<string, Ingredient[]> = {};
    
    days.forEach(day => {
      // Add recipe ingredients
      day.recipe.ingredients.forEach(ing => {
        const section = ing.section || 'General';
        if (!sections[section]) sections[section] = [];
        sections[section].push(ing);
      });
      // Add dessert ingredients if present
      if (day.dessert) {
        day.dessert.ingredients.forEach(ing => {
          const section = ing.section || 'General';
          if (!sections[section]) sections[section] = [];
          sections[section].push(ing);
        });
      }
    });

    return sections;
  }, [days]);

  const toggleItem = (id: string) => {
    const next = new Set(checkedItems);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setCheckedItems(next);
  };

  return (
    <div className="bg-white rounded-[3rem] shadow-2xl border-4 border-blue-100 p-10 relative overflow-hidden">
      {/* Decorative BG pattern */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-50"></div>
      
      <div className="flex justify-between items-center mb-12 flex-wrap gap-4">
        <div>
          <h3 className="text-4xl font-black text-gray-800 italic tracking-tight">Grocery Mission</h3>
          <p className="text-blue-500 font-bold uppercase tracking-widest text-xs mt-1">Ready, Set, Shop!</p>
        </div>
        <button 
          onClick={() => window.print()}
          className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-black px-6 py-3 rounded-2xl flex items-center gap-3 shadow-lg transform active:scale-95 transition-all"
        >
          <i className="fa-solid fa-print"></i> Print List
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {(Object.entries(groupedIngredients) as [string, Ingredient[]][]).map(([section, ingredients]) => {
          const colorClass = SECTION_COLORS[section] || SECTION_COLORS['General'];
          const [textCol, borderCol, bgCol] = colorClass.split(' ');
          
          return (
            <div key={section} className="space-y-6">
              <h4 className={`text-sm font-black uppercase tracking-[0.2em] flex items-center gap-3 ${textCol}`}>
                <span className={`w-8 h-8 rounded-xl flex items-center justify-center border-2 ${borderCol} ${bgCol}`}>
                  <i className={`fa-solid ${
                    section === 'Produce' ? 'fa-apple-whole' :
                    section === 'Meat' ? 'fa-drumstick-bite' :
                    section === 'Dairy' ? 'fa-cheese' :
                    section === 'Pantry' ? 'fa-jar' :
                    section === 'Frozen' ? 'fa-snowflake' : 'fa-basket-shopping'
                  }`}></i>
                </span>
                {section}
              </h4>
              <ul className="space-y-3 pl-2">
                {ingredients.map((ing, i) => {
                  const id = `${section}-${ing.name}-${i}`;
                  const isChecked = checkedItems.has(id);
                  return (
                    <li 
                      key={id}
                      onClick={() => toggleItem(id)}
                      className={`flex items-start gap-4 cursor-pointer group transition-all p-2 rounded-xl hover:bg-gray-50`}
                    >
                      <div className={`mt-1 flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${isChecked ? 'bg-green-500 border-green-500 shadow-md scale-110' : 'border-gray-200 group-hover:border-blue-400'}`}>
                        {isChecked && <i className="fa-solid fa-check text-white text-[10px]"></i>}
                      </div>
                      <div className="flex flex-col">
                        <span className={`text-base font-bold transition-all ${isChecked ? 'line-through text-gray-300' : 'text-gray-700'}`}>
                          {ing.name}
                        </span>
                        <span className={`text-xs font-black ${isChecked ? 'text-gray-200' : 'text-gray-400'}`}>{ing.amount}</span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="mt-16 pt-10 border-t-4 border-gray-50 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-5 bg-green-50 px-8 py-5 rounded-[2rem] border-2 border-green-100">
          <div className="w-14 h-14 bg-green-500 text-white rounded-2xl flex items-center justify-center text-2xl shadow-lg">
            <i className="fa-solid fa-leaf"></i>
          </div>
          <div>
            <p className="text-xs font-black text-green-600 uppercase tracking-widest">Secret Tip</p>
            <p className="text-sm text-green-800 font-bold">Eat a magical snack before you go to avoid impulse buys!</p>
          </div>
        </div>
        
        <div className="text-right flex flex-col items-center md:items-end bg-blue-50 px-8 py-5 rounded-[2rem] border-2 border-blue-100 min-w-[250px]">
          <p className="text-xs font-black text-blue-600 uppercase tracking-widest mb-2">Shopping Progress</p>
          <p className="text-xl font-black text-blue-900">
            {checkedItems.size} <span className="text-blue-300">/</span> {Object.values(groupedIngredients).flat().length} <span className="text-sm font-bold ml-1">Items Found</span>
          </p>
          <div className="w-full h-3 bg-white rounded-full mt-3 overflow-hidden border border-blue-100 shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 transition-all duration-700 ease-out shadow-lg" 
              style={{ width: `${(checkedItems.size / Math.max(1, Object.values(groupedIngredients).flat().length)) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingList;
