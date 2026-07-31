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

// New Comprehensive Pronunciation Components
import { FullPinyinChart } from '../components/pronunciation/FullPinyinChart';
import { TonguePositionDiagram } from '../components/pronunciation/TonguePositionDiagram';
import { PronunciationComparison } from '../components/pronunciation/PronunciationComparison';
import { PronunciationSearch } from '../components/pronunciation/PronunciationSearch';
import { FactoryPronunciationSection } from '../components/pronunciation/FactoryPronunciationSection';
import { PronunciationExercise } from '../components/pronunciation/PronunciationExercise';
import { PronunciationDetailPanel } from '../components/pronunciation/PronunciationDetailPanel';

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

  const tabs: { id: PronunciationTab; label: string; badge?: string }[] = [
    { id: 'overview', label: 'Tổng quan' },
    { id: 'pinyin-chart', label: 'Bảng Pinyin', badge: '~400' },
    { id: 'initials', label: 'Phụ âm (21)' },
    { id: 'finals', label: 'Vận mẫu' },
    { id: 'tones', label: 'Thanh điệu (5)' },
    { id: 'tongue-diagrams', label: 'Hình lưỡi' },
    { id: 'comparisons', label: 'So sánh âm' },
    { id: 'exercises', label: 'Bài luyện' },
    { id: 'factory', label: 'Công xưởng', badge: '30+' },
  ];

  const handleBack = () => {
    navigate(-1);
  };

  const handleNotificationClick = () => {
    showToast?.('Hệ thống phát âm Hán ngữ Phổ thông chuẩn chính thức v2.5.0!');
  };

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
    <div className="w-full max-w-[390px] h-[100vh] sm:h-[844px] bg-[#D92329] sm:rounded-[28px] shadow-[0_25px_60px_-15px_rgba(200,20,20,0.5),0_0_0_1px_rgba(255,255,255,0.15)] flex flex-col justify-between relative overflow-hidden font-sans border-0 sm:border border-white/20">
      {/* Background Decorative Layer */}
      <ChineseBackground />

      {/* Scrollable Viewport */}
      <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col justify-between relative z-10">
        <div>
          {/* Header & Status bar */}
          <StatusBar />
          <PronunciationHeader onBack={handleBack} onNotificationClick={handleNotificationClick} />

          {/* Top Progress Card 85% */}
          <PronunciationProgressCard onDetailClick={() => setIsScoreModalOpen(true)} />

          {/* Search Component */}
          <div className="px-4 py-1.5">
            <PronunciationSearch
              onSelectResult={(type, item) => setDetailData({ type: type as any, item })}
              showToast={showToast}
            />
          </div>

          {/* 10 Horizontal Scrollable Tabs Bar */}
          <div className="px-4 py-2">
            <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
              {tabs.map((t) => {
                const isActive = activeTab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    type="button"
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer flex items-center space-x-1 ${
                      isActive
                        ? 'bg-white text-[#D92329] shadow-md scale-105'
                        : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-md'
                    }`}
                  >
                    <span>{t.label}</span>
                    {t.badge && (
                      <span className="text-[9px] bg-amber-400 text-slate-900 px-1.5 py-0.2 rounded-full">
                        {t.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Views Content */}

          {/* 1. Tab Overview (Default) */}
          {activeTab === 'overview' && (
            <div className="space-y-1">
              <TodayPracticeCard
                lesson={currentLesson}
                onOpenDetailsModal={() => setIsScoreModalOpen(true)}
                onSeeAllClick={() => setActiveTab('pinyin-chart')}
              />

              <RecommendedLessons
                selectedLessonId={currentLesson.id}
                onSelectLesson={(lessonItem: LessonItem) => {
                  setCurrentLesson(lessonItem);
                  showToast?.(`Mở bài học phát âm: ${lessonItem.title}`);
                }}
              />

              <div className="px-4 py-1">
                <FactoryPronunciationSection showToast={showToast} />
              </div>

              <PronunciationTipCard />

              <CurrentLessonPlayer
                onContinue={() => {
                  showToast?.(`Tiếp tục bài học phát âm: ${currentLesson.char}`);
                }}
              />
            </div>
          )}

          {/* 2. Tab Pinyin Chart */}
          {activeTab === 'pinyin-chart' && (
            <div className="px-4 py-1.5">
              <FullPinyinChart
                onSelectSyllable={(syl) => setDetailData({ type: 'syllable', item: syl })}
                showToast={showToast}
              />
            </div>
          )}

          {/* 3. Tab Initials (21 Phụ âm) */}
          {activeTab === 'initials' && (
            <div className="px-4 py-1.5 space-y-3">
              <div className="bg-white rounded-2xl p-4 shadow-md space-y-3">
                <h2 className="text-sm font-extrabold text-slate-900 border-b border-slate-100 pb-2">
                  21 Phụ âm đầu chuẩn tiếng Phổ thông
                </h2>
                <div className="grid grid-cols-3 gap-2">
                  {INITIALS_DATA.map((init) => (
                    <button
                      key={init.id}
                      onClick={() => setDetailData({ type: 'initial', item: init })}
                      type="button"
                      className="bg-slate-50 hover:bg-red-50 p-2.5 rounded-xl border border-slate-200 text-center cursor-pointer transition-transform active:scale-95 space-y-0.5"
                    >
                      <span className="text-xl font-black text-[#EF3B32] block">{init.symbol}</span>
                      <span className="text-[10px] text-slate-600 font-bold block truncate">{init.groupName}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 4. Tab Finals (Vận mẫu) */}
          {activeTab === 'finals' && (
            <div className="px-4 py-1.5 space-y-3">
              <div className="bg-white rounded-2xl p-4 shadow-md space-y-3">
                <h2 className="text-sm font-extrabold text-slate-900 border-b border-slate-100 pb-2">
                  Các nhóm Vận mẫu chuẩn
                </h2>
                <div className="grid grid-cols-3 gap-2">
                  {FINALS_DATA.map((fin) => (
                    <button
                      key={fin.id}
                      onClick={() => setDetailData({ type: 'final', item: fin })}
                      type="button"
                      className="bg-slate-50 hover:bg-blue-50 p-2.5 rounded-xl border border-slate-200 text-center cursor-pointer transition-transform active:scale-95 space-y-0.5"
                    >
                      <span className="text-xl font-black text-blue-600 block">{fin.symbol}</span>
                      <span className="text-[10px] text-slate-600 font-bold block truncate">{fin.categoryName}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 5. Tab Tones (5 Thanh điệu) */}
          {activeTab === 'tones' && (
            <div className="px-4 py-1.5 space-y-3.5">
              {/* Tones List */}
              <div className="bg-white rounded-2xl p-4 shadow-md space-y-3">
                <h2 className="text-sm font-extrabold text-slate-900 border-b border-slate-100 pb-2">
                  5 Thanh điệu Tiếng Trung Phổ thông
                </h2>
                <div className="space-y-3">
                  {MANDARIN_TONES.map((tone) => (
                    <div key={tone.toneNumber} className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-black text-[#EF3B32]">{tone.name}</span>
                        <button
                          onClick={() => handlePlayAudio(tone.examples[0]?.audioText || tone.symbolExample)}
                          type="button"
                          className="bg-red-50 text-[#EF3B32] p-1.5 rounded-full hover:bg-red-100 cursor-pointer"
                        >
                          <StatusBar />
                        </button>
                      </div>
                      <p className="text-xs text-slate-700 font-medium">{tone.description}</p>
                      <div className="text-[11px] text-slate-500 font-bold">
                        💡 Hướng dẫn: {tone.vietnameseGuide}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sandhi Rules */}
              <div className="bg-white rounded-2xl p-4 shadow-md space-y-3">
                <h2 className="text-sm font-extrabold text-slate-900 border-b border-slate-100 pb-2">
                  Quy tắc Biến điệu quan trọng
                </h2>
                <div className="space-y-2.5">
                  {TONE_SANDHI_RULES.map((rule) => (
                    <div key={rule.id} className="bg-amber-50 p-3 rounded-xl border border-amber-200 space-y-1">
                      <span className="text-xs font-extrabold text-amber-900 block">{rule.title}</span>
                      <p className="text-[11px] text-slate-700">{rule.explanation}</p>
                      <div className="flex items-center space-x-2 pt-1">
                        {rule.examples.map((ex, idx) => (
                          <button
                            key={idx}
                            onClick={() => handlePlayAudio(ex.audioText)}
                            type="button"
                            className="bg-white border border-amber-300 px-2.5 py-1 rounded-lg text-xs font-bold text-amber-900 hover:bg-amber-100 cursor-pointer"
                          >
                            {ex.chinese} ({ex.actualPinyin})
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 6. Tab Tongue Diagrams (Hình lưỡi cấu âm) */}
          {activeTab === 'tongue-diagrams' && (
            <div className="px-4 py-1.5 space-y-3">
              <TonguePositionDiagram diagramId="diagram-bilabial-asp" title="Mô phỏng 1: Hai môi bật hơi mạnh (p)" />
              <TonguePositionDiagram diagramId="diagram-retroflex-asp" title="Mô phỏng 2: Cong lưỡi bật hơi (ch)" />
              <TonguePositionDiagram diagramId="diagram-palatal-fricative" title="Mô phỏng 3: Mặt lưỡi dẹt (x)" />
              <TonguePositionDiagram diagramId="diagram-velar-asp" title="Mô phỏng 4: Gốc lưỡi bật hơi (k)" />
            </div>
          )}

          {/* 7. Tab Comparisons (So sánh cặp âm dễ nhầm) */}
          {activeTab === 'comparisons' && (
            <div className="px-4 py-1.5">
              <PronunciationComparison showToast={showToast} />
            </div>
          )}

          {/* 8. Tab Exercises (Bài tập luyện phát âm) */}
          {activeTab === 'exercises' && (
            <div className="px-4 py-1.5">
              <PronunciationExercise showToast={showToast} />
            </div>
          )}

          {/* 9. Tab Factory (Phát âm công xưởng) */}
          {activeTab === 'factory' && (
            <div className="px-4 py-1.5">
              <FactoryPronunciationSection showToast={showToast} />
            </div>
          )}
        </div>

        {/* Bottom spacing */}
        <div className="h-3" />
      </div>

      {/* Bottom Navigation with 'pronunciation' active */}
      <BottomNavigation activeTab="pronunciation" />

      {/* Detailed Score Analysis Modal */}
      <PronunciationDetailsModal
        isOpen={isScoreModalOpen}
        onClose={() => setIsScoreModalOpen(false)}
      />

      {/* Detail Panel Sheet */}
      <PronunciationDetailPanel
        isOpen={!!detailData}
        onClose={() => setDetailData(null)}
        data={detailData}
        showToast={showToast}
      />
    </div>
  );
};
