import React, { useState } from 'react';
import { Volume2, Sparkles } from 'lucide-react';
import { GRAMMAR_COMPARISONS_DATA, GrammarComparisonPair } from '../../data/grammar/grammarComparisonsData';

interface GrammarComparisonModuleProps {
  showToast?: (msg: string) => void;
}

export const GrammarComparisonModule: React.FC<GrammarComparisonModuleProps> = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const pair: GrammarComparisonPair = GRAMMAR_COMPARISONS_DATA[selectedIndex] || GRAMMAR_COMPARISONS_DATA[0];

  const handlePlayAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl p-4 shadow-md border border-slate-100 space-y-3.5 relative overflow-hidden select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <div className="flex items-center space-x-1.5">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <h2 className="text-[14px] font-extrabold text-slate-900 tracking-tight">
            So sánh Cấu trúc Ngữ pháp Dễ nhầm
          </h2>
        </div>
        <span className="text-[10px] bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full font-bold">
          Cặp {selectedIndex + 1}/{GRAMMAR_COMPARISONS_DATA.length}
        </span>
      </div>

      {/* Horizontal Chips Navigation */}
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-0.5">
        {GRAMMAR_COMPARISONS_DATA.map((p, idx) => (
          <button
            key={p.id}
            onClick={() => setSelectedIndex(idx)}
            type="button"
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedIndex === idx
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {p.structureA} vs {p.structureB}
          </button>
        ))}
      </div>

      {/* Pair Detail Card */}
      <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 space-y-3">
        <h3 className="text-xs font-extrabold text-slate-900 text-center">
          {pair.title}
        </h3>

        <p className="text-[11px] text-slate-700 bg-white p-2.5 rounded-xl border border-slate-100 font-medium leading-relaxed">
          💡 <strong>Tóm tắt khác biệt:</strong> {pair.differenceSummary}
        </p>

        {/* Side by Side A vs B */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          {/* Structure A */}
          <div className="bg-white rounded-xl p-3 border border-purple-100 space-y-1.5 text-center">
            <span className="text-sm font-black text-purple-600 block">{pair.itemA.pattern}</span>
            <p className="text-[10.5px] text-slate-600 leading-tight min-h-[32px]">
              {pair.itemA.explanation}
            </p>
            <div className="pt-1 border-t border-slate-100 space-y-0.5">
              <span className="font-bold text-slate-900 font-serif text-xs block">{pair.itemA.exampleChinese}</span>
              <span className="text-[10px] text-purple-700 block">{pair.itemA.examplePinyin}</span>
              <span className="text-[9.5px] text-slate-500 block truncate">{pair.itemA.exampleVietnamese}</span>
            </div>
            <button
              onClick={() => handlePlayAudio(pair.itemA.exampleChinese)}
              type="button"
              className="mt-1 bg-purple-50 text-purple-700 px-2.5 py-1 rounded-full text-[10px] font-bold inline-flex items-center space-x-1 hover:bg-purple-100 cursor-pointer"
            >
              <Volume2 className="w-3 h-3" />
              <span>Nghe ví dụ A</span>
            </button>
          </div>

          {/* Structure B */}
          <div className="bg-white rounded-xl p-3 border border-purple-100 space-y-1.5 text-center">
            <span className="text-sm font-black text-indigo-600 block">{pair.itemB.pattern}</span>
            <p className="text-[10.5px] text-slate-600 leading-tight min-h-[32px]">
              {pair.itemB.explanation}
            </p>
            <div className="pt-1 border-t border-slate-100 space-y-0.5">
              <span className="font-bold text-slate-900 font-serif text-xs block">{pair.itemB.exampleChinese}</span>
              <span className="text-[10px] text-indigo-700 block">{pair.itemB.examplePinyin}</span>
              <span className="text-[9.5px] text-slate-500 block truncate">{pair.itemB.exampleVietnamese}</span>
            </div>
            <button
              onClick={() => handlePlayAudio(pair.itemB.exampleChinese)}
              type="button"
              className="mt-1 bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full text-[10px] font-bold inline-flex items-center space-x-1 hover:bg-indigo-100 cursor-pointer"
            >
              <Volume2 className="w-3 h-3" />
              <span>Nghe ví dụ B</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
