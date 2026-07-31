import React from 'react';
import { Mic, BookOpen, BookMarked, Layers, Trophy, Sparkles } from 'lucide-react';
import { FeatureItem } from '../data/features';

interface FeatureCardProps {
  feature: FeatureItem;
  onClick?: () => void;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ feature, onClick }) => {
  const renderIcon = () => {
    const iconProps = { className: "w-5 h-5 text-white stroke-[2.2]" };
    switch (feature.iconName) {
      case 'mic':
        return <Mic {...iconProps} />;
      case 'book':
        return <BookOpen {...iconProps} />;
      case 'dictionary':
        return <BookMarked {...iconProps} />;
      case 'flashcard':
        return <Layers {...iconProps} />;
      case 'quiz':
        return <Trophy className="w-5 h-5 text-white fill-white/20 stroke-[2.2]" />;
      default:
        return <BookOpen {...iconProps} />;
    }
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={`relative w-full text-left rounded-xl p-3.5 flex items-center space-x-3 
        bg-gradient-to-r ${feature.gradient} 
        border border-white/30 shadow-md 
        transition-all duration-150 active:scale-[0.98] cursor-pointer overflow-hidden group select-none`}
      style={{
        boxShadow: `0 6px 18px ${feature.shadowColor}, inset 0 1px 1px rgba(255, 255, 255, 0.4)`,
      }}
    >
      {/* Glow Effect / Background Shimmer */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      {/* Quiz Card Special Sparkle Pattern */}
      {feature.iconName === 'quiz' && (
        <div className="absolute right-3 top-2 pointer-events-none opacity-40">
          <Sparkles className="w-6 h-6 text-yellow-100 animate-sparkle" />
        </div>
      )}

      {/* Icon Container */}
      <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm border border-white/25 flex items-center justify-center flex-shrink-0 shadow-inner">
        {renderIcon()}
      </div>

      {/* Text Container */}
      <div className="flex flex-col min-w-0 leading-tight">
        <span className="text-white font-extrabold text-[13.5px] tracking-wide uppercase">
          {feature.title}
        </span>
        <span className="text-white/90 text-[10.5px] font-medium tracking-tight mt-0.5 truncate">
          {feature.subtitle}
        </span>
      </div>
    </button>
  );
};
