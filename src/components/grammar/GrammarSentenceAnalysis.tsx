import React, { useState } from 'react';
import { Volume2, Sparkles, Layers } from 'lucide-react';
import { SentenceAnalysisToken } from '../../types/grammar';

interface GrammarSentenceAnalysisProps {
  chineseSentence: string;
  pinyinSentence: string;
  vietnameseTranslation: string;
  tokens: SentenceAnalysisToken[];
  audioText?: string;
  title?: string;
  className?: string;
}

export const GrammarSentenceAnalysis: React.FC<GrammarSentenceAnalysisProps> = ({
  chineseSentence,
  pinyinSentence,
  vietnameseTranslation,
  tokens,
  audioText,
  title = 'Phân tích cấu trúc thành phần câu',
  className = '',
}) => {
  const [activeToken, setActiveToken] = useState<SentenceAnalysisToken | null>(null);

  const handlePlayAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(audioText || chineseSentence);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className={`bg-white rounded-2xl p-4 shadow-md border border-slate-100 space-y-3 select-none ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <div className="flex items-center space-x-1.5">
          <Layers className="w-4 h-4 text-blue-600" />
          <h3 className="text-xs font-extrabold text-slate-900 tracking-tight">
            {title}
          </h3>
        </div>

        <button
          onClick={handlePlayAudio}
          type="button"
          className="bg-blue-50 text-blue-700 hover:bg-blue-100 px-2.5 py-1 rounded-full text-[10.5px] font-bold flex items-center space-x-1 active:scale-95 transition-transform cursor-pointer"
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>Nghe câu</span>
        </button>
      </div>

      {/* Main Full Sentence Header */}
      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
        <span className="text-lg font-black text-slate-900 font-serif block">
          {chineseSentence}
        </span>
        <span className="text-xs font-bold text-blue-700 block">
          {pinyinSentence}
        </span>
        <span className="text-[11.5px] text-slate-600 font-medium block">
          👉 {vietnameseTranslation}
        </span>
      </div>

      {/* Color-Coded Token Blocks Flow */}
      <div className="space-y-1.5 pt-1">
        <span className="text-[10.5px] font-bold text-slate-400 block">
          Chạm vào từng khối từ để xem thành phần ngữ pháp:
        </span>

        <div className="flex flex-wrap gap-1.5">
          {tokens.map((token, idx) => {
            const isSelected = activeToken?.word === token.word;
            return (
              <button
                key={idx}
                onClick={() => setActiveToken(isSelected ? null : token)}
                type="button"
                className={`px-2.5 py-1.5 rounded-xl border text-center transition-all cursor-pointer ${
                  token.colorClass
                } ${isSelected ? 'ring-2 ring-blue-500 scale-105 shadow-sm' : 'hover:opacity-90'}`}
              >
                <span className="text-sm font-black font-serif block leading-none">
                  {token.word}
                </span>
                <span className="text-[9.5px] font-bold block opacity-80 mt-0.5">
                  {token.role}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Token Detail Explanation Box */}
      {activeToken && (
        <div className="bg-blue-50 border border-blue-200 p-2.5 rounded-xl text-xs space-y-0.5 animate-fade-in">
          <div className="flex items-center space-x-1.5 text-blue-900 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Thành phần: {activeToken.word} ({activeToken.pinyin})</span>
          </div>
          <span className="text-[11px] font-extrabold text-blue-700 block">
            Vai trò: {activeToken.role}
          </span>
          <p className="text-[10.5px] text-slate-700 leading-relaxed">
            {activeToken.roleDescription}
          </p>
        </div>
      )}
    </div>
  );
};
