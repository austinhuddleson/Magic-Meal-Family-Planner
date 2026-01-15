
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b-4 border-yellow-200 py-4 px-6 sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 rounded-2xl flex items-center justify-center text-white shadow-lg transform rotate-3 hover:rotate-0 transition-transform cursor-pointer">
            <i className="fa-solid fa-wand-magic-sparkles text-2xl"></i>
          </div>
          <h1 className="text-2xl font-black tracking-tighter">
            <span className="text-pink-500">Magic</span>{" "}
            <span className="text-blue-500">Family</span>{" "}
            <span className="text-green-500">Planner</span>
          </h1>
        </div>
        <div className="hidden sm:flex gap-8">
          <span className="text-sm font-black text-gray-400 uppercase tracking-widest cursor-pointer hover:text-pink-500 transition-colors">Yum!</span>
          <span className="text-sm font-black text-gray-400 uppercase tracking-widest cursor-pointer hover:text-blue-500 transition-colors">Help</span>
          <span className="text-sm font-black text-gray-400 uppercase tracking-widest cursor-pointer hover:text-green-500 transition-colors">Gifts</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
