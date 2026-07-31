import React from 'react';
import { ThreeDBackgroundCanvas } from './3d/ThreeDBackgroundCanvas';

interface ChineseBackgroundProps {
  variant?: 'red' | 'blue' | 'green' | 'purple' | 'orange';
}

export const ChineseBackground: React.FC<ChineseBackgroundProps> = ({ variant = 'red' }) => {
  const getGradient = () => {
    switch (variant) {
      case 'blue':
        return 'linear-gradient(180deg, #1545A5 0%, #2570F0 35%, #2B7FFF 70%, #1E52E8 100%)';
      case 'green':
        return 'linear-gradient(180deg, #187D36 0%, #24A143 35%, #28B849 70%, #1FB03E 100%)';
      case 'purple':
        return 'linear-gradient(180deg, #7B1FA2 0%, #9C27B0 35%, #A73CEB 70%, #8E24AA 100%)';
      case 'orange':
        return 'linear-gradient(180deg, #E65100 0%, #F57C00 35%, #FF9800 70%, #FFA726 100%)';
      case 'red':
      default:
        return 'linear-gradient(180deg, #BD081B 0%, #E92E27 35%, #F0402C 70%, #FF5A36 100%)';
    }
  };

  const getSparkleColor = () => {
    if (variant === 'blue') return 'text-blue-100';
    if (variant === 'green') return 'text-emerald-100';
    if (variant === 'purple') return 'text-purple-100';
    if (variant === 'orange') return 'text-amber-100';
    return 'text-yellow-300';
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 rounded-[inherit]">
      {/* Base Gradient Layer */}
      <div 
        className="absolute inset-0 w-full h-full transition-colors duration-500"
        style={{ background: getGradient() }}
      />

      {/* 3D WebGL Floating Constellation Canvas Layer */}
      <ThreeDBackgroundCanvas variant={variant} />

      {/* Top Right Chinese Pagoda / Temple Roof Silhouette */}
      <svg
        className={`absolute -top-1 -right-2 w-48 h-36 opacity-20 ${getSparkleColor()}`}
        viewBox="0 0 200 150"
        fill="currentColor"
      >
        <path d="M200 20 C180 20 160 35 140 38 C135 39 125 35 120 30 C130 25 150 15 170 12 C185 10 195 12 200 20 Z" />
        <path d="M200 45 C175 45 150 62 125 65 C118 66 105 60 95 52 C110 46 135 32 165 28 C185 25 195 30 200 45 Z" />
        <path d="M200 75 C170 75 140 92 110 95 C100 96 85 90 75 80 C92 72 120 58 155 52 C180 48 195 55 200 75 Z" />
        <path d="M120 65 L120 120 M150 62 L150 120 M180 50 L180 120" stroke="currentColor" strokeWidth="2" opacity="0.6" />
      </svg>

      {/* Top Left Secondary Temple Roof */}
      <svg
        className={`absolute top-12 -left-8 w-36 h-28 opacity-15 ${getSparkleColor()}`}
        viewBox="0 0 160 120"
        fill="currentColor"
      >
        <path d="M0 25 C20 25 40 40 65 42 C72 43 85 37 90 30 C75 24 50 12 25 10 C10 8 0 15 0 25 Z" />
        <path d="M0 55 C25 55 50 72 80 75 C90 76 105 70 115 60 C95 52 65 38 35 32 C15 28 0 35 0 55 Z" />
      </svg>
    </div>
  );
};
