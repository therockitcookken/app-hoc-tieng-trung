import React, { useState } from 'react';
import { AlertOctagon, XCircle, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { COMMON_GRAMMAR_MISTAKES } from '../../data/grammarData';

export const CommonGrammarMistakes: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedMistakes = showAll ? COMMON_GRAMMAR_MISTAKES : COMMON_GRAMMAR_MISTAKES.slice(0, 2);

  return (
    <div className="w-full px-4 py-1.5 relative z-10">
      <div className="bg-white rounded-2xl p-4 shadow-[0_6px_20px_rgba(0,0,0,0.06)] border border-white/80 space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            <AlertOctagon className="w-4 h-4 text-red-500 fill-red-50" />
            <h2 className="text-[14px] font-extrabold text-[#242424] tracking-tight">
              Lỗi ngữ pháp thường gặp
            </h2>
          </div>

          <button
            onClick={() => setShowAll(!showAll)}
            type="button"
            className="text-[10.5px] text-[#1E52E8] font-bold flex items-center space-x-0.5 cursor-pointer"
          >
            <span>{showAll ? 'Thu gọn' : 'Xem thêm'}</span>
            {showAll ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Mistakes List */}
        <div className="space-y-2.5">
          {displayedMistakes.map((item) => (
            <div key={item.id} className="bg-slate-50 border border-slate-200/70 rounded-xl p-3 space-y-1.5 text-[11.5px]">
              {/* Wrong Sentence */}
              <div className="flex items-start space-x-1.5 text-red-700">
                <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-red-600 mr-1">Sai:</span>
                  <span className="font-serif font-bold">{item.wrongSentence}</span>
                </div>
              </div>

              {/* Correct Sentence */}
              <div className="flex items-start space-x-1.5 text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-emerald-600 mr-1">Đúng:</span>
                  <span className="font-serif font-bold">{item.correctSentence}</span>
                </div>
              </div>

              {/* Explanation */}
              <p className="text-[10.5px] text-slate-600 font-medium pl-5 pt-0.5 leading-snug">
                💡 <strong className="text-slate-800 font-bold">Giải thích:</strong> {item.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
