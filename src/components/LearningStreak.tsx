import React from 'react';
import { Flame, Check } from 'lucide-react';

export const LearningStreak: React.FC = () => {
  const days = [
    { label: 'T2', completed: true },
    { label: 'T3', completed: true },
    { label: 'T4', completed: true },
    { label: 'T5', completed: true },
    { label: 'T6', completed: false },
    { label: 'T7', completed: false },
    { label: 'CN', completed: false },
  ];

  return (
    <div className="flex-1 flex flex-col justify-between pr-1">
      {/* Streak Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[13px] font-extrabold text-[#242424] tracking-tight">
          Chuỗi ngày học
        </h3>
        <div className="flex items-center space-x-1 text-[#EF3B32] font-extrabold text-[12px]">
          <Flame className="w-4 h-4 fill-[#FF8A28] text-[#EF3B32] stroke-[1.5] animate-pulse-slow" />
          <span>15 ngày</span>
        </div>
      </div>

      {/* Days Grid (T2 - CN) */}
      <div className="grid grid-cols-7 gap-1 items-center text-center">
        {days.map((day, idx) => (
          <div key={idx} className="flex flex-col items-center space-y-1">
            <span className="text-[10px] font-medium text-[#888888]">
              {day.label}
            </span>
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                day.completed
                  ? 'bg-gradient-to-b from-[#FFB52E] to-[#FF8A28] text-white shadow-xs'
                  : 'bg-[#FFF0F0] border border-[#FFD0D0]'
              }`}
            >
              {day.completed && (
                <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
