import React from 'react';
import { X, Volume2, AlertCircle, BookOpen } from 'lucide-react';
import { GrammarPoint } from '../../types/grammar';
import { GrammarSentenceAnalysis } from './GrammarSentenceAnalysis';
import { speakChinese } from '../../utils/chineseSpeech';

interface GrammarDetailPanelProps {
  isOpen: boolean;
  onClose: () => void;
  grammarPoint: GrammarPoint | null;
  showToast?: (msg: string) => void;
}

export const GrammarDetailPanel: React.FC<GrammarDetailPanelProps> = ({
  isOpen,
  onClose,
  grammarPoint,
}) => {
  if (!isOpen || !grammarPoint) return null;

  const gp = grammarPoint;

  const handlePlayAudio = (text: string, rate: number = 0.8) => {
    speakChinese(text, rate);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in select-none">
      <div className="bg-white rounded-t-[28px] sm:rounded-2xl p-5 w-full max-w-[390px] max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl space-y-4 relative border border-slate-200">
        {/* Close Button Top Right */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title Banner */}
        <div className="space-y-1 pr-6">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
              {gp.hskLevel} • {gp.difficulty}
            </span>
            <span className="text-[10px] font-bold text-slate-500">
              {gp.category}
            </span>
          </div>

          <h3 className="text-lg font-black text-slate-900 leading-snug">
            {gp.titleVietnamese} ({gp.titleChinese})
          </h3>
        </div>

        {/* Summary Box */}
        <div className="bg-blue-50/80 p-3 rounded-xl border border-blue-200 text-xs text-blue-900 font-medium leading-relaxed">
          💡 {gp.summary}
        </div>

        {/* Formulas Section */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-900 flex items-center space-x-1">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>Công thức mẫu:</span>
          </span>

          <div className="space-y-2">
            {gp.formulas.map((form, idx) => (
              <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                <span className="text-xs font-extrabold text-blue-900 block">{form.pattern}</span>
                <span className="text-[11px] text-slate-600 block">{form.explanation}</span>

                <div className="pt-1 border-t border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 font-serif text-xs block">{form.exampleChinese}</span>
                    <span className="text-[10px] text-blue-700 block">{form.examplePinyin}</span>
                    <span className="text-[9.5px] text-slate-500 block">{form.exampleVietnamese}</span>
                  </div>

                  <button
                    onClick={() => handlePlayAudio(form.exampleChinese)}
                    type="button"
                    className="bg-blue-50 text-blue-700 p-1.5 rounded-full hover:bg-blue-100 cursor-pointer flex-shrink-0"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Usage Conditions */}
        {gp.usageConditions && gp.usageConditions.length > 0 && (
          <div className="space-y-1.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="font-bold text-slate-900 block">📌 Điều kiện sử dụng:</span>
            <ul className="space-y-1 pl-4 list-disc text-[11.5px]">
              {gp.usageConditions.map((cond, idx) => (
                <li key={idx}>{cond}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Sentence Analysis for First Example */}
        {gp.examples && gp.examples[0] && gp.examples[0].tokens && (
          <GrammarSentenceAnalysis
            chineseSentence={gp.examples[0].chinese}
            pinyinSentence={gp.examples[0].pinyin}
            vietnameseTranslation={gp.examples[0].vietnamese}
            tokens={gp.examples[0].tokens}
            audioText={gp.examples[0].audioText}
          />
        )}

        {/* Common Mistakes */}
        {gp.commonMistakes && gp.commonMistakes.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 space-y-1">
            <span className="font-bold flex items-center space-x-1 text-amber-800">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Lỗi thường gặp & Cách khắc phục:</span>
            </span>
            <ul className="space-y-1 pl-4 list-disc text-[11px]">
              {gp.commonMistakes.map((mis, idx) => (
                <li key={idx}>{mis}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Bottom Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2.5 rounded-xl text-xs font-bold shadow-md cursor-pointer active:scale-95 transition-transform"
        >
          Đóng cửa sổ
        </button>
      </div>
    </div>
  );
};
