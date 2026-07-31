import React from 'react';

interface ThreeDBackgroundCanvasProps {
  variant?: 'red' | 'blue' | 'green' | 'purple' | 'orange';
}

export const ThreeDBackgroundCanvas: React.FC<ThreeDBackgroundCanvasProps> = ({ variant = 'red' }) => {
  const getParticleGlow = () => {
    switch (variant) {
      case 'blue': return 'bg-blue-400/20';
      case 'green': return 'bg-emerald-400/20';
      case 'purple': return 'bg-purple-400/20';
      case 'orange': return 'bg-amber-400/20';
      case 'red':
      default: return 'bg-rose-400/20';
    }
  };

  const glowClass = getParticleGlow();

  // Ultra-lightweight CSS 3D Particle Constellation (0 WebGL / 0 CPU overhead)
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Layer 1: Floating Glowing Nodes */}
      <div className={`absolute top-1/4 left-1/5 w-64 h-64 ${glowClass} rounded-full blur-3xl animate-pulse-slow`} />
      <div className={`absolute bottom-1/3 right-1/4 w-80 h-80 ${glowClass} rounded-full blur-3xl animate-pulse-slow`} />

      {/* Layer 2: Floating 3D Sparkle Nodes */}
      <div className="absolute top-12 left-1/4 w-2 h-2 rounded-full bg-white/60 animate-sparkle" />
      <div className="absolute top-1/3 right-12 w-3 h-3 rounded-full bg-white/50 animate-sparkle" />
      <div className="absolute bottom-1/4 left-16 w-2.5 h-2.5 rounded-full bg-white/40 animate-sparkle" />
      <div className="absolute bottom-12 right-1/3 w-3 h-3 rounded-full bg-white/60 animate-sparkle" />

      {/* Layer 3: Geometry Polygons */}
      <svg className="absolute top-10 left-10 w-24 h-24 opacity-20 text-white animate-float-3d" viewBox="0 0 100 100" fill="none" stroke="currentColor">
        <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" strokeWidth="1.5" />
      </svg>

      <svg className="absolute bottom-16 right-10 w-28 h-28 opacity-15 text-white animate-float-3d" viewBox="0 0 100 100" fill="none" stroke="currentColor">
        <polygon points="50,10 90,90 10,90" strokeWidth="1.5" />
      </svg>
    </div>
  );
};
