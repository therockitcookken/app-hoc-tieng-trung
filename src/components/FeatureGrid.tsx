import React from 'react';
import { FeatureCard } from './FeatureCard';
import { FEATURES, FeatureItem } from '../data/features';

interface FeatureGridProps {
  onSelectFeature?: (feature: FeatureItem) => void;
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({ onSelectFeature }) => {
  const row1 = FEATURES.slice(0, 2);
  const row2 = FEATURES.slice(2, 4);
  const row3 = FEATURES.slice(4, 5);

  return (
    <div className="w-full px-4 py-1.5 space-y-2.5 relative z-10">
      {/* Row 1: Phát Âm & Ngữ Pháp */}
      <div className="grid grid-cols-2 gap-2.5">
        {row1.map((item) => (
          <FeatureCard key={item.id} feature={item} onClick={() => onSelectFeature?.(item)} />
        ))}
      </div>

      {/* Row 2: Từ Điển & Flashcard */}
      <div className="grid grid-cols-2 gap-2.5">
        {row2.map((item) => (
          <FeatureCard key={item.id} feature={item} onClick={() => onSelectFeature?.(item)} />
        ))}
      </div>

      {/* Row 3: Quiz (Full Width) */}
      <div className="w-full">
        {row3.map((item) => (
          <FeatureCard key={item.id} feature={item} onClick={() => onSelectFeature?.(item)} />
        ))}
      </div>
    </div>
  );
};
