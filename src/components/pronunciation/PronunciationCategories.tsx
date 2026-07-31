import React from 'react';
import { Star } from 'lucide-react';
import { PRONUNCIATION_CATEGORIES, CategoryItem } from '../../data/pronunciationData';

interface PronunciationCategoriesProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
}

export const PronunciationCategories: React.FC<PronunciationCategoriesProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <div className="w-full px-4 py-1.5 relative z-10">
      <div className="bg-white rounded-2xl p-3.5 shadow-[0_4px_16px_rgba(0,0,0,0.05)] border border-white/80">
        <div className="grid grid-cols-5 gap-2">
          {PRONUNCIATION_CATEGORIES.map((cat: CategoryItem) => {
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                type="button"
                className="flex flex-col items-center group cursor-pointer active:scale-95 transition-transform"
              >
                {/* Square Icon Container */}
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center text-white shadow-sm border border-white/40 transition-all ${
                    isActive ? 'ring-2 ring-red-400 ring-offset-2 scale-105' : 'opacity-90 group-hover:opacity-100'
                  }`}
                >
                  {cat.isIcon ? (
                    <Star className="w-6 h-6 fill-white text-white" />
                  ) : (
                    <span className="text-[20px] font-bold tracking-tight font-serif leading-none">
                      {cat.symbol}
                    </span>
                  )}
                </div>

                {/* Label Underneath */}
                <span
                  className={`text-[10.5px] tracking-tight mt-1.5 text-center leading-tight transition-colors ${
                    isActive ? 'font-extrabold text-[#D92329]' : 'font-medium text-[#555555]'
                  }`}
                >
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
