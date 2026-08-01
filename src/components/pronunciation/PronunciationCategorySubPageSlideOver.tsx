import React, { useMemo } from 'react';
import { ArrowLeft, X, Volume2 } from 'lucide-react';
import { FullPinyinChart } from './FullPinyinChart';
import { TonguePositionDiagram } from './TonguePositionDiagram';
import { PronunciationComparison } from './PronunciationComparison';
import { FactoryPronunciationSection } from './FactoryPronunciationSection';
import { PronunciationExercise } from './PronunciationExercise';
import { INITIALS_DATA } from '../../data/pronunciation/initialsData';
import { FINALS_DATA } from '../../data/pronunciation/finalsData';
import { MANDARIN_TONES } from '../../data/pronunciation/tonesData';
import { speakChinese } from '../../utils/chineseSpeech';

export type PronunciationCategoryTab =
  | 'pinyin-chart'
  | 'initials'
  | 'finals'
  | 'tones'
  | 'tongue-diagrams'
  | 'comparisons'
  | 'exercises'
  | 'factory';

interface PronunciationCategorySubPageSlideOverProps {
  isOpen: boolean;
  onClose: () => void;
  categoryTab: PronunciationCategoryTab | null;
  onSelectDetail: (type: string, item: any) => void;
  showToast?: (msg: string) => void;
}

export const PronunciationCategorySubPageSlideOver: React.FC<PronunciationCategorySubPageSlideOverProps> = ({
  isOpen,
  onClose,
  categoryTab,
  onSelectDetail,
  showToast,
}) => {

  const categoryMeta = useMemo(() => {
    switch (categoryTab) {
      case 'pinyin-chart':
        return {
          title: 'Bảng Bính Âm Pinyin Toàn Diện (~400 Âm)',
          subtitle: 'Ma trận phát âm chuẩn xác từng âm tiết trong Hán ngữ Phổ thông',
          badge: 'Bảng chuẩn Pinyin',
        };
      case 'initials':
        return {
          title: '21 Phụ Âm (Thanh Mẫu 声母)',
          subtitle: 'Hệ thống phụ âm đầu lưỡi, môi, răng và cuống lưỡi',
          badge: 'Phụ âm (21)',
        };
      case 'finals':
        return {
          title: 'Các Vận Mẫu (Vần 韵母)',
          subtitle: 'Vận mẫu đơn, vận mẫu kép, vận mẫu mũi & vận mẫu uốn lưỡi (er)',
          badge: 'Vận mẫu cốt lõi',
        };
      case 'tones':
        return {
          title: '5 Thanh Điệu & Quy Tắc Biến Điệu (声调 & 变调)',
          subtitle: 'Thanh 1, 2, 3, 4, Thanh nhẹ và các quy tắc biến điệu 一, 不, 3+3',
          badge: 'Thanh điệu',
        };
      case 'tongue-diagrams':
        return {
          title: 'Sơ Đồ Vị Trí Lưỡi & Khẩu Hình Phát Âm',
          subtitle: 'Mô phỏng 3D hình dáng khoang miệng, vị trí đặt lưỡi chuẩn xác',
          badge: 'Khẩu hình 3D',
        };
      case 'comparisons':
        return {
          title: 'So Sánh Các Cặp Âm Dễ Nhầm Lẫn (z/c/s, zh/ch/sh, b/p...)',
          subtitle: 'Phương pháp luyện tập phản xạ phân biệt âm bật hơi và không bật hơi',
          badge: 'Phân biệt âm',
        };
      case 'exercises':
        return {
          title: 'Luyện Tập Phản Xạ Âm Tiệu & Đọc Âm Chuẩn',
          subtitle: 'Bài tập trắc nghiệm nghe phân biệt âm và thực hành đọc',
          badge: 'Luyện tập',
        };
      case 'factory':
        return {
          title: 'Thuật Ngữ & Phát Âm Chuyên Ngành Công Xưởng',
          subtitle: 'Từ vựng khẩu lệnh sản xuất, vị trí máy móc và tên linh kiện',
          badge: 'Công xưởng phát âm',
        };
      default:
        return {
          title: 'Chi Tiết Chuyên Đề Phát Âm',
          subtitle: 'Hệ thống bài học âm tiết Hán ngữ',
          badge: 'Chuyên đề',
        };
    }
  }, [categoryTab]);

  const handlePlayAudio = (text: string) => {
    speakChinese(text, 0.8);
  };

  if (!isOpen || !categoryTab) return null;

  return (
    <div className="fixed inset-0 z-[95] w-full h-full bg-slate-950/90 backdrop-blur-2xl flex justify-center animate-fade-in select-none">
      {/* Full-Screen Sub-Page Container matching Main Screen */}
      <div className="w-full h-full bg-[#1E0607] text-slate-100 flex flex-col shadow-2xl overflow-hidden transform transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)]">
        {/* Top Header Navigation Bar */}
        <div className="p-4 sm:p-6 bg-[#3B0A0C]/95 border-b border-rose-900/80 flex items-center justify-between sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-black text-xs sm:text-sm flex items-center space-x-2 border border-white/15 transition-spring active:scale-95 cursor-pointer shadow-md"
            >
              <ArrowLeft className="w-4.5 h-4.5 stroke-[2.5]" />
              <span>Quay lại trang gốc</span>
            </button>

            <span className="eyebrow-pill bg-rose-500/20 text-rose-300 border-rose-500/30">
              {categoryMeta.badge}
            </span>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="w-10 h-10 rounded-full bg-rose-950 text-rose-300 hover:text-white flex items-center justify-center cursor-pointer transition-spring active:scale-90 border border-rose-800"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-Page Content Area matching Main Screen footprint */}
        <div className="flex-1 overflow-y-auto max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6 no-scrollbar pb-32">
          {/* Hero Banner */}
          <div className="bezel-outer-shell bg-gradient-to-br from-[#3B0A0C] to-[#120304] border-rose-900/60">
            <div className="bezel-inner-core bg-[#3B0A0C] p-5 sm:p-6 border-rose-900/80 text-slate-100 space-y-2">
              <span className="text-[10px] font-black uppercase tracking-widest bg-rose-500/20 text-rose-300 border border-rose-500/30 px-3 py-0.5 rounded-full">
                Hán Ngữ Phổ Thông Chuẩn
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
                {categoryMeta.title}
              </h1>
              <p className="text-xs sm:text-sm text-rose-200/80 font-medium">
                {categoryMeta.subtitle}
              </p>
            </div>
          </div>

          {/* Sub-Page Body View Options */}
          {categoryTab === 'pinyin-chart' && (
            <div className="bg-[#3B0A0C] rounded-3xl p-4 sm:p-6 border border-rose-900/80">
              <FullPinyinChart onSelectSyllable={(syl) => onSelectDetail('syllable', syl)} />
            </div>
          )}

          {categoryTab === 'tongue-diagrams' && (
            <div className="bg-[#3B0A0C] rounded-3xl p-4 sm:p-6 border border-rose-900/80">
              <TonguePositionDiagram diagramId="diag-b-p-m-f" />
            </div>
          )}

          {categoryTab === 'comparisons' && (
            <div className="bg-[#3B0A0C] rounded-3xl p-4 sm:p-6 border border-rose-900/80">
              <PronunciationComparison showToast={showToast} />
            </div>
          )}

          {categoryTab === 'exercises' && (
            <div className="bg-[#3B0A0C] rounded-3xl p-4 sm:p-6 border border-rose-900/80">
              <PronunciationExercise showToast={showToast} />
            </div>
          )}

          {categoryTab === 'factory' && (
            <div className="bg-[#3B0A0C] rounded-3xl p-4 sm:p-6 border border-rose-900/80">
              <FactoryPronunciationSection showToast={showToast} />
            </div>
          )}

          {categoryTab === 'initials' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {INITIALS_DATA.map((item) => (
                <div
                  key={item.symbol}
                  onClick={() => onSelectDetail('initial', item)}
                  className="bezel-outer-shell bg-[#3B0A0C] border-rose-900/60 p-4 cursor-pointer hover:border-rose-400 transition-spring text-center space-y-2"
                >
                  <span className="text-3xl font-black text-rose-300 block font-mono">{item.symbol}</span>
                  <span className="text-xs text-rose-200 block font-bold">{item.groupName}</span>
                  <p className="text-[11px] text-slate-300 line-clamp-2">{item.description}</p>
                </div>
              ))}
            </div>
          )}

          {categoryTab === 'finals' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {FINALS_DATA.map((item) => (
                <div
                  key={item.symbol}
                  onClick={() => onSelectDetail('final', item)}
                  className="bezel-outer-shell bg-[#3B0A0C] border-rose-900/60 p-4 cursor-pointer hover:border-rose-400 transition-spring text-center space-y-2"
                >
                  <span className="text-3xl font-black text-rose-300 block font-mono">{item.symbol}</span>
                  <span className="text-xs text-rose-200 block font-bold">{item.categoryName}</span>
                  <p className="text-[11px] text-slate-300 line-clamp-2">{item.vietnameseApprox}</p>
                </div>
              ))}
            </div>
          )}

          {categoryTab === 'tones' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MANDARIN_TONES.map((tone) => (
                  <div key={tone.toneNumber} className="bezel-outer-shell bg-[#3B0A0C] border-rose-900/60 p-5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-black text-rose-300">{tone.name}</span>
                      <button
                        onClick={() => handlePlayAudio(tone.symbolExample)}
                        type="button"
                        className="w-8 h-8 rounded-full bg-rose-900/80 text-white flex items-center justify-center cursor-pointer active:scale-90 transition-spring"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs font-mono text-amber-300 font-bold bg-slate-950 p-2 rounded-xl border border-slate-800">
                      Mô phỏng: {tone.symbolExample} ({tone.pitchContour})
                    </p>
                    <p className="text-xs text-slate-300">{tone.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
