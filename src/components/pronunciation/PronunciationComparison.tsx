import React, { useState } from 'react';
import { Volume2, HelpCircle, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import { COMPARISON_PAIRS, PronunciationComparisonPair } from '../../data/pronunciation/comparisonsData';
import { speakChinese } from '../../utils/chineseSpeech';

interface PronunciationComparisonProps {
  showToast?: (msg: string) => void;
}

export const PronunciationComparison: React.FC<PronunciationComparisonProps> = ({ showToast }) => {
  const [selectedPairIndex, setSelectedPairIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState<'A' | 'B' | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const pair: PronunciationComparisonPair = COMPARISON_PAIRS[selectedPairIndex] || COMPARISON_PAIRS[0];

  const handlePlayAudio = (text: string) => {
    speakChinese(text, 0.8);
  };

  const handleAnswer = (option: 'A' | 'B') => {
    setUserAnswer(option);
    setShowExplanation(true);
    if (option === pair.practiceQuestion.correctOption) {
      showToast?.('Chính xác! Bạn đã nhận diện âm rất chuẩn +15 XP 🎉');
    } else {
      showToast?.('Rất tiếc! Thử nghe lại hai âm để phân biệt nhé.');
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl p-4 shadow-md border border-slate-100 space-y-3.5 relative overflow-hidden">
      {/* Header & Pair Selector */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <div className="flex items-center space-x-1.5">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <h2 className="text-[14px] font-extrabold text-slate-900 tracking-tight">
            So sánh cặp âm dễ nhầm lẫn
          </h2>
        </div>

        {/* Pair Navigation Dots / Selector */}
        <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
          Cặp {selectedPairIndex + 1}/{COMPARISON_PAIRS.length}
        </span>
      </div>

      {/* Horizontal Scroll Pair Chips */}
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-0.5">
        {COMPARISON_PAIRS.map((p, idx) => (
          <button
            key={p.id}
            onClick={() => {
              setSelectedPairIndex(idx);
              setUserAnswer(null);
              setShowExplanation(false);
            }}
            type="button"
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedPairIndex === idx
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {p.soundA} / {p.soundB}
          </button>
        ))}
      </div>

      {/* Main Pair Comparison Card (Side-by-side A vs B) */}
      <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200 space-y-3">
        <h3 className="text-xs font-bold text-slate-900 text-center">
          {pair.title}
        </h3>
        <p className="text-[11px] text-slate-600 text-center font-medium bg-white p-2 rounded-xl border border-slate-100">
          💡 {pair.differenceSummary}
        </p>

        {/* Side-by-side A vs B Grid */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          {/* Sound A */}
          <div className="bg-white rounded-xl p-3 shadow-2xs border border-purple-100 flex flex-col items-center space-y-2 text-center">
            <span className="text-2xl font-black text-purple-600">{pair.itemA.symbol}</span>
            <span className="text-[11px] font-bold text-slate-800">
              Chữ mẫu: <strong className="text-red-600 font-serif text-sm">{pair.itemA.exampleWord}</strong> ({pair.itemA.pinyin})
            </span>
            <p className="text-[10px] text-slate-500 line-clamp-2">
              {pair.itemA.description}
            </p>
            <button
              onClick={() => handlePlayAudio(pair.itemA.audioText)}
              type="button"
              className="bg-purple-50 text-purple-700 hover:bg-purple-100 px-3 py-1.5 rounded-full text-xs font-bold flex items-center space-x-1 cursor-pointer active:scale-95 transition-transform"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Nghe âm A</span>
            </button>
          </div>

          {/* Sound B */}
          <div className="bg-white rounded-xl p-3 shadow-2xs border border-purple-100 flex flex-col items-center space-y-2 text-center">
            <span className="text-2xl font-black text-rose-600">{pair.itemB.symbol}</span>
            <span className="text-[11px] font-bold text-slate-800">
              Chữ mẫu: <strong className="text-red-600 font-serif text-sm">{pair.itemB.exampleWord}</strong> ({pair.itemB.pinyin})
            </span>
            <p className="text-[10px] text-slate-500 line-clamp-2">
              {pair.itemB.description}
            </p>
            <button
              onClick={() => handlePlayAudio(pair.itemB.audioText)}
              type="button"
              className="bg-rose-50 text-rose-700 hover:bg-rose-100 px-3 py-1.5 rounded-full text-xs font-bold flex items-center space-x-1 cursor-pointer active:scale-95 transition-transform"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Nghe âm B</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Practice Question */}
      <div className="bg-purple-50/80 rounded-2xl p-3.5 border border-purple-200/80 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-purple-900 flex items-center space-x-1">
            <HelpCircle className="w-4 h-4 text-purple-600" />
            <span>Thách thức nhận diện âm thanh</span>
          </span>
          <button
            onClick={() => handlePlayAudio(pair.practiceQuestion.audioTargetText)}
            type="button"
            className="bg-purple-600 text-white px-3 py-1 rounded-full text-[11px] font-bold flex items-center space-x-1 shadow-xs active:scale-95 transition-transform cursor-pointer"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Phát âm ẩn</span>
          </button>
        </div>

        <p className="text-xs text-slate-700 font-medium">
          {pair.practiceQuestion.questionText}
        </p>

        {/* Options Row */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => handleAnswer('A')}
            type="button"
            className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              userAnswer === 'A'
                ? pair.practiceQuestion.correctOption === 'A'
                  ? 'bg-emerald-500 text-white border-emerald-600'
                  : 'bg-red-500 text-white border-red-600'
                : 'bg-white text-slate-800 border-purple-200 hover:border-purple-300'
            }`}
          >
            Âm A ({pair.itemA.symbol})
          </button>
          <button
            onClick={() => handleAnswer('B')}
            type="button"
            className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              userAnswer === 'B'
                ? pair.practiceQuestion.correctOption === 'B'
                  ? 'bg-emerald-500 text-white border-emerald-600'
                  : 'bg-red-500 text-white border-red-600'
                : 'bg-white text-slate-800 border-purple-200 hover:border-purple-300'
            }`}
          >
            Âm B ({pair.itemB.symbol})
          </button>
        </div>

        {/* Feedback & Explanation */}
        {showExplanation && (
          <div
            className={`p-2.5 rounded-xl text-[11px] font-medium flex items-start space-x-2 border ${
              userAnswer === pair.practiceQuestion.correctOption
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-red-50 text-red-800 border-red-200'
            }`}
          >
            {userAnswer === pair.practiceQuestion.correctOption ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <span className="font-bold block">
                {userAnswer === pair.practiceQuestion.correctOption
                  ? 'Chính xác!'
                  : 'Chưa chính xác!'}
              </span>
              <span>{pair.practiceQuestion.explanation}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
