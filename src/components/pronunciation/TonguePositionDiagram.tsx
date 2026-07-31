import React from 'react';

interface TonguePositionDiagramProps {
  diagramId: string;
  title?: string;
  className?: string;
  showAirflow?: boolean;
  highlightContact?: boolean;
}

export const TonguePositionDiagram: React.FC<TonguePositionDiagramProps> = ({
  diagramId,
  title,
  className = '',
  showAirflow = true,
  highlightContact = true,
}) => {
  // Determine diagram type & features
  const isBilabial = diagramId.includes('bilabial');
  const isLabiodental = diagramId.includes('labiodental');
  const isAlveolar = diagramId.includes('alveolar');
  const isVelar = diagramId.includes('velar');
  const isPalatal = diagramId.includes('palatal');
  const isRetroflex = diagramId.includes('retroflex');
  const isDental = diagramId.includes('dental');
  const isAspirated = diagramId.includes('asp') && !diagramId.includes('unasp');

  return (
    <div className={`flex flex-col items-center bg-slate-900 text-white rounded-2xl p-3.5 shadow-md border border-slate-700/80 relative overflow-hidden select-none ${className}`}>
      {/* Disclaimer / Note */}
      <div className="w-full flex items-center justify-between text-[9.5px] text-slate-400 font-medium pb-2 border-b border-slate-800 mb-2">
        <span className="font-bold text-amber-300">
          {title || 'Mô phỏng mặt cắt khoang miệng (Cấu âm)'}
        </span>
        <span className="text-slate-500 text-[8.5px]">Sơ đồ minh họa</span>
      </div>

      {/* SVG Vector Mouth & Tongue Cutaway */}
      <div className="relative w-full max-w-[240px] aspect-[4/3] flex items-center justify-center">
        <svg viewBox="0 0 300 240" className="w-full h-full drop-shadow-md">
          <defs>
            {/* Airflow Gradient */}
            <linearGradient id="airGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#EF4444" stopOpacity="0.9" />
            </linearGradient>
            {/* Contact Highlight Gradient */}
            <radialGradient id="contactGrad">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="1" />
              <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* 1. Upper Palate & Nose Wall */}
          <path
            d="M 40 180 C 40 100, 90 40, 170 40 C 220 40, 250 80, 260 110 L 270 110"
            fill="none"
            stroke="#64748B"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* Upper Teeth */}
          <path d="M 252 110 L 255 130 L 248 130 Z" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1.5" />

          {/* Upper Lip */}
          <path
            d="M 260 110 C 275 105, 280 120, 270 125"
            fill="none"
            stroke="#F43F5E"
            strokeWidth="7"
            strokeLinecap="round"
          />

          {/* Lower Lip */}
          <path
            d="M 270 148 C 280 152, 275 168, 260 162"
            fill="none"
            stroke="#F43F5E"
            strokeWidth="7"
            strokeLinecap="round"
          />

          {/* Lower Teeth */}
          <path d="M 250 148 L 253 135 L 246 135 Z" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1.5" />

          {/* Hard Palate & Soft Palate Fill */}
          <path
            d="M 120 50 C 170 50, 220 80, 245 110"
            fill="none"
            stroke={isPalatal || isVelar ? '#F59E0B' : '#475569'}
            strokeWidth="5"
          />

          {/* 2. Tongue Path according to articulation group */}
          {isRetroflex ? (
            /* Retroflex Tongue (Curled Upwards) */
            <path
              d="M 80 200 C 110 180, 150 160, 200 130 C 220 115, 225 80, 210 75 C 195 85, 175 140, 80 200 Z"
              fill="#E11D48"
              fillOpacity="0.85"
              stroke="#FFF"
              strokeWidth="2"
            />
          ) : isPalatal ? (
            /* Palatal Tongue (Front raised near hard palate) */
            <path
              d="M 80 200 C 120 180, 160 110, 215 90 C 235 95, 230 130, 80 200 Z"
              fill="#E11D48"
              fillOpacity="0.85"
              stroke="#FFF"
              strokeWidth="2"
            />
          ) : isVelar ? (
            /* Velar Tongue (Back raised near soft palate) */
            <path
              d="M 80 200 C 130 90, 170 85, 230 140 C 210 150, 150 170, 80 200 Z"
              fill="#E11D48"
              fillOpacity="0.85"
              stroke="#FFF"
              strokeWidth="2"
            />
          ) : isAlveolar ? (
            /* Alveolar Tongue (Tip touching upper gum/teeth) */
            <path
              d="M 80 200 C 120 170, 170 140, 242 112 C 230 140, 160 170, 80 200 Z"
              fill="#E11D48"
              fillOpacity="0.85"
              stroke="#FFF"
              strokeWidth="2"
            />
          ) : isDental ? (
            /* Dental Tongue (Flat tip touching back of front teeth) */
            <path
              d="M 80 200 C 130 170, 180 135, 248 122 C 230 145, 160 170, 80 200 Z"
              fill="#E11D48"
              fillOpacity="0.85"
              stroke="#FFF"
              strokeWidth="2"
            />
          ) : isBilabial ? (
            /* Bilabial (Lips sealed, tongue flat in bottom) */
            <path
              d="M 80 200 C 120 180, 170 160, 235 155 C 210 170, 150 185, 80 200 Z"
              fill="#E11D48"
              fillOpacity="0.85"
              stroke="#FFF"
              strokeWidth="2"
            />
          ) : isLabiodental ? (
            /* Labiodental (Upper teeth on lower lip) */
            <path
              d="M 80 200 C 120 180, 170 165, 230 160 C 200 175, 140 190, 80 200 Z"
              fill="#E11D48"
              fillOpacity="0.85"
              stroke="#FFF"
              strokeWidth="2"
            />
          ) : (
            /* Default Normal Flat Tongue */
            <path
              d="M 80 200 C 120 170, 180 150, 240 140 C 210 165, 150 185, 80 200 Z"
              fill="#E11D48"
              fillOpacity="0.85"
              stroke="#FFF"
              strokeWidth="2"
            />
          )}

          {/* 3. Contact Point Highlight Glow */}
          {highlightContact && (
            <>
              {isRetroflex && <circle cx="210" cy="78" r="14" fill="url(#contactGrad)" />}
              {isPalatal && <circle cx="210" cy="92" r="14" fill="url(#contactGrad)" />}
              {isVelar && <circle cx="150" cy="85" r="15" fill="url(#contactGrad)" />}
              {isAlveolar && <circle cx="242" cy="112" r="12" fill="url(#contactGrad)" />}
              {isDental && <circle cx="248" cy="122" r="12" fill="url(#contactGrad)" />}
              {isBilabial && <circle cx="265" cy="136" r="16" fill="url(#contactGrad)" />}
              {isLabiodental && <circle cx="258" cy="142" r="14" fill="url(#contactGrad)" />}
            </>
          )}

          {/* 4. Airflow Arrows (Show aspirated air burst if applicable) */}
          {showAirflow && (
            <g>
              <path
                d={
                  isAspirated
                    ? 'M 100 160 C 160 140, 220 125, 285 125'
                    : 'M 100 160 C 160 145, 210 135, 270 135'
                }
                fill="none"
                stroke="url(#airGrad)"
                strokeWidth={isAspirated ? '5' : '3'}
                strokeDasharray={isAspirated ? '8 4' : '4 3'}
                className="animate-pulse"
              />
              {/* Arrow Head */}
              <polygon
                points={isAspirated ? '285,120 295,125 285,130' : '270,131 278,135 270,139'}
                fill="#EF4444"
              />
            </g>
          )}
        </svg>
      </div>

      {/* Anatomical Annotations & Legend */}
      <div className="w-full mt-2 pt-2 border-t border-slate-800 flex items-center justify-around text-[10px] text-slate-300">
        <div className="flex items-center space-x-1">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-600 inline-block" />
          <span>Thân lưỡi</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block animate-pulse" />
          <span>Vùng tiếp xúc</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-400 inline-block" />
          <span>Luồng khí {isAspirated ? '(Bật mạnh)' : '(Nhẹ)'}</span>
        </div>
      </div>
    </div>
  );
};
