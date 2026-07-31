import React from 'react';
import { Search, Camera, Edit3, MessageSquare, BookOpen } from 'lucide-react';

export type DictionaryMode = 'search' | 'scan' | 'handwriting' | 'sentences' | 'notebook';

interface SearchModeTabsProps {
  activeMode: DictionaryMode;
  onSelectMode: (mode: DictionaryMode) => void;
}

export const SearchModeTabs: React.FC<SearchModeTabsProps> = ({
  activeMode,
  onSelectMode,
}) => {
  const modes = [
    {
      id: 'search' as DictionaryMode,
      name: 'Tra từ',
      icon: Search,
      gradient: 'from-[#34C759] to-[#28B849]',
    },
    {
      id: 'scan' as DictionaryMode,
      name: 'Hình ảnh',
      icon: Camera,
      gradient: 'from-[#42A5F5] to-[#1E88E5]',
    },
    {
      id: 'handwriting' as DictionaryMode,
      name: 'Viết tay',
      icon: Edit3,
      gradient: 'from-[#FFA726] to-[#F57C00]',
    },
    {
      id: 'sentences' as DictionaryMode,
      name: 'Câu',
      icon: MessageSquare,
      gradient: 'from-[#AB47BC] to-[#7B1FA2]',
    },
    {
      id: 'notebook' as DictionaryMode,
      name: 'Sổ tay',
      icon: BookOpen,
      gradient: 'from-[#EC407A] to-[#C2185B]',
    },
  ];

  return (
    <div className="w-full px-4 py-1.5 relative z-10">
      <div className="bg-white rounded-2xl p-3 shadow-[0_4px_16px_rgba(0,0,0,0.05)] border border-white/80">
        <div className="grid grid-cols-5 gap-1.5">
          {modes.map((mode) => {
            const Icon = mode.icon;
            const isActive = activeMode === mode.id;

            return (
              <button
                key={mode.id}
                onClick={() => onSelectMode(mode.id)}
                type="button"
                className="flex flex-col items-center group cursor-pointer active:scale-95 transition-transform relative pb-1"
              >
                {/* Square Icon Container */}
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-xs border transition-all ${
                    isActive
                      ? `bg-gradient-to-br ${mode.gradient} border-white scale-105 shadow-sm`
                      : 'bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[#28B849]'}`} />
                </div>

                {/* Label */}
                <span
                  className={`text-[10.5px] tracking-tight mt-1.5 text-center leading-tight transition-colors ${
                    isActive ? 'font-extrabold text-[#28B849]' : 'font-medium text-[#666666]'
                  }`}
                >
                  {mode.name}
                </span>

                {/* Active Underline Bar */}
                {isActive && (
                  <div className="w-6 h-0.5 bg-[#28B849] rounded-full mt-1" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
