import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChineseBackground } from '../components/ChineseBackground';
import { StatusBar } from '../components/StatusBar';
import { GrammarHeader } from '../components/grammar/GrammarHeader';
import { GrammarProgressCard } from '../components/grammar/GrammarProgressCard';
import { GrammarCategories } from '../components/grammar/GrammarCategories';
import { FeaturedGrammarTopics } from '../components/grammar/FeaturedGrammarTopics';
import { TodayGrammarLesson } from '../components/grammar/TodayGrammarLesson';
import { QuickGrammarPractice } from '../components/grammar/QuickGrammarPractice';
import { CommonGrammarMistakes } from '../components/grammar/CommonGrammarMistakes';
import { GrammarTipCard } from '../components/grammar/GrammarTipCard';
import { CurrentGrammarLessonPlayer } from '../components/grammar/CurrentGrammarLessonPlayer';
import { BottomNavigation } from '../components/BottomNavigation';
import { GrammarDetailsModal } from '../components/grammar/GrammarDetailsModal';

// New Comprehensive Grammar System Components
import { GrammarSearch } from '../components/grammar/GrammarSearch';
import { GrammarComparisonModule } from '../components/grammar/GrammarComparisonModule';
import { FactoryGrammarSection } from '../components/grammar/FactoryGrammarSection';
import { GrammarDetailPanel } from '../components/grammar/GrammarDetailPanel';

// Data Imports
import { GRAMMAR_POINTS_DATA } from '../data/grammar/grammarPointsData';
import { GRAMMAR_MISTAKES_DATA } from '../data/grammar/grammarMistakesData';
import { DEFAULT_TODAY_GRAMMAR, GrammarTopic } from '../data/grammarData';
import { GrammarPoint } from '../types/grammar';
import { BookOpen } from 'lucide-react';

type GrammarTab =
  | 'overview'
  | 'path'
  | 'topics'
  | 'basic-structures'
  | 'particles'
  | 'complements'
  | 'complex'
  | 'comparisons'
  | 'mistakes'
  | 'factory'
  | 'exercises';

interface GrammarPageProps {
  showToast?: (msg: string) => void;
}

export const GrammarPage: React.FC<GrammarPageProps> = ({ showToast }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<GrammarTab>('overview');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('affirmative');
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false);

  // Selected Grammar Point Modal State
  const [selectedGrammarPoint, setSelectedGrammarPoint] = useState<GrammarPoint | null>(null);

  const tabs: { id: GrammarTab; label: string; badge?: string }[] = [
    { id: 'overview', label: 'Tổng quan' },
    { id: 'topics', label: 'Chủ điểm (HSK 1-6)', badge: '300+' },
    { id: 'particles', label: 'Trợ từ (的/地/得, 了/过/着)' },
    { id: 'complements', label: 'Bổ ngữ' },
    { id: 'comparisons', label: 'Dễ nhầm (30+)' },
    { id: 'mistakes', label: 'Lỗi thường gặp' },
    { id: 'factory', label: 'Công xưởng', badge: '30+' },
    { id: 'exercises', label: 'Bài luyện' },
  ];

  const handleBack = () => {
    navigate(-1);
  };

  const handleIconClick = () => {
    showToast?.('Chương trình ngữ pháp HSK 1-6 & Công xưởng chính thức v2.5.0!');
  };

  return (
    <div className="w-full max-w-[390px] h-[100vh] sm:h-[844px] bg-[#1545A5] sm:rounded-[28px] shadow-[0_25px_60px_-15px_rgba(20,70,180,0.5),0_0_0_1px_rgba(255,255,255,0.15)] flex flex-col justify-between relative overflow-hidden font-sans border-0 sm:border border-white/20">
      {/* Background Layer Blue Variant */}
      <ChineseBackground variant="blue" />

      {/* Scrollable Viewport */}
      <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col justify-between relative z-10">
        <div>
          {/* Header & Status bar */}
          <StatusBar />
          <GrammarHeader onBack={handleBack} onIconClick={handleIconClick} />

          {/* Progress Card 72% */}
          <GrammarProgressCard onDetailClick={() => setIsDetailsModalOpen(true)} />

          {/* Search Component */}
          <div className="px-4 py-1.5">
            <GrammarSearch
              onSelectGrammarPoint={(gp) => setSelectedGrammarPoint(gp)}
              showToast={showToast}
            />
          </div>

          {/* 12 Horizontal Scrollable Tabs Bar */}
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
                        ? 'bg-white text-[#1545A5] shadow-md scale-105'
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
              <GrammarCategories
                activeCategory={selectedTopicId}
                onSelectCategory={(cat) => showToast?.(`Đã lọc chủ đề: ${cat}`)}
              />

              <FeaturedGrammarTopics
                selectedTopicId={selectedTopicId}
                onSelectTopic={(topic: GrammarTopic) => {
                  setSelectedTopicId(topic.id);
                  showToast?.(`Mở bài học chủ đề: ${topic.title}`);
                }}
                onSeeAllClick={() => setActiveTab('topics')}
              />

              <TodayGrammarLesson
                lesson={DEFAULT_TODAY_GRAMMAR}
                onOpenDetailsModal={() => setIsDetailsModalOpen(true)}
              />

              <div className="px-4 py-1">
                <FactoryGrammarSection showToast={showToast} />
              </div>

              <QuickGrammarPractice />
              <CommonGrammarMistakes />
              <GrammarTipCard />

              <CurrentGrammarLessonPlayer
                onContinue={() => showToast?.('Tiếp tục bài học ngữ pháp Cấu trúc 一边…一边…')}
              />
            </div>
          )}

          {/* 2. Tab Topics (Chủ điểm HSK 1-6) */}
          {activeTab === 'topics' && (
            <div className="px-4 py-1.5 space-y-3">
              <div className="bg-white rounded-2xl p-4 shadow-md space-y-3">
                <h2 className="text-sm font-extrabold text-slate-900 border-b border-slate-100 pb-2">
                  Danh sách Chủ điểm Ngữ pháp HSK 1–6
                </h2>
                <div className="space-y-2">
                  {GRAMMAR_POINTS_DATA.map((gp) => (
                    <button
                      key={gp.id}
                      onClick={() => setSelectedGrammarPoint(gp)}
                      type="button"
                      className="w-full bg-slate-50 hover:bg-blue-50 p-3 rounded-xl border border-slate-200 text-left flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-black text-blue-900 font-serif">
                            {gp.titleChinese}
                          </span>
                          <span className="text-[9.5px] font-bold bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded">
                            {gp.hskLevel}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-slate-800 block">
                          {gp.titleVietnamese}
                        </span>
                        <span className="text-[10.5px] text-slate-500 block truncate max-w-[280px]">
                          {gp.summary}
                        </span>
                      </div>
                      <BookOpen className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 3. Tab Comparisons (Dễ nhầm) */}
          {activeTab === 'comparisons' && (
            <div className="px-4 py-1.5">
              <GrammarComparisonModule showToast={showToast} />
            </div>
          )}

          {/* 4. Tab Mistakes (Lỗi thường gặp) */}
          {activeTab === 'mistakes' && (
            <div className="px-4 py-1.5 space-y-3">
              <div className="bg-white rounded-2xl p-4 shadow-md space-y-3">
                <h2 className="text-sm font-extrabold text-slate-900 border-b border-slate-100 pb-2">
                  Lỗi Ngữ Pháp Người Việt Thường Mắc
                </h2>
                <div className="space-y-2.5">
                  {GRAMMAR_MISTAKES_DATA.map((mis) => (
                    <div key={mis.id} className="bg-red-50 p-3 rounded-xl border border-red-200 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded">
                          {mis.relatedPointTitle}
                        </span>
                        <span className="text-[10px] font-bold text-slate-500">{mis.hskLevel}</span>
                      </div>
                      <div className="text-xs font-bold text-red-600">
                        ❌ Câu sai: <span className="font-serif">{mis.wrongSentence}</span>
                      </div>
                      <div className="text-xs font-bold text-emerald-700">
                        ✅ Câu đúng: <span className="font-serif">{mis.correctSentence}</span>
                      </div>
                      <p className="text-[11px] text-slate-700 pt-0.5">{mis.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 5. Tab Factory (Công xưởng) */}
          {activeTab === 'factory' && (
            <div className="px-4 py-1.5">
              <FactoryGrammarSection showToast={showToast} />
            </div>
          )}

          {/* 6. Tab Exercises (Bài luyện) */}
          {activeTab === 'exercises' && (
            <div className="px-4 py-1.5 space-y-3">
              <QuickGrammarPractice />
            </div>
          )}
        </div>

        {/* Bottom spacing */}
        <div className="h-3" />
      </div>

      {/* Bottom Navigation with 'grammar' active */}
      <BottomNavigation activeTab="grammar" />

      {/* Details Modal */}
      <GrammarDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
      />

      {/* Grammar Detail Panel */}
      <GrammarDetailPanel
        isOpen={!!selectedGrammarPoint}
        onClose={() => setSelectedGrammarPoint(null)}
        grammarPoint={selectedGrammarPoint}
        showToast={showToast}
      />
    </div>
  );
};
