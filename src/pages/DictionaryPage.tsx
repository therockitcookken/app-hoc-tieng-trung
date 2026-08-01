import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChineseBackground } from '../components/ChineseBackground';
import { StatusBar } from '../components/StatusBar';
import { DictionaryHeader } from '../components/dictionary/DictionaryHeader';
import { DictionarySearch } from '../components/dictionary/DictionarySearch';
import { DictionaryWordCard } from '../components/dictionary/DictionaryWordCard';
import { EssentialCommunicationSection } from '../components/dictionary/EssentialCommunicationSection';
import { DictionaryWordDetail } from '../components/dictionary/DictionaryWordDetail';
import { BottomNavigation } from '../components/BottomNavigation';
import { DictionaryCategorySubPageSlideOver, DictionaryCategoryTab } from '../components/dictionary/DictionaryCategorySubPageSlideOver';
import { DICTIONARY_ENTRIES_DATA } from '../data/dictionary/dictionaryEntriesData';
import { CONFUSING_WORDS_DATA } from '../data/dictionary/confusingWordsData';
import { DictionaryEntry } from '../types/dictionary';
import { PremiumPagination } from '../components/common/PremiumPagination';

type DictionaryTab =
  | 'search'
  | 'communication'
  | 'factory'
  | 'hsk1'
  | 'hsk2'
  | 'hsk3'
  | 'hsk4'
  | 'hsk5'
  | 'hsk6'
  | 'confusing';

interface DictionaryPageProps {
  showToast?: (msg: string) => void;
}

export const DictionaryPage: React.FC<DictionaryPageProps> = ({ showToast }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<DictionaryTab>('search');
  const [selectedEntry, setSelectedEntry] = useState<DictionaryEntry | null>(null);
  const [activeCategorySubPage, setActiveCategorySubPage] = useState<DictionaryCategoryTab | null>(null);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 18;

  const tabs: { id: DictionaryTab; label: string; badge?: string }[] = [
    { id: 'search', label: 'Tra từ' },
    { id: 'communication', label: 'Giao tiếp thiết yếu' },
    { id: 'factory', label: 'Từ vựng Công xưởng', badge: '1200+' },
    { id: 'hsk1', label: 'HSK 1' },
    { id: 'hsk2', label: 'HSK 2' },
    { id: 'hsk3', label: 'HSK 3' },
    { id: 'hsk4', label: 'HSK 4' },
    { id: 'hsk5', label: 'HSK 5' },
    { id: 'hsk6', label: 'HSK 6' },
    { id: 'confusing', label: 'Từ dễ nhầm' },
  ];

  const handleBack = () => {
    navigate(-1);
  };

  const handleTabClick = (tabId: DictionaryTab) => {
    if (tabId === 'search') {
      setActiveTab('search');
      setActiveCategorySubPage(null);
    } else {
      setActiveCategorySubPage(tabId as DictionaryCategoryTab);
    }
  };

  // Reset page to 1 whenever tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const currentTabEntries = useMemo(() => {
    if (activeTab === 'search') return DICTIONARY_ENTRIES_DATA;
    if (activeTab === 'factory') return DICTIONARY_ENTRIES_DATA.filter((e) => e.isFactoryVocabulary || e.isWorkplace);
    if (activeTab.startsWith('hsk')) {
      const levelNum = activeTab.replace('hsk', '');
      return DICTIONARY_ENTRIES_DATA.filter((e) => e.hskLevel === `HSK ${levelNum}`);
    }
    return DICTIONARY_ENTRIES_DATA;
  }, [activeTab]);

  // Calculate Pagination ranges
  const totalPages = Math.max(1, Math.ceil(currentTabEntries.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, currentTabEntries.length);
  const paginatedEntries = currentTabEntries.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  return (
    <div className="app-theme-surface bg-[#1B5E20] flex flex-col justify-between font-sans">
      {/* Background Decorative Layer (Green Variant) */}
      <ChineseBackground variant="green" />

      {/* Responsive Viewport */}
      <div className="responsive-container py-4 flex-1 flex flex-col justify-between relative z-10">
        <div>
          {/* Header & Status bar */}
          <StatusBar />
          <DictionaryHeader onBack={handleBack} />

          {/* Search Component */}
          <div className="py-2 max-w-3xl mx-auto">
            <DictionarySearch
              onSelectEntry={(entry) => setSelectedEntry(entry)}
              showToast={showToast}
            />
          </div>

          {/* Horizontal Scrollable Tabs Bar */}
          <div className="py-2 mb-3">
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
                        ? 'bg-white text-[#008080] shadow-md scale-105'
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
          {activeTab === 'communication' ? (
            <div className="py-1">
              <EssentialCommunicationSection showToast={showToast} />
            </div>
          ) : activeTab === 'confusing' ? (
            <div className="py-1 space-y-3">
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md space-y-4">
                <h2 className="text-sm sm:text-base font-extrabold text-slate-900 border-b border-slate-100 pb-2">
                  Cặp Từ Dễ Nhầm Lẫn Trong Tiếng Trung
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {CONFUSING_WORDS_DATA.map((pair) => (
                    <div key={pair.id} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-black text-emerald-800">
                          {pair.wordA} ({pair.pinyinA}) vs {pair.wordB} ({pair.pinyinB})
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 font-medium">
                        💡 {pair.differenceSummary}
                      </p>
                      <div className="text-[11px] text-slate-600 bg-white p-2 rounded-lg border border-slate-100 space-y-0.5">
                        <div>• Ví dụ A: <span className="font-serif font-bold">{pair.exampleA}</span></div>
                        <div>• Ví dụ B: <span className="font-serif font-bold">{pair.exampleB}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 py-1">
              {/* Paginated Word Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {paginatedEntries.map((entry) => (
                  <DictionaryWordCard
                    key={entry.id}
                    word={{
                      id: entry.id,
                      simplified: entry.simplified,
                      traditional: entry.traditional,
                      pinyin: entry.pinyin,
                      pinyinClean: entry.normalizedPinyin,
                      vietnameseMeanings: entry.senses.map((s) => s.shortDefinition || s.vietnameseDefinition),
                      hskLevel: entry.hskLevel,
                      partOfSpeech: entry.partOfSpeech,
                      radicals: entry.radical || '工',
                      strokeCount: entry.strokeCount || 5,
                      frequency: entry.frequency === 'high' ? 'Phổ biến' : 'Thường dùng',
                      tags: entry.categories,
                      examples: entry.examples.map((ex) => ({
                        sentence: ex.chinese,
                        pinyin: ex.pinyin,
                        vietnamese: ex.vietnamese,
                      })),
                    }}
                    onSeeAllClick={() => setActiveTab('factory')}
                    showToast={showToast}
                  />
                ))}
              </div>

              {/* ULTRA-PREMIUM 3D GLASSMORPHIC PAGINATION DECK */}
              <PremiumPagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={currentTabEntries.length}
                startIndex={startIndex}
                endIndex={endIndex}
                onPageChange={handlePageChange}
                variant="green"
              />
            </div>
          )}
        </div>

        <div className="h-4" />
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab="dictionary" />

      {/* Dictionary Detail Modal */}
      <DictionaryWordDetail
        isOpen={!!selectedEntry}
        onClose={() => setSelectedEntry(null)}
        entry={selectedEntry}
        showToast={showToast}
      />

      {/* Category Sub-Page Slide-Over Panel */}
      <DictionaryCategorySubPageSlideOver
        isOpen={!!activeCategorySubPage}
        onClose={() => setActiveCategorySubPage(null)}
        categoryTab={activeCategorySubPage}
        onSelectEntry={(entry) => setSelectedEntry(entry)}
        showToast={showToast}
      />
    </div>
  );
};
