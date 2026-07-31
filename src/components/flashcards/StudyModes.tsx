import React from 'react';
import { Layers, RotateCcw, Headphones, LayoutGrid } from 'lucide-react';

export type StudyModeType = 'normal' | 'flip' | 'listen' | 'match';

interface StudyModesProps {
  activeMode: StudyModeType;
  onSelectMode: (mode: StudyModeType) => void;
}

export const StudyModes: React.FC<StudyModesProps> = ({
  activeMode,
  onSelectMode,
}) => {
  const modes = [
    {
      id: 'normal' as StudyModeType,
      name: 'Học thông thường',
      icon: Layers,
      color: 'bg-purple-50 text-[#8E24AA] border-purple-200',
    },
    {
      id: 'flip' as StudyModeType,
      name: 'Lật thẻ',
      icon: RotateCcw,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    },
    {
      id: 'listen' as StudyModeType,
      name: 'Nghe & nhớ',
      icon: Headphones,
      color: 'bg-blue-50 text-blue-600 border-blue-200',
    },
    {
      id: 'match' as StudyModeType,
      name: 'Ghép đôi',
      icon: LayoutGrid,
      color: 'bg-amber-50 text-amber-600 border-amber-200',
    },
  ];

  return (
    <div className="w-full px-4 py-1.5 relative z-10">
      <div className="bg-white rounded-2xl p-3.5 shadow-[0_4px_16px_rgba(0,0,0,0.05)] border border-white/80 space-y-2.5">
        <h2 className="text-[13.5px] font-extrabold text-[#242424] tracking-tight">
          Chế độ học
        </h2>

        <div className="grid grid-cols-4 gap-2">
          {modes.map((mode) => {
            const Icon = mode.icon;
            const isActive = activeMode === mode.id;

            return (
              <button
                key={mode.id}
                onClick={() => onSelectMode(mode.id)}
                type="button"
                className={`p-2 rounded-2xl border flex flex-col items-center justify-center text-center transition-all active:scale-95 cursor-pointer ${
                  isActive
                    ? 'border-[#8E24AA] ring-2 ring-[#8E24AA]/30 bg-purple-50/50'
                    : 'border-slate-100 hover:border-slate-200 bg-slate-50/50'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-1.5 border ${mode.color}`}>
                  <Icon className="w-4.5 h-4.5 stroke-[2]" />
                </div>

                <span
                  className={`text-[10px] tracking-tight leading-tight transition-colors ${
                    isActive ? 'font-extrabold text-[#8E24AA]' : 'font-semibold text-slate-600'
                  }`}
                >
                  {mode.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
