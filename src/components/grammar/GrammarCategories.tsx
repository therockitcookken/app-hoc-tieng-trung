import React from 'react';
import { LayoutGrid, BookOpen, Award, Rocket, Heart } from 'lucide-react';
import { GRAMMAR_CATEGORIES, GrammarCategory } from '../../data/grammarData';

interface GrammarCategoriesProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
}

export const GrammarCategories: React.FC<GrammarCategoriesProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const renderIcon = (iconName: string) => {
    const iconProps = { className: "w-5 h-5 text-white stroke-[2.2]" };
    switch (iconName) {
      case 'all':
        return <LayoutGrid {...iconProps} />;
      case 'basic':
        return <BookOpen {...iconProps} />;
      case 'intermediate':
        return <Award {...iconProps} />;
      case 'advanced':
        return <Rocket {...iconProps} />;
      case 'favorites':
        return <Heart className="w-5 h-5 text-white fill-white stroke-[2]" />;
      default:
        return <BookOpen {...iconProps} />;
    }
  };

  return (
    <div className="w-full px-4 py-1.5 relative z-10">
      <div className="bg-white rounded-2xl p-3.5 shadow-[0_4px_16px_rgba(0,0,0,0.05)] border border-white/80">
        <div className="grid grid-cols-5 gap-2">
          {GRAMMAR_CATEGORIES.map((cat: GrammarCategory) => {
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
                    isActive ? 'ring-2 ring-blue-500 ring-offset-2 scale-105' : 'opacity-90 group-hover:opacity-100'
                  }`}
                >
                  {renderIcon(cat.iconName)}
                </div>

                {/* Label Underneath */}
                <span
                  className={`text-[10.5px] tracking-tight mt-1.5 text-center leading-tight transition-colors ${
                    isActive ? 'font-extrabold text-[#1E52E8]' : 'font-medium text-[#555555]'
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
