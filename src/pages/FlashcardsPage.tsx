import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChineseBackground } from '../components/ChineseBackground';
import { StatusBar } from '../components/StatusBar';
import { FlashcardHeader } from '../components/flashcards/FlashcardHeader';
import { FlashcardProgressCard } from '../components/flashcards/FlashcardProgressCard';
import { FlashcardCategories } from '../components/flashcards/FlashcardCategories';
import { FlashcardStudySession } from '../components/flashcards/FlashcardStudySession';
import { BottomNavigation } from '../components/BottomNavigation';
import { FLASHCARD_DECKS_DATA } from '../data/flashcards/flashcardDecksData';
import { FLASHCARD_CARDS_DATA } from '../data/flashcards/flashcardCardsData';
import { FlashcardItem } from '../types/flashcards';
import { FlashcardCategorySubPageSlideOver, FlashcardCategoryTab } from '../components/flashcards/FlashcardCategorySubPageSlideOver';
import { Briefcase } from 'lucide-react';

type FlashcardTab =
  | 'overview'
  | 'due'
  | 'decks'
  | 'hsk'
  | 'communication'
  | 'factory'
  | 'grammar'
  | 'pronunciation'
  | 'difficult'
  | 'saved';

interface FlashcardsPageProps {
  showToast?: (msg: string) => void;
}

export const FlashcardsPage: React.FC<FlashcardsPageProps> = ({ showToast }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<FlashcardTab>('overview');
  const [activeSessionCards, setActiveSessionCards] = useState<FlashcardItem[] | null>(null);
  const [activeCategorySubPage, setActiveCategorySubPage] = useState<FlashcardCategoryTab | null>(null);

  const tabs: { id: FlashcardTab; label: string; badge?: string }[] = [
    { id: 'overview', label: 'Tổng quan' },
    { id: 'due', label: 'Đến hạn hôm nay', badge: '5' },
    { id: 'factory', label: 'Công xưởng & Nhà máy', badge: '1200+' },
    { id: 'hsk', label: 'Bộ thẻ HSK 1–6' },
    { id: 'communication', label: 'Giao tiếp thiết yếu' },
    { id: 'grammar', label: 'Ngữ pháp' },
    { id: 'pronunciation', label: 'Phát âm' },
    { id: 'difficult', label: 'Từ khó cần ôn' },
  ];

  const handleBack = () => {
    navigate(-1);
  };

  const handleTabClick = (tabId: FlashcardTab) => {
    if (tabId === 'overview') {
      setActiveTab('overview');
      setActiveCategorySubPage(null);
    } else {
      setActiveCategorySubPage(tabId as FlashcardCategoryTab);
    }
  };

  const handleStartDeckStudy = (deckId: string) => {
    let cards = FLASHCARD_CARDS_DATA.filter((c) => c.deckIds.includes(deckId));
    if (cards.length === 0) cards = FLASHCARD_CARDS_DATA;

    setActiveSessionCards(cards);
  };

  return (
    <div className="app-theme-surface bg-[#7B1FA2] flex flex-col justify-between font-sans">
      {/* Background Layer Purple Variant */}
      <ChineseBackground variant="purple" />

      {/* Responsive Viewport */}
      <div className="responsive-container py-4 flex-1 flex flex-col justify-between relative z-10">
        <div>
          {/* Header & Status bar */}
          <StatusBar />
          <FlashcardHeader onBack={handleBack} />

          {/* Active Session View */}
          {activeSessionCards ? (
            <div className="py-2 max-w-4xl mx-auto">
              <FlashcardStudySession
                deckTitle="Bộ Thẻ Ôn Tập Flashcard"
                cards={activeSessionCards}
                onFinish={() => setActiveSessionCards(null)}
                onClose={() => setActiveSessionCards(null)}
                showToast={showToast}
              />
            </div>
          ) : (
            <div>
              {/* Progress & Quick Action Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-3">
                <div className="lg:col-span-2">
                  <FlashcardProgressCard
                    onDetailClick={() => showToast?.('Chi tiết tiến độ Spaced Repetition')}
                  />
                </div>
                <div className="lg:col-span-1 flex flex-col justify-center bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-white space-y-2">
                  <h3 className="font-bold text-sm">💡 Chế độ học Spaced Repetition</h3>
                  <p className="text-xs text-white/80">
                    Hệ thống tự động tính lịch ôn tập tối ưu SM-2 cho từng thẻ flashcard.
                  </p>
                  <button
                    onClick={() => {
                      setActiveSessionCards(FLASHCARD_CARDS_DATA);
                    }}
                    type="button"
                    className="w-full bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold text-xs py-2.5 rounded-xl shadow-md cursor-pointer active:scale-95 transition-transform"
                  >
                    Bắt đầu phiên học ngay
                  </button>
                </div>
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
                            ? 'bg-white text-[#7B1FA2] shadow-md scale-105'
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

              {/* Tab Content Views */}
              {activeTab === 'overview' && (
                <div className="space-y-4">
                  <FlashcardCategories
                    activeCategory="all"
                    onSelectCategory={() => {}}
                  />

                  {/* Decks Grid */}
                  <div className="space-y-2">
                    <h2 className="text-white text-base sm:text-lg font-black px-1">Bộ Thẻ Flashcard Nổi Bật</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {FLASHCARD_DECKS_DATA.map((deck) => (
                        <div
                          key={deck.id}
                          className="bg-white rounded-2xl p-4 shadow-md space-y-3 border border-purple-100 hover:shadow-lg transition-shadow"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold bg-purple-100 text-purple-900 px-2 py-0.5 rounded-full">
                              {deck.category}
                            </span>
                            <span className="text-xs text-slate-500 font-bold">{deck.totalCards} thẻ</span>
                          </div>
                          <h3 className="text-sm sm:text-base font-extrabold text-slate-900">{deck.name}</h3>
                          <p className="text-xs text-slate-600 line-clamp-2">{deck.description}</p>
                          <button
                            onClick={() => handleStartDeckStudy(deck.id)}
                            type="button"
                            className="w-full bg-[#7B1FA2] hover:bg-[#6A1B9A] text-white font-bold text-xs py-2.5 rounded-xl shadow-xs cursor-pointer active:scale-95 transition-transform flex items-center justify-center space-x-1"
                          >
                            <Briefcase className="w-4 h-4" />
                            <span>Luyện tập ngay</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab !== 'overview' && (
                <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md space-y-4">
                  <h2 className="text-base sm:text-lg font-black text-slate-900 border-b pb-2">
                    Danh Sách Thẻ Flashcard - {tabs.find((t) => t.id === activeTab)?.label}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {FLASHCARD_DECKS_DATA.slice(0, 6).map((deck) => (
                      <div key={deck.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                        <span className="text-xs font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded">
                          {deck.category}
                        </span>
                        <h3 className="text-sm font-extrabold text-slate-900">{deck.name}</h3>
                        <p className="text-xs text-slate-600">{deck.description}</p>
                        <button
                          onClick={() => handleStartDeckStudy(deck.id)}
                          type="button"
                          className="w-full bg-[#7B1FA2] text-white text-xs font-bold py-2 rounded-xl"
                        >
                          Học bộ thẻ này
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="h-4" />
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab="flashcards" />

      {/* Category Sub-Page Slide-Over Panel */}
      <FlashcardCategorySubPageSlideOver
        isOpen={!!activeCategorySubPage}
        onClose={() => setActiveCategorySubPage(null)}
        categoryTab={activeCategorySubPage}
        onStartStudy={(cards) => {
          setActiveCategorySubPage(null);
          setActiveSessionCards(cards);
        }}
        showToast={showToast}
      />
    </div>
  );
};
