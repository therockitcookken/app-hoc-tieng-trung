import React, { useRef } from 'react';

interface ThreeDCardProps {
  children: React.ReactNode;
  className?: string;
  depth?: number;
  glowColor?: string;
  onClick?: () => void;
}

export const ThreeDCard: React.FC<ThreeDCardProps> = ({
  children,
  className = '',
  glowColor = 'rgba(239, 68, 68, 0.25)',
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  // Ultra-fast direct DOM manipulation without triggering React re-renders on mousemove
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6; // Max 6deg tilt
    const rotateY = ((x - centerX) / centerX) * 6;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
    cardRef.current.style.boxShadow = `0 15px 30px -10px ${glowColor}`;

    if (glareRef.current) {
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      glareRef.current.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.3) 0%, transparent 70%)`;
      glareRef.current.style.opacity = '1';
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    cardRef.current.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1)';

    if (glareRef.current) {
      glareRef.current.style.opacity = '0';
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transition: 'transform 0.15s ease-out, box-shadow 0.2s ease-out',
        transformStyle: 'preserve-3d',
      }}
      className={`relative rounded-2xl overflow-hidden cursor-pointer ${className}`}
    >
      {children}

      {/* Dynamic Light Glare Overlay */}
      <div
        ref={glareRef}
        className="pointer-events-none absolute inset-0 transition-opacity duration-200 opacity-0"
      />
    </div>
  );
};
