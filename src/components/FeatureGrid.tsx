import React from 'react';
import { FeatureCard } from './FeatureCard';
import { FEATURES, FeatureItem } from '../data/features';

interface FeatureGridProps {
  onSelectFeature?: (feature: FeatureItem) => void;
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({ onSelectFeature }) => {
  return (
    <div className="w-full px-1 sm:px-4 py-2 relative z-10">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {FEATURES.map((item) => (
          <FeatureCard key={item.id} feature={item} onClick={() => onSelectFeature?.(item)} />
        ))}
      </div>
    </div>
  );
};
