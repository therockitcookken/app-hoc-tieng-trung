import React from 'react';
import { X, Volume2, AlertCircle } from 'lucide-react';
import { TonguePositionDiagram } from './TonguePositionDiagram';
import { speakChinese } from '../../utils/chineseSpeech';

export type PronunciationDetailData = {
  type: 'initial' | 'final' | 'syllable';
  item: any;
};

interface PronunciationDetailPanelProps {
  isOpen: boolean;
  onClose: () => void;
  data: PronunciationDetailData | null;
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

  const sampleAudioText = item.examples?.[0]?.audioText || item.examples?.[0]?.character || titleSymbol;

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

          {/* Title Symbol Banner */}
          <div className="flex items-center space-x-3 pr-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#EF3B32] to-[#D92329] text-white flex items-center justify-center font-black text-2xl shadow-lg flex-shrink-0">
              {titleSymbol}
            </div>
            <div>
              <span className="eyebrow-pill bg-red-500/10 text-red-600 border-red-500/20">
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
              onClick={() => handlePlayAudio(sampleAudioText, 0.8)}
              type="button"
              className="flex-1 btn-3d-red text-white py-2.5 rounded-2xl text-xs font-black shadow-md flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>Phát âm mẫu</span>
            </button>
            <button
              onClick={() => handlePlayAudio(sampleAudioText, 0.6)}
              type="button"
              className="bg-slate-100 hover:bg-slate-200 text-slate-900 px-3.5 py-2.5 rounded-2xl text-xs font-extrabold border border-slate-200 cursor-pointer active:scale-95 transition-spring shadow-2xs"
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
            <div className="space-y-2 text-xs text-slate-700 bg-slate-50/90 p-3.5 rounded-2xl border border-slate-200/80">
              <span className="font-black text-slate-900 block">📝 Hướng dẫn đặt miệng từng bước:</span>
              <ul className="space-y-1 pl-4 list-disc text-[11.5px] font-medium">
                {item.stepByStepGuide?.map((step: string, idx: number) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
            </div>
          )}

          {isFinal && (
            <div className="space-y-2 text-xs text-slate-700 bg-slate-50/90 p-3.5 rounded-2xl border border-slate-200/80">
              <span className="font-black text-slate-900 block">👄 Đặc điểm cấu âm:</span>
              <div className="grid grid-cols-2 gap-1.5 text-[11px] font-semibold">
                <div>• Mở miệng: <strong className="text-slate-900">{item.mouthOpenness}</strong></div>
                <div>• Hình môi: <strong className="text-slate-900">{item.lipRounding}</strong></div>
                <div className="col-span-2">• Vị trí lưỡi: <strong className="text-slate-900">{item.tonguePosition}</strong></div>
              </div>
            </div>
          )}

          {/* Common Vietnamese Mistakes & How to Fix */}
          {item.commonVietnameseMistakes && (
            <div className="bg-amber-50/90 border border-amber-200/80 rounded-2xl p-3.5 text-xs text-amber-900 space-y-1.5 shadow-2xs">
              <span className="font-black flex items-center space-x-1.5 text-amber-800">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>Lỗi người Việt thường mắc:</span>
              </span>
              <p className="text-[11.5px] font-medium leading-relaxed">{item.commonVietnameseMistakes}</p>
            </div>
          )}

          {/* Real Example Words Section */}
          {item.examples && item.examples.length > 0 && (
            <div className="space-y-2 pt-1">
              <span className="text-xs font-black text-slate-900 block">
                📚 Từ vựng ví dụ thực tế ({item.examples.length}):
              </span>
              <div className="space-y-2">
                {item.examples.map((ex: any, idx: number) => (
                  <div
                    key={idx}
                    onClick={() => handlePlayAudio(ex.audioText || ex.character || ex.simplified)}
                    className="bg-slate-50/90 hover:bg-red-50/90 p-3 rounded-2xl border border-slate-200/80 hover:border-red-200 flex items-center justify-between cursor-pointer transition-spring shadow-2xs group"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl font-black text-slate-900 font-sans group-hover:scale-105 transition-spring">
                        {ex.simplified || ex.character}
                      </span>
                      <div>
                        <span className="text-xs font-extrabold text-[#EF3B32] block">
                          {ex.pinyin || ex.pinyinWithTone}
                        </span>
                        <span className="text-[10.5px] font-medium text-slate-600 block">
                          {ex.vietnamese}
                        </span>
                      </div>
                    </div>

                    <div className="w-7 h-7 rounded-full bg-white text-slate-400 group-hover:text-[#EF3B32] border border-slate-200 flex items-center justify-center flex-shrink-0 transition-colors">
                      <Volume2 className="w-3.5 h-3.5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Close Action Button */}
          <div className="pt-2 sticky bottom-0 bg-white pb-1">
            <button
              onClick={onClose}
              type="button"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-2xl text-xs font-black shadow-lg cursor-pointer active:scale-95 transition-spring"
            >
              Đã hiểu & Đóng cửa sổ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
