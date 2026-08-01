import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChineseBackground } from '../components/ChineseBackground';
import { StatusBar } from '../components/StatusBar';
import { PronunciationHeader } from '../components/pronunciation/PronunciationHeader';
import { PronunciationProgressCard } from '../components/pronunciation/PronunciationProgressCard';
import { TodayPracticeCard } from '../components/pronunciation/TodayPracticeCard';
import { RecommendedLessons } from '../components/pronunciation/RecommendedLessons';
import { PronunciationTipCard } from '../components/pronunciation/PronunciationTipCard';
import { CurrentLessonPlayer } from '../components/pronunciation/CurrentLessonPlayer';
import { BottomNavigation } from '../components/BottomNavigation';
import { PronunciationDetailsModal } from '../components/pronunciation/PronunciationDetailsModal';
import { speakChinese } from '../utils/chineseSpeech';

// New Comprehensive Pronunciation Components
import { FullPinyinChart } from '../components/pronunciation/FullPinyinChart';
import { TonguePositionDiagram } from '../components/pronunciation/TonguePositionDiagram';
import { PronunciationComparison } from '../components/pronunciation/PronunciationComparison';
import { PronunciationSearch } from '../components/pronunciation/PronunciationSearch';
import { FactoryPronunciationSection } from '../components/pronunciation/FactoryPronunciationSection';
import { PronunciationExercise } from '../components/pronunciation/PronunciationExercise';
import { PronunciationDetailPanel } from '../components/pronunciation/PronunciationDetailPanel';
import { PronunciationCategorySubPageSlideOver, PronunciationCategoryTab } from '../components/pronunciation/PronunciationCategorySubPageSlideOver';

// Data Imports
import { INITIALS_DATA } from '../data/pronunciation/initialsData';
import { FINALS_DATA } from '../data/pronunciation/finalsData';
import { MANDARIN_TONES, TONE_SANDHI_RULES } from '../data/pronunciation/tonesData';
import { DEFAULT_PRACTICE, LessonItem } from '../data/pronunciationData';

type PronunciationTab =
  | 'overview'
  | 'pinyin-chart'
  | 'initials'
  | 'finals'
  | 'tones'
  | 'tongue-diagrams'
  | 'comparisons'
  | 'exercises'
  | 'factory';

interface PronunciationPageProps {
  showToast?: (msg: string) => void;
}

export const PronunciationPage: React.FC<PronunciationPageProps> = ({ showToast }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<PronunciationTab>('overview');
  const [currentLesson, setCurrentLesson] = useState<LessonItem>(DEFAULT_PRACTICE);
  const [isScoreModalOpen, setIsScoreModalOpen] = useState<boolean>(false);

  // Detail panel modal state
  const [detailData, setDetailData] = useState<{ type: 'initial' | 'final' | 'syllable'; item: any } | null>(null);
  const [activeCategorySubPage, setActiveCategorySubPage] = useState<PronunciationCategoryTab | null>(null);

  const tabs: { id: PronunciationTab; label: string; badge?: string }[] = [
    { id: 'overview', label: 'Tổng quan' },
    { id: 'pinyin-chart', label: 'Bảng Pinyin', badge: '~400' },
    { id: 'initials', label: 'Phụ âm (21)' },
    { id: 'finals', label: 'Vận mẫu' },
    { id: 'tones', label: 'Thanh điệu (5)' },
    { id: 'tongue-diagrams', label: 'Hình lưỡi' },
    { id: 'comparisons', label: 'So sánh âm' },
    { id: 'exercises', label: 'Luyện tập' },
    { id: 'factory', label: 'Công xưởng' },
  ];

  const handleBack = () => {
    navigate(-1);
  };

  const handleTabClick = (tabId: PronunciationTab) => {
    if (tabId === 'overview') {
      setActiveTab('overview');
      setActiveCategorySubPage(null);
    } else {
      setActiveCategorySubPage(tabId as PronunciationCategoryTab);
    }
  };

  const handleNotificationClick = () => {
    showToast?.('Hệ thống phát âm Hán ngữ Phổ thông chuẩn chính thức v2.5.0!');
  };

  const handlePlayAudio = (text: string) => {
    speakChinese(text, 0.8);
  };

  return (
    <div className="app-theme-surface bg-[#D92329] flex flex-col justify-between font-sans">
      {/* Background Decorative Layer */}
      <ChineseBackground />

      {/* Responsive Viewport */}
      <div className="responsive-container py-4 flex-1 flex flex-col justify-between relative z-10">
        <div>
          {/* Header & Status bar */}
          <StatusBar />
          <PronunciationHeader onBack={handleBack} onNotificationClick={handleNotificationClick} />

          {/* Top Progress & Search Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-3">
            <div className="lg:col-span-2">
              <PronunciationProgressCard onDetailClick={() => setIsScoreModalOpen(true)} />
            </div>
            <div className="lg:col-span-1 flex flex-col justify-center">
              <PronunciationSearch
                onSelectResult={(type, item) => setDetailData({ type: type as any, item })}
                showToast={showToast}
              />
            </div>
          </div>

          {/* Horizontal Scrollable Tabs Bar */}
          <div className="py-2 mb-2">
            <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
              {tabs.map((t) => {
                const isActive = activeTab === t.id && !activeCategorySubPage;
                return (
                  <button
                    key={t.id}
                    onClick={() => handleTabClick(t.id)}
                    type="button"
                    className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all cursor-pointer flex items-center space-x-1 ${
                      isActive
                        ? 'bg-white text-[#D92329] shadow-md scale-105'
                        : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-md'
                    }`}
                  >
                    <span>{t.label}</span>
                    {t.badge && (
                      <span className="text-[9px] sm:text-[10px] bg-amber-400 text-slate-900 px-1.5 py-0.2 rounded-full">
                        {t.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Views Content */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <TodayPracticeCard
                    lesson={currentLesson}
                    onOpenDetailsModal={() => setIsScoreModalOpen(true)}
                  />
                  <RecommendedLessons selectedLessonId={currentLesson.id} onSelectLesson={(lesson) => setCurrentLesson(lesson)} />
                </div>
                <div className="lg:col-span-1 space-y-4">
                  <PronunciationTipCard />
                  <CurrentLessonPlayer onContinue={() => setIsScoreModalOpen(true)} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pinyin-chart' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <FullPinyinChart
                  onSelectSyllable={(s) => setDetailData({ type: 'syllable', item: s })}
                  showToast={showToast}
                />
              </div>
              <div className="lg:col-span-1">
                <PronunciationDetailPanel
                  isOpen={!!detailData}
                  onClose={() => setDetailData(null)}
                  data={detailData}
                  showToast={showToast}
                />
              </div>
            </div>
          )}

          {activeTab === 'initials' && (
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md space-y-4">
              <h2 className="text-base sm:text-lg font-black text-slate-900 border-b pb-2">
                21 Phụ Âm Đầu (Thanh Mẫu) Hán Ngữ
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {INITIALS_DATA.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      handlePlayAudio(item.symbol);
                      setDetailData({ type: 'initial', item });
                    }}
                    type="button"
                    className="p-3 bg-red-50 hover:bg-red-100 rounded-xl border border-red-200 text-center cursor-pointer transition-all active:scale-95"
                  >
                    <span className="text-xl sm:text-2xl font-black text-[#D92329] block">{item.symbol}</span>
                    <span className="text-[11px] text-slate-600 font-medium block mt-1">{item.groupName}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'finals' && (
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md space-y-4">
              <h2 className="text-base sm:text-lg font-black text-slate-900 border-b pb-2">
                Vận Mẫu (Nguyên Âm & Âm Cuối)
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {FINALS_DATA.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      handlePlayAudio(item.symbol);
                      setDetailData({ type: 'final', item });
                    }}
                    type="button"
                    className="p-3 bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-200 text-center cursor-pointer transition-all active:scale-95"
                  >
                    <span className="text-xl sm:text-2xl font-black text-emerald-800 block">{item.symbol}</span>
                    <span className="text-[11px] text-slate-600 font-medium block mt-1">{item.vietnameseApprox}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'tones' && (
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md space-y-4">
              <h2 className="text-base sm:text-lg font-black text-slate-900 border-b pb-2">
                5 Thanh Điệu & Quy Tắc Biến Điệu
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {MANDARIN_TONES.map((tone) => (
                  <div key={tone.toneNumber} className="bg-amber-50 p-4 rounded-xl border border-amber-200 space-y-1">
                    <span className="text-xs font-extrabold text-amber-900 bg-amber-200 px-2 py-0.5 rounded-md">
                      Thanh {tone.toneNumber}
                    </span>
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900 mt-1">{tone.name}</h3>
                    <p className="text-xs text-slate-700">{tone.pitchContour}</p>
                    <p className="text-[11px] text-slate-600 italic">Ví dụ: {tone.examples[0]?.chinese} ({tone.examples[0]?.pinyin})</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t">
                <h3 className="text-sm font-extrabold text-slate-900 mb-2">💡 Quy tắc Biến điệu Tiếng Trung</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {TONE_SANDHI_RULES.map((rule) => (
                    <div key={rule.id} className="bg-slate-50 p-3 rounded-xl border text-xs space-y-1">
                      <span className="font-bold text-red-700">{rule.title}</span>
                      <p className="text-slate-700">{rule.explanation}</p>
                      <p className="text-emerald-700 font-semibold">{rule.examples[0]?.chinese} ({rule.examples[0]?.actualPinyin})</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tongue-diagrams' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <TonguePositionDiagram diagramId="diagram-bilabial-unasp" />
              </div>
              <div className="lg:col-span-1">
                <PronunciationTipCard />
              </div>
            </div>
          )}

          {activeTab === 'comparisons' && (
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md">
              <PronunciationComparison showToast={showToast} />
            </div>
          )}

          {activeTab === 'exercises' && (
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md">
              <PronunciationExercise showToast={showToast} />
            </div>
          )}

          {activeTab === 'factory' && (
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md">
              <FactoryPronunciationSection showToast={showToast} />
            </div>
          )}
        </div>

        <div className="h-4" />
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab="pronunciation" />

      {/* Score Modal */}
      <PronunciationDetailsModal
        isOpen={isScoreModalOpen}
        onClose={() => setIsScoreModalOpen(false)}
      />

      {/* Category Sub-Page Slide-Over Panel */}
      <PronunciationCategorySubPageSlideOver
        isOpen={!!activeCategorySubPage}
        onClose={() => setActiveCategorySubPage(null)}
        categoryTab={activeCategorySubPage}
        onSelectDetail={(type, item) => setDetailData({ type: type as any, item })}
        showToast={showToast}
      />
    </div>
  );
};
