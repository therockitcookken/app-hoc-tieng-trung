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
    <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-md z-[100] flex items-center justify-center p-4 sm:p-6 animate-fade-in select-none">
      {/* Outer Shell Double-Bezel Container */}
      <div className="bg-white/95 rounded-[2.2rem] p-1.5 w-full max-w-[440px] max-h-[84dvh] shadow-2xl border border-slate-200/80 relative flex flex-col">
        {/* Inner Core Content Area with Custom Scrollbar */}
        <div className="bg-white rounded-[calc(2.2rem-0.375rem)] p-5 sm:p-6 overflow-y-auto no-scrollbar space-y-4 relative flex-1">
          {/* Close Button Top Right */}
          <button
            onClick={onClose}
            type="button"
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center absolute top-4 right-4 cursor-pointer transition-spring active:scale-90 z-10"
            aria-label="Đóng"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>

          {/* Title Banner */}
          <div className="space-y-1.5 pr-8">
            <div className="flex items-center space-x-2 flex-wrap gap-y-1">
              <span className="eyebrow-pill bg-blue-500/10 text-blue-600 border-blue-500/20">
                {gp.hskLevel} • {gp.difficulty}
              </span>
              <span className="text-[10px] font-extrabold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                {gp.category}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
              {gp.titleVietnamese} ({gp.titleChinese})
            </h3>
          </div>

          {/* Summary Box */}
          <div className="bg-blue-50/90 p-3.5 rounded-2xl border border-blue-200/80 text-xs text-blue-900 font-semibold leading-relaxed shadow-2xs">
            💡 {gp.summary}
          </div>

          {/* Formulas Section */}
          <div className="space-y-2">
            <span className="text-xs font-black text-slate-900 flex items-center space-x-1.5">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>Công thức mẫu:</span>
            </span>

            <div className="space-y-2">
              {gp.formulas.map((form, idx) => (
                <div key={idx} className="bg-slate-50/90 p-3.5 rounded-2xl border border-slate-200/80 space-y-1.5 shadow-2xs">
                  <span className="text-xs font-black text-blue-900 block font-mono">{form.pattern}</span>
                  <span className="text-[11.5px] text-slate-600 font-medium block">{form.explanation}</span>

                  <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between">
                    <div>
                      <span className="font-black text-slate-900 font-sans text-xs block">{form.exampleChinese}</span>
                      <span className="text-[10.5px] font-bold text-blue-600 block">{form.examplePinyin}</span>
                      <span className="text-[10px] text-slate-500 block font-medium">{form.exampleVietnamese}</span>
                    </div>

                    <button
                      onClick={() => handlePlayAudio(form.exampleChinese)}
                      type="button"
                      className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 flex items-center justify-center cursor-pointer transition-spring active:scale-90 flex-shrink-0"
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
            <div className="space-y-1.5 text-xs text-slate-700 bg-slate-50/90 p-3.5 rounded-2xl border border-slate-200/80">
              <span className="font-black text-slate-900 block">📌 Điều kiện sử dụng:</span>
              <ul className="space-y-1 pl-4 list-disc text-[11.5px] font-medium text-slate-700">
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
            <div className="bg-amber-50/90 border border-amber-200/80 rounded-2xl p-3.5 text-xs text-amber-900 space-y-1.5 shadow-2xs">
              <span className="font-black flex items-center space-x-1.5 text-amber-800">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>Lỗi thường gặp & Cách khắc phục:</span>
              </span>
              <ul className="space-y-1 pl-4 list-disc text-[11.5px] font-medium">
                {gp.commonMistakes.map((mis, idx) => (
                  <li key={idx}>{mis}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Bottom Close Button */}
          <div className="pt-2 sticky bottom-0 bg-white pb-1">
            <button
              onClick={onClose}
              type="button"
              className="w-full btn-3d-blue text-white py-3 rounded-2xl text-xs font-black shadow-lg cursor-pointer flex items-center justify-center space-x-1.5"
            >
              <span>Đã hiểu & Đóng cửa sổ</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
