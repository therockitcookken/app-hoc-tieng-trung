import React, { useState } from 'react';
import { Volume2, MessageSquare } from 'lucide-react';
import { ESSENTIAL_COMMUNICATION_DATA } from '../../data/dictionary/essentialCommunicationData';

interface EssentialCommunicationSectionProps {
  showToast?: (msg: string) => void;
}

export const EssentialCommunicationSection: React.FC<EssentialCommunicationSectionProps> = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Tất cả');

  const categories = ['Tất cả', 'Chào hỏi', 'Giới thiệu', 'Nhờ giúp đỡ', 'Khẩn cấp'];

  const filteredPhrases = ESSENTIAL_COMMUNICATION_DATA.filter((p) => {
    if (activeCategory === 'Tất cả') return true;
    return p.category === activeCategory;
  });

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
          <MessageSquare className="w-4 h-4 text-emerald-600" />
          <h2 className="text-[14px] font-extrabold text-slate-900 tracking-tight">
            Mẫu câu Giao tiếp Thiết yếu Thực tế
          </h2>
        </div>
        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
          Phản xạ giao tiếp
        </span>
      </div>

      {/* Category Chips */}
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-0.5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            type="button"
            className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Phrases Cards List */}
      <div className="space-y-2 max-h-[320px] overflow-y-auto no-scrollbar pt-1">
        {filteredPhrases.map((phrase) => (
          <div
            key={phrase.id}
            className={`p-3 rounded-xl border flex items-center justify-between transition-colors ${
              phrase.category === 'Khẩn cấp'
                ? 'bg-red-50/80 border-red-200'
                : 'bg-slate-50 border-slate-200 hover:bg-emerald-50/50'
            }`}
          >
            <div className="space-y-0.5">
              <div className="flex items-center space-x-2">
                <span className="text-base font-black text-slate-900 font-serif">
                  {phrase.chinese}
                </span>
                <span
                  className={`text-[9.5px] font-bold px-1.5 py-0.2 rounded ${
                    phrase.category === 'Khẩn cấp'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {phrase.category}
                </span>
              </div>
              <span className="text-xs font-bold text-emerald-800 block">
                {phrase.pinyin}
              </span>
              <span className="text-[11px] text-slate-600 block">
                👉 {phrase.vietnamese}
              </span>
            </div>

            <button
              onClick={() => handlePlayAudio(phrase.audioText)}
              type="button"
              className="bg-white p-2 rounded-full border border-slate-200 text-slate-600 hover:text-emerald-600 shadow-2xs active:scale-95 transition-transform flex-shrink-0 cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
