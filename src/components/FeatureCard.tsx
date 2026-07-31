import React from 'react';
import { Mic, BookOpen, BookMarked, Layers, Trophy, Sparkles } from 'lucide-react';
import { FeatureItem } from '../data/features';
import { ThreeDCard } from './3d/ThreeDCard';

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
    <ThreeDCard
      onClick={onClick}
      glowColor={feature.shadowColor}
      className={`bg-gradient-to-r ${feature.gradient} border border-white/30 shadow-lg p-3.5 select-none`}
    >
      <div className="flex items-center space-x-3 w-full">
        {/* Glow Effect / Background Shimmer */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/15 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        {/* Quiz Card Special Sparkle Pattern */}
        {feature.iconName === 'quiz' && (
          <div className="absolute right-3 top-2 pointer-events-none opacity-50">
            <Sparkles className="w-6 h-6 text-yellow-100 animate-sparkle" />
          </div>
        )}

        {/* Icon Container with 3D Depth */}
        <div className="w-10 h-10 rounded-xl bg-white/25 backdrop-blur-sm border border-white/30 flex items-center justify-center flex-shrink-0 shadow-inner transform transition-transform group-hover:translate-z-4">
          {renderIcon()}
        </div>

        {/* Text Container */}
        <div className="flex flex-col min-w-0 leading-tight">
          <span className="text-white font-extrabold text-[13.5px] tracking-wide uppercase drop-shadow-xs">
            {feature.title}
          </span>
          <span className="text-white/85 text-[10.5px] font-medium tracking-tight mt-0.5 truncate">
            {feature.subtitle}
          </span>
        </div>
      </div>
    </ThreeDCard>
  );
};
