import React from 'react';

interface PronunciationWaveformProps {
  isActivePlaying?: boolean;
  isActiveRecording?: boolean;
}

export const PronunciationWaveform: React.FC<PronunciationWaveformProps> = ({
  isActivePlaying = false,
  isActiveRecording = false,
}) => {
  // Height pattern mimicking the reference image audio waveform
  const barHeights = [
    6, 10, 8, 14, 12, 16, 10, 18, 14, 22, 16, 26, 20, 28, 24, 30, 26, 28,
    22, 26, 18, 24, 16, 20, 14, 18, 10, 14, 12, 8, 14, 10, 6, 8, 6, 4
  ];

  return (
    <div className="w-full h-12 flex items-center justify-center space-x-[2.5px] px-2 py-1 select-none overflow-hidden">
      {barHeights.map((h, i) => {
        // Highlight middle section green (indices 11 to 23) like reference image
        const isGreen = i >= 11 && i <= 22;

        return (
          <div
            key={i}
            className={`w-[3px] rounded-full transition-all duration-300 ${
              isGreen
                ? 'bg-[#22C55E]'
                : 'bg-[#CBD5E1]'
            } ${
              (isActivePlaying || isActiveRecording) && isGreen
                ? 'animate-pulse'
                : ''
            }`}
            style={{
              height: (isActivePlaying || isActiveRecording)
                ? `${Math.max(4, Math.min(32, h + (i % 3 === 0 ? 8 : -4)))}px`
                : `${h}px`,
              transitionDelay: `${i * 15}ms`,
            }}
          />
        );
      })}
    </div>
  );
};
