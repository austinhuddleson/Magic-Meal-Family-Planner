
import React, { useState } from 'react';
import { DietaryRestriction, TimeLimit, PlannerPreferences, CookingMechanism } from '../types';

interface PreferencesFormProps {
  onGenerate: (prefs: PlannerPreferences) => void;
}

const RANDOM_THEMES = [
  "Disney Classics", "Pixar Adventures", "Universal Studios", 
  "Marvel Superheroes", "Star Wars Galaxy", "Studio Ghibli", 
  "Jurassic Park", "Harry Potter Magic", "Despicable Me Minions",
  "Shrek's Swamp", "Under the Sea", "Outer Space Explorers",
  "Pokemon Journey", "Super Mario World", "Toy Story",
  "Frozen Arendelle", "The Lion King's Pride Lands", "Moana's Island"
];

const DIETARY_COLORS: Record<string, string> = {
  [DietaryRestriction.None]: 'bg-gray-500 border-gray-500',
  [DietaryRestriction.Vegan]: 'bg-green-500 border-green-500',
  [DietaryRestriction.Vegetarian]: 'bg-emerald-400 border-emerald-400',
  [DietaryRestriction.GlutenFree]: 'bg-yellow-500 border-yellow-500',
  [DietaryRestriction.DairyFree]: 'bg-blue-400 border-blue-400',
  [DietaryRestriction.NutFree]: 'bg-pink-400 border-pink-400',
  [DietaryRestriction.LowCarb]: 'bg-indigo-500 border-indigo-500',
  [DietaryRestriction.HighProtein]: 'bg-red-500 border-red-500',
  [DietaryRestriction.AnemiaBusters]: 'bg-rose-600 border-rose-600',
};

const PreferencesForm: React.FC<PreferencesFormProps> = ({ onGenerate }) => {
  const [dietary, setDietary] = useState<DietaryRestriction[]>([]);
  const [mechanisms, setMechanisms] = useState<CookingMechanism[]>([]);
  const [timeLimits, setTimeLimits] = useState<TimeLimit[]>([TimeLimit.Moderate]);
  const [theme, setTheme] = useState('Disney & Pixar');
  const [days, setDays] = useState(5);
  const [servings, setServings] = useState(4);
  const [inclusions, setInclusions] = useState('');
  const [exclusions, setExclusions] = useState('');
  const [includeDessert, setIncludeDessert] = useState(false);

  const toggleDietary = (res: DietaryRestriction) => {
    if (res === DietaryRestriction.None) {
      setDietary([]);
      return;
    }
    setDietary(prev => 
      prev.includes(res) ? prev.filter(i => i !== res) : [...prev, res]
    );
  };

  const toggleMechanism = (mech: CookingMechanism) => {
    setMechanisms(prev => 
      prev.includes(mech) ? prev.filter(m => m !== mech) : [...prev, mech]
    );
  };

  const toggleTimeLimit = (time: TimeLimit) => {
    setTimeLimits(prev => 
      prev.includes(time) 
        ? (prev.length > 1 ? prev.filter(t => t !== time) : prev) 
        : [...prev, time]
    );
  };

  const randomizeTheme = () => {
    const randomTheme = RANDOM_THEMES[Math.floor(Math.random() * RANDOM_THEMES.length)];
    setTheme(randomTheme);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({
      dietaryRestrictions: dietary,
      cookingMechanisms: mechanisms,
      timeLimit: timeLimits,
      themeType: theme,
      numberOfDays: days,
      servings,
      inclusions,
      exclusions,
      includeDessert
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-3">Specifications</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {Object.values(DietaryRestriction).map(res => {
            const isActive = (res === DietaryRestriction.None && dietary.length === 0) || dietary.includes(res);
            const colorClass = isActive ? DIETARY_COLORS[res] : 'bg-white border-gray-200 text-gray-600 hover:border-pink-200';
            
            return (
              <button
                key={res}
                type="button"
                onClick={() => toggleDietary(res)}
                className={`px-3 py-2.5 text-xs font-bold rounded-2xl border-2 transition-all transform active:scale-95 ${
                  isActive ? `${colorClass} text-white shadow-lg -translate-y-0.5` : colorClass
                }`}
              >
                {res}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-3">Kitchen Magic Tools</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {Object.values(CookingMechanism).map(mech => (
            <button
              key={mech}
              type="button"
              onClick={() => toggleMechanism(mech)}
              className={`px-3 py-2.5 text-xs font-bold rounded-2xl border-2 transition-all transform active:scale-95 ${
                mechanisms.includes(mech)
                ? 'bg-purple-500 border-purple-500 text-white shadow-lg -translate-y-0.5'
                : 'bg-white border-gray-200 text-gray-600 hover:border-purple-200'
              }`}
            >
              <i className={`fa-solid ${
                mech === CookingMechanism.Oven ? 'fa-fire' : 
                mech === CookingMechanism.Stovetop ? 'fa-hot-tub-person' : 
                mech === CookingMechanism.AirFryer ? 'fa-wind' : 
                mech === CookingMechanism.Griddle ? 'fa-square-full' : 
                mech === CookingMechanism.PizzaOven ? 'fa-certificate' : 'fa-wave-square'
              } mr-2`}></i>
              {mech}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-3">Time Limits (Choose Multiple)</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {Object.values(TimeLimit).map(time => (
            <button
              key={time}
              type="button"
              onClick={() => toggleTimeLimit(time)}
              className={`px-2 py-2.5 text-[10px] font-black rounded-2xl border-2 transition-all transform active:scale-95 ${
                timeLimits.includes(time)
                ? 'bg-blue-500 border-blue-500 text-white shadow-lg -translate-y-0.5'
                : 'bg-white border-gray-200 text-gray-600 hover:border-blue-200'
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">Include Yum-yums</label>
          <input 
            type="text"
            value={inclusions}
            onChange={(e) => setInclusions(e.target.value)}
            placeholder="Salmon, Spinach..."
            className="w-full px-5 py-4 rounded-[1.5rem] border-4 border-green-100 focus:border-green-300 focus:ring-0 outline-none font-bold placeholder:font-normal text-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">Exclude Yucky stuff</label>
          <input 
            type="text"
            value={exclusions}
            onChange={(e) => setExclusions(e.target.value)}
            placeholder="Mushrooms, Peas..."
            className="w-full px-5 py-4 rounded-[1.5rem] border-4 border-red-100 focus:border-red-300 focus:ring-0 outline-none font-bold placeholder:font-normal text-gray-700"
          />
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-3">
          <label className="block text-sm font-black text-gray-700 uppercase tracking-widest">Theme Vibe</label>
          <button 
            type="button"
            onClick={randomizeTheme}
            className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-[10px] font-black uppercase tracking-tighter hover:bg-yellow-200"
          >
            <i className="fa-solid fa-dice"></i> Random
          </button>
        </div>
        <input 
          type="text"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="w-full px-5 py-4 rounded-[1.5rem] border-4 border-purple-100 focus:border-purple-300 outline-none font-black text-gray-700"
        />
      </div>

      <div className="flex items-center justify-between bg-yellow-50 p-6 rounded-[2rem] border-4 border-yellow-200">
        <div>
          <h4 className="font-black text-yellow-800 uppercase tracking-widest text-sm">Themed Dessert?</h4>
          <p className="text-xs text-yellow-600 font-bold mt-1">End the day with a magical treat!</p>
        </div>
        <button
          type="button"
          onClick={() => setIncludeDessert(!includeDessert)}
          className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 focus:outline-none ${includeDessert ? 'bg-yellow-500' : 'bg-gray-300'}`}
        >
          <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${includeDessert ? 'translate-x-6' : 'translate-x-0'}`}>
            <i className={`fa-solid ${includeDessert ? 'fa-cookie-bite text-yellow-500 text-[10px]' : 'fa-circle text-gray-200 text-[10px]'}`}></i>
          </div>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-3">Days of Fun: <span className="text-pink-600">{days}</span></label>
          <input 
            type="range"
            min="1"
            max="7"
            value={days}
            onChange={(e) => setDays(parseInt(e.target.value))}
            className="w-full h-4 bg-gray-200 rounded-full appearance-none cursor-pointer accent-pink-500"
          />
        </div>
        <div>
          <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-3">Belly Count: <span className="text-blue-600">{servings}</span></label>
          <input 
            type="range"
            min="1"
            max="12"
            value={servings}
            onChange={(e) => setServings(parseInt(e.target.value))}
            className="w-full h-4 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-500"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-black text-xl py-6 rounded-[2rem] shadow-xl shadow-purple-100 hover:shadow-purple-200 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 uppercase tracking-widest active:scale-95"
      >
        <i className="fa-solid fa-wand-sparkles text-2xl"></i>
        Make the Magic!
      </button>
    </form>
  );
};

export default PreferencesForm;
