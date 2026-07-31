import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChineseBackground } from '../components/ChineseBackground';
import { StatusBar } from '../components/StatusBar';
import { DictionaryHeader } from '../components/dictionary/DictionaryHeader';
import { DictionarySearch } from '../components/dictionary/DictionarySearch';
import { DictionaryWordCard } from '../components/dictionary/DictionaryWordCard';
import { EssentialCommunicationSection } from '../components/dictionary/EssentialCommunicationSection';
import { DictionaryWordDetail } from '../components/dictionary/DictionaryWordDetail';
import { BottomNavigation } from '../components/BottomNavigation';
import { DICTIONARY_ENTRIES_DATA } from '../data/dictionary/dictionaryEntriesData';
import { CONFUSING_WORDS_DATA } from '../data/dictionary/confusingWordsData';
import { DictionaryEntry } from '../types/dictionary';

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
  const [visibleCount, setVisibleCount] = useState<number>(15);

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

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 20);
  };

  const currentTabEntries = React.useMemo(() => {
    if (activeTab === 'search') return DICTIONARY_ENTRIES_DATA;
    if (activeTab === 'factory') return DICTIONARY_ENTRIES_DATA.filter((e) => e.isFactoryVocabulary || e.isWorkplace);
    if (activeTab.startsWith('hsk')) {
      const levelNum = activeTab.replace('hsk', '');
      return DICTIONARY_ENTRIES_DATA.filter((e) => e.hskLevel === `HSK ${levelNum}`);
    }
    return DICTIONARY_ENTRIES_DATA;
  }, [activeTab]);

  return (
    <div className="w-full max-w-[390px] h-[100vh] sm:h-[844px] bg-[#008080] sm:rounded-[28px] shadow-[0_25px_60px_-15px_rgba(0,128,128,0.5),0_0_0_1px_rgba(255,255,255,0.15)] flex flex-col justify-between relative overflow-hidden font-sans border-0 sm:border border-white/20 select-none">
      {/* Background Layer Teal Variant */}
      <ChineseBackground variant="green" />

      {/* Scrollable Viewport */}
      <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col justify-between relative z-10">
        <div>
          {/* Header & Status bar */}
          <StatusBar />
          <DictionaryHeader onBack={handleBack} />

          {/* Search Component */}
          <div className="px-4 py-1.5">
            <DictionarySearch
              onSelectEntry={(entry) => setSelectedEntry(entry)}
              showToast={showToast}
            />
          </div>

          {/* Horizontal Scrollable Tabs Bar */}
          <div className="px-4 py-2">
            <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
              {tabs.map((t) => {
                const isActive = activeTab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setActiveTab(t.id);
                      setVisibleCount(15);
                    }}
                    type="button"
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer flex items-center space-x-1 ${
                      isActive
                        ? 'bg-white text-[#008080] shadow-md scale-105'
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
          {activeTab === 'communication' ? (
            <div className="px-4 py-1.5">
              <EssentialCommunicationSection showToast={showToast} />
            </div>
          ) : activeTab === 'confusing' ? (
            <div className="px-4 py-1.5 space-y-3">
              <div className="bg-white rounded-2xl p-4 shadow-md space-y-3">
                <h2 className="text-sm font-extrabold text-slate-900 border-b border-slate-100 pb-2">
                  Cặp Từ Dễ Nhầm Lẫn Trong Tiếng Trung
                </h2>
                <div className="space-y-2.5">
                  {CONFUSING_WORDS_DATA.map((pair) => (
                    <div key={pair.id} className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-emerald-800">
                          {pair.wordA} ({pair.pinyinA}) vs {pair.wordB} ({pair.pinyinB})
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-700 font-medium">
                        💡 {pair.differenceSummary}
                      </p>
                      <div className="text-[10.5px] text-slate-600 bg-white p-2 rounded-lg border border-slate-100 space-y-0.5">
                        <div>• Ví dụ A: <span className="font-serif font-bold">{pair.exampleA}</span></div>
                        <div>• Ví dụ B: <span className="font-serif font-bold">{pair.exampleB}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3 px-4 py-1">
              {currentTabEntries.slice(0, visibleCount).map((entry) => (
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

              {visibleCount < currentTabEntries.length && (
                <button
                  onClick={handleLoadMore}
                  type="button"
                  className="w-full bg-white/20 hover:bg-white/30 text-white font-extrabold text-xs py-2.5 rounded-xl border border-white/30 cursor-pointer active:scale-95 transition-transform"
                >
                  Tải thêm từ ({visibleCount}/{currentTabEntries.length})
                </button>
              )}
            </div>
          )}
        </div>

        {/* Bottom spacing */}
        <div className="h-3" />
      </div>

      {/* Bottom Navigation with 'dictionary' active */}
      <BottomNavigation activeTab="dictionary" />

      {/* Dictionary Detail Modal */}
      <DictionaryWordDetail
        isOpen={!!selectedEntry}
        onClose={() => setSelectedEntry(null)}
        entry={selectedEntry}
        showToast={showToast}
      />
    </div>
  );
};
