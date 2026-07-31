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
    { id: 'complex', label: 'Cấu trúc phức hợp (把, 被, 比)' },
    { id: 'comparisons', label: 'So sánh dễ nhầm' },
    { id: 'mistakes', label: 'Lỗi thường gặp' },
    { id: 'factory', label: 'Ngữ pháp Công xưởng' },
  ];

  const handleBack = () => {
    navigate(-1);
  };

  const handleSelectTopic = (topic: GrammarTopic) => {
    setSelectedTopicId(topic.id);
    const foundPoint = GRAMMAR_POINTS_DATA.find((p) => p.id === topic.id);
    if (foundPoint) {
      setSelectedGrammarPoint(foundPoint);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#1545A5] flex flex-col justify-between relative font-sans overflow-x-hidden">
      {/* Background Decorative Layer (Blue Variant) */}
      <ChineseBackground variant="blue" />

      {/* Responsive Viewport */}
      <div className="responsive-container py-4 flex-1 flex flex-col justify-between relative z-10">
        <div>
          {/* Header & Status bar */}
          <StatusBar />
          <GrammarHeader onBack={handleBack} />

          {/* Top Progress & Search Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-3">
            <div className="lg:col-span-2">
              <GrammarProgressCard onDetailClick={() => setIsDetailsModalOpen(true)} />
            </div>
            <div className="lg:col-span-1 flex flex-col justify-center">
              <GrammarSearch
                onSelectGrammarPoint={(point) => setSelectedGrammarPoint(point)}
                showToast={showToast}
              />
            </div>
          </div>

          {/* Horizontal Scrollable Tabs Bar */}
          <div className="py-2 mb-2">
            <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
              {tabs.map((t) => {
                const isActive = activeTab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    type="button"
                    className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all cursor-pointer flex items-center space-x-1 ${
                      isActive
                        ? 'bg-white text-[#1545A5] shadow-md scale-105'
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
              <GrammarCategories activeCategory={selectedTopicId as any} onSelectCategory={(catId) => setSelectedTopicId(catId)} />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <TodayGrammarLesson
                    lesson={DEFAULT_TODAY_GRAMMAR}
                    onOpenDetailsModal={() => setIsDetailsModalOpen(true)}
                  />
                  <FeaturedGrammarTopics selectedTopicId={selectedTopicId} onSelectTopic={handleSelectTopic} />
                  <QuickGrammarPractice />
                </div>
                <div className="lg:col-span-1 space-y-4">
                  <GrammarTipCard />
                  <CurrentGrammarLessonPlayer onContinue={() => setIsDetailsModalOpen(true)} />
                  <CommonGrammarMistakes />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'topics' && (
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md space-y-4">
              <h2 className="text-base sm:text-lg font-black text-slate-900 border-b pb-2">
                300+ Chủ Điểm Ngữ Pháp Tiếng Trung Phổ Thông HSK 1–6
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {GRAMMAR_POINTS_DATA.map((gp) => (
                  <div
                    key={gp.id}
                    onClick={() => setSelectedGrammarPoint(gp)}
                    className="bg-blue-50/60 hover:bg-blue-100/80 p-4 rounded-xl border border-blue-200 cursor-pointer transition-all active:scale-95 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold bg-[#1545A5] text-white px-2 py-0.5 rounded-md">
                        {gp.hskLevel}
                      </span>
                      <span className="text-[11px] text-blue-800 font-semibold">{gp.category}</span>
                    </div>
                    <h3 className="text-sm font-extrabold text-slate-900">{gp.titleVietnamese}</h3>
                    <p className="text-xs text-blue-900 font-mono font-bold bg-white p-1.5 rounded border border-blue-100">
                      {gp.formulas[0]?.pattern || gp.affirmativePattern}
                    </p>
                    <p className="text-xs text-slate-600 line-clamp-2">{gp.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'particles' && (
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md space-y-4">
              <h2 className="text-base sm:text-lg font-black text-slate-900 border-b pb-2">
                Trợ Từ Ngữ Pháp Tiếng Trung (的 / 地 / 得 & 了 / 过 / 着)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {GRAMMAR_POINTS_DATA.filter((p) => p.category.includes('Trợ từ') || p.titleVietnamese.includes('的')).map((gp) => (
                  <div key={gp.id} onClick={() => setSelectedGrammarPoint(gp)} className="bg-slate-50 p-4 rounded-xl border cursor-pointer hover:border-blue-400 space-y-2">
                    <h3 className="text-sm font-extrabold text-blue-900">{gp.titleVietnamese}</h3>
                    <p className="text-xs font-mono bg-white p-2 rounded border">{gp.formulas[0]?.pattern || gp.affirmativePattern}</p>
                    <p className="text-xs text-slate-700">{gp.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'comparisons' && (
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md">
              <GrammarComparisonModule showToast={showToast} />
            </div>
          )}

          {activeTab === 'mistakes' && (
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md space-y-4">
              <h2 className="text-base sm:text-lg font-black text-slate-900 border-b pb-2">
                Các Lỗi Ngữ Pháp Thường Gặp & Cách Sửa
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {GRAMMAR_MISTAKES_DATA.map((item) => (
                  <div key={item.id} className="bg-red-50/50 p-4 rounded-xl border border-red-200 space-y-2">
                    <span className="text-xs font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded">
                      ❌ {item.relatedPointTitle}
                    </span>
                    <p className="text-xs text-red-900 font-bold">Lỗi: <span className="line-through">{item.wrongSentence}</span></p>
                    <p className="text-xs text-emerald-900 font-bold">Sửa: <span>{item.correctSentence}</span></p>
                    <p className="text-xs text-slate-700">💡 {item.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'factory' && (
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md">
              <FactoryGrammarSection showToast={showToast} />
            </div>
          )}
        </div>

        <div className="h-4" />
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab="grammar" />

      {/* Grammar Detail Modal */}
      <GrammarDetailPanel
        isOpen={!!selectedGrammarPoint}
        onClose={() => setSelectedGrammarPoint(null)}
        grammarPoint={selectedGrammarPoint}
        showToast={showToast}
      />

      {/* Grammar Progress Details Modal */}
      <GrammarDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
      />
    </div>
  );
};
