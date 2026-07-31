import React from 'react';
import { X, Volume2, AlertCircle } from 'lucide-react';
import { PronunciationInitial } from '../../data/pronunciation/initialsData';
import { PronunciationFinal } from '../../data/pronunciation/finalsData';
import { PinyinSyllable } from '../../data/pronunciation/syllablesData';
import { TonguePositionDiagram } from './TonguePositionDiagram';

interface PronunciationDetailPanelProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    type: 'initial' | 'final' | 'syllable';
    item: PronunciationInitial | PronunciationFinal | PinyinSyllable | any;
  } | null;
  showToast?: (msg: string) => void;
}

export const PronunciationDetailPanel: React.FC<PronunciationDetailPanelProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  if (!isOpen || !data || !data.item) return null;

  const item = data.item;
  const isInitial = data.type === 'initial';
  const isFinal = data.type === 'final';

  const titleSymbol = isInitial
    ? item.symbol
    : isFinal
    ? item.symbol
    : item.baseSyllable;

  const handlePlayAudio = (text: string, rate: number = 0.8) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';
      utterance.rate = rate;
      window.speechSynthesis.speak(utterance);
    }
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

        {/* Title Symbol Banner */}
        <div className="flex items-center space-x-3">
          <div className="w-14 h-14 rounded-2xl bg-[#EF3B32] text-white flex items-center justify-center font-extrabold text-2xl shadow-md flex-shrink-0">
            {titleSymbol}
          </div>
          <div>
            <span className="text-[10.5px] font-bold uppercase tracking-wider bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
              {isInitial ? item.groupName : isFinal ? item.categoryName : 'Âm tiết Phổ thông'}
            </span>
            <h3 className="text-lg font-black text-slate-900 mt-1">
              Phát âm chuẩn: {titleSymbol}
            </h3>
          </div>
        </div>

        {/* Audio Control Row */}
        <div className="flex items-center space-x-2 pt-1">
          <button
            onClick={() => handlePlayAudio(titleSymbol, 0.8)}
            type="button"
            className="flex-1 bg-[#EF3B32] hover:bg-[#D92329] text-white py-2 rounded-xl text-xs font-bold shadow-md active:scale-95 transition-transform flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <Volume2 className="w-4 h-4" />
            <span>Phát âm mẫu</span>
          </button>
          <button
            onClick={() => handlePlayAudio(titleSymbol, 0.6)}
            type="button"
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-2 rounded-xl text-xs font-bold active:scale-95 transition-transform cursor-pointer"
          >
            Đọc chậm 0.6x
          </button>
        </div>

        {/* Tongue Diagram Cutaway */}
        <TonguePositionDiagram
          diagramId={item.diagramId || 'diagram-bilabial-unasp'}
          title={`Mô phỏng mặt cắt lưỡi & khẩu hình: ${titleSymbol}`}
        />

        {/* Step-by-Step Guide or Articulation Details */}
        {isInitial && (
          <div className="space-y-2 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="font-bold text-slate-900 block">📝 Hướng dẫn đặt miệng từng bước:</span>
            <ul className="space-y-1 pl-4 list-disc text-[11.5px]">
              {item.stepByStepGuide?.map((step: string, idx: number) => (
                <li key={idx}>{step}</li>
              ))}
            </ul>
          </div>
        )}

        {isFinal && (
          <div className="space-y-2 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="font-bold text-slate-900 block">👄 Đặc điểm cấu âm:</span>
            <div className="grid grid-cols-2 gap-1.5 text-[11px]">
              <div>• Mở miệng: <strong>{item.mouthOpenness}</strong></div>
              <div>• Hình môi: <strong>{item.lipRounding}</strong></div>
              <div className="col-span-2">• Vị trí lưỡi: <strong>{item.tonguePosition}</strong></div>
            </div>
          </div>
        )}

        {/* Common Vietnamese Mistakes & How to Fix */}
        {item.commonVietnameseMistakes && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 space-y-1">
            <span className="font-bold flex items-center space-x-1 text-amber-800">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Lỗi người Việt thường mắc:</span>
            </span>
            <p className="text-[11px] leading-relaxed">{item.commonVietnameseMistakes}</p>
          </div>
        )}

        {/* Real Example Words Section */}
        {item.examples && item.examples.length > 0 && (
          <div className="space-y-2 pt-1">
            <span className="text-xs font-bold text-slate-900 block">
              📚 Từ vựng ví dụ thực tế ({item.examples.length}):
            </span>
            <div className="space-y-1.5">
              {item.examples.map((ex: any, idx: number) => (
                <div
                  key={idx}
                  onClick={() => handlePlayAudio(ex.audioText || ex.character || ex.simplified)}
                  className="bg-slate-50 hover:bg-red-50 p-2.5 rounded-xl border border-slate-200 flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div className="flex items-center space-x-2.5">
                    <span className="text-xl font-black text-slate-900 font-serif">
                      {ex.simplified || ex.character}
                    </span>
                    <div>
                      <span className="text-xs font-bold text-[#EF3B32] block">
                        {ex.pinyin || ex.pinyinWithTone}
                      </span>
                      <span className="text-[10.5px] text-slate-600 block">
                        {ex.vietnamese}
                      </span>
                    </div>
                  </div>

                  <Volume2 className="w-4 h-4 text-slate-400 hover:text-[#EF3B32]" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Close Action Button */}
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
