import React, { useState } from 'react';
import { Volume2, Briefcase } from 'lucide-react';
import { GRAMMAR_POINTS_DATA } from '../../data/grammar/grammarPointsData';

interface FactoryGrammarSectionProps {
  showToast?: (msg: string) => void;
}

export const FactoryGrammarSection: React.FC<FactoryGrammarSectionProps> = () => {
  const factoryTopics = GRAMMAR_POINTS_DATA.filter((gp) => gp.isFactoryTopic || gp.factoryExamples);
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(0);

  const topic = factoryTopics[selectedTopicIndex] || factoryTopics[0];

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
          <Briefcase className="w-4 h-4 text-orange-600" />
          <h2 className="text-[14px] font-extrabold text-slate-900 tracking-tight">
            Ngữ pháp Công xưởng & Nhà máy
          </h2>
        </div>
        <span className="text-[10px] bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full font-bold">
          Chủ điểm thực tế
        </span>
      </div>

      {/* Horizontal Topic Chips */}
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-0.5">
        {factoryTopics.map((tp, idx) => (
          <button
            key={tp.id}
            onClick={() => setSelectedTopicIndex(idx)}
            type="button"
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedTopicIndex === idx
                ? 'bg-orange-500 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {tp.titleChinese} ({tp.slug})
          </button>
        ))}
      </div>

      {/* Main Factory Topic Card */}
      {topic && (
        <div className="bg-orange-50/80 rounded-2xl p-3.5 border border-orange-200/80 space-y-2.5">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full">
                {topic.hskLevel} • {topic.difficulty}
              </span>
              <h3 className="text-base font-black text-slate-900 mt-1">
                {topic.titleVietnamese}
              </h3>
            </div>
          </div>

          <p className="text-xs text-slate-700 font-medium leading-relaxed">
            {topic.summary}
          </p>

          {/* Formulas List */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[10.5px] font-bold text-slate-500 block">Công thức áp dụng:</span>
            {topic.formulas.map((form, idx) => (
              <div key={idx} className="bg-white p-2.5 rounded-xl border border-orange-200 text-xs space-y-1">
                <span className="font-extrabold text-orange-900 block">{form.pattern}</span>
                <span className="text-[11px] text-slate-600 block">{form.explanation}</span>
              </div>
            ))}
          </div>

          {/* Factory Example Sentences */}
          {topic.factoryExamples && topic.factoryExamples.length > 0 && (
            <div className="space-y-2 pt-1">
              <span className="text-[10.5px] font-bold text-orange-900 block">
                🏭 Câu ví dụ ứng dụng nhà xưởng ({topic.factoryExamples.length}):
              </span>
              <div className="space-y-1.5">
                {topic.factoryExamples.map((ex) => (
                  <div
                    key={ex.id}
                    className="bg-white p-3 rounded-xl border border-orange-200 flex items-center justify-between"
                  >
                    <div className="space-y-0.5">
                      <span className="text-sm font-black text-slate-900 font-serif block">
                        {ex.chinese}
                      </span>
                      <span className="text-[11px] text-orange-800 font-bold block">
                        {ex.pinyin}
                      </span>
                      <span className="text-[10.5px] text-slate-600 block">
                        👉 {ex.vietnamese}
                      </span>
                    </div>

                    <button
                      onClick={() => handlePlayAudio(ex.audioText || ex.chinese)}
                      type="button"
                      className="bg-orange-50 text-orange-700 hover:bg-orange-100 p-2 rounded-full cursor-pointer transition-transform active:scale-95 flex-shrink-0"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
