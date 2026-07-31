import React, { useState } from 'react';
import { Volume2, Briefcase } from 'lucide-react';
import { FACTORY_PRONUNCIATION_DATA, FactoryWordPronunciation } from '../../data/pronunciation/factoryPronunciationData';

interface FactoryPronunciationSectionProps {
  showToast?: (msg: string) => void;
}

export const FactoryPronunciationSection: React.FC<FactoryPronunciationSectionProps> = ({ showToast }) => {
  const [activeCategory, setActiveCategory] = useState<string>('Tất cả');
  const [speechRate, setSpeechRate] = useState<number>(0.8);
  const [selectedWord, setSelectedWord] = useState<FactoryWordPronunciation>(FACTORY_PRONUNCIATION_DATA[0]);

  const categories = ['Tất cả', 'An toàn', 'Thiết bị', 'Thao tác', 'Chất lượng', 'Nhà xưởng'];

  const filteredWords = FACTORY_PRONUNCIATION_DATA.filter((w) => {
    if (activeCategory === 'Tất cả') return true;
    return w.category === activeCategory;
  });

  const handlePlayAudio = (text: string, rate: number = speechRate) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';
      utterance.rate = rate;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl p-4 shadow-md border border-slate-100 space-y-3.5 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <div className="flex items-center space-x-1.5">
          <Briefcase className="w-4 h-4 text-amber-600" />
          <h2 className="text-[14px] font-extrabold text-slate-900 tracking-tight">
            Phát âm Từ vựng Công Xưởng
          </h2>
        </div>
        <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
          30+ Thuật ngữ nhà máy
        </span>
      </div>

      {/* Speed Controls & Category Filter */}
      <div className="space-y-2">
        {/* Speed Controls Row */}
        <div className="flex items-center justify-between bg-slate-50 p-2 rounded-xl border border-slate-100">
          <span className="text-[11px] font-bold text-slate-700">Tốc độ âm thanh:</span>
          <div className="flex items-center space-x-1">
            {([0.6, 0.8, 1.0, 1.25] as const).map((rate) => (
              <button
                key={rate}
                onClick={() => {
                  setSpeechRate(rate);
                  showToast?.(`Tốc độ phát âm: ${rate}x`);
                }}
                type="button"
                className={`px-2 py-0.5 rounded-lg text-[10.5px] font-bold transition-all cursor-pointer ${
                  speechRate === rate
                    ? 'bg-amber-500 text-white shadow-2xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {rate}x {rate === 0.6 ? '(Rất chậm)' : rate === 0.8 ? '(Chậm)' : ''}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-0.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              type="button"
              className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Active Featured Word Detail Card */}
      {selectedWord && (
        <div className="bg-amber-50/90 rounded-2xl p-3.5 border border-amber-200/80 space-y-2.5">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                {selectedWord.category}
              </span>
              <div className="flex items-baseline space-x-2 mt-1">
                <span className="text-2xl font-black text-slate-900 font-serif">
                  {selectedWord.chinese}
                </span>
                <span className="text-sm font-bold text-amber-800">
                  {selectedWord.pinyin}
                </span>
              </div>
              <p className="text-xs text-slate-700 font-medium">
                {selectedWord.vietnamese}
              </p>
            </div>

            {/* Audio Play Buttons */}
            <div className="flex flex-col space-y-1.5">
              <button
                onClick={() => handlePlayAudio(selectedWord.audioText, speechRate)}
                type="button"
                className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1 shadow-sm active:scale-95 transition-transform cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>Nghe chuẩn</span>
              </button>
              <button
                onClick={() => handlePlayAudio(selectedWord.audioText, 0.6)}
                type="button"
                className="bg-white text-amber-800 border border-amber-300 px-3 py-1 rounded-xl text-[10.5px] font-bold flex items-center space-x-1 hover:bg-amber-100 active:scale-95 transition-transform cursor-pointer"
              >
                <Volume2 className="w-3 h-3" />
                <span>Đọc chậm 0.6x</span>
              </button>
            </div>
          </div>

          {/* Syllables Breakdown Row */}
          <div className="pt-1">
            <span className="text-[10.5px] font-bold text-slate-500 block mb-1">
              Phân tích âm tiết & thanh điệu:
            </span>
            <div className="flex items-center space-x-2">
              {selectedWord.syllablesBreakdown.map((syl, idx) => (
                <div key={idx} className="bg-white rounded-lg px-2.5 py-1 border border-amber-200 text-center">
                  <span className="text-xs font-black text-amber-900 block">{syl.char}</span>
                  <span className="text-[10px] text-slate-600 block">{syl.pinyin} (T{syl.tone})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Difficult Sound Note if any */}
          {selectedWord.difficultSoundNote && (
            <div className="text-[10.5px] text-amber-900 bg-amber-100/80 p-2 rounded-xl font-medium border border-amber-300/60">
              💡 {selectedWord.difficultSoundNote}
            </div>
          )}

          {/* Example Sentence */}
          <div className="bg-white p-2.5 rounded-xl border border-amber-100 text-xs space-y-0.5">
            <span className="font-bold text-slate-900 font-serif block">
              {selectedWord.exampleSentenceChinese}
            </span>
            <span className="text-[11px] text-amber-700 block">
              {selectedWord.exampleSentencePinyin}
            </span>
            <span className="text-[10.5px] text-slate-600 block">
              👉 {selectedWord.exampleSentenceVietnamese}
            </span>
          </div>
        </div>
      )}

      {/* Grid of Factory Words */}
      <div className="grid grid-cols-2 gap-2 max-h-[260px] overflow-y-auto no-scrollbar pt-1">
        {filteredWords.map((word) => (
          <button
            key={word.id}
            onClick={() => setSelectedWord(word)}
            type="button"
            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
              selectedWord.id === word.id
                ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                : 'bg-slate-50 hover:bg-amber-50 border-slate-200 text-slate-800'
            }`}
          >
            <div className="flex items-baseline justify-between">
              <span className="text-base font-black font-serif">{word.chinese}</span>
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  selectedWord.id === word.id ? 'bg-amber-600 text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {word.pinyin}
              </span>
            </div>
            <span
              className={`text-[10.5px] truncate block mt-0.5 font-medium ${
                selectedWord.id === word.id ? 'text-amber-100' : 'text-slate-500'
              }`}
            >
              {word.vietnamese}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
