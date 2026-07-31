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
  const [activeSessionTitle, setActiveSessionTitle] = useState<string>('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');

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

  const handleStartDeckStudy = (deckId: string) => {
    const deck = FLASHCARD_DECKS_DATA.find((d) => d.id === deckId);
    let cards = FLASHCARD_CARDS_DATA.filter((c) => c.deckIds.includes(deckId));

    if (cards.length === 0) {
      cards = FLASHCARD_CARDS_DATA;
    }

    setActiveSessionTitle(deck?.name || 'Bộ thẻ Flashcard');
    setActiveSessionCards(cards);
    showToast?.(`Bắt đầu học bộ thẻ: ${deck?.name || 'Flashcard'}`);
  };

  return (
    <div className="w-full max-w-[390px] h-[100vh] sm:h-[844px] bg-[#9C27B0] sm:rounded-[28px] shadow-[0_25px_60px_-15px_rgba(156,39,176,0.5),0_0_0_1px_rgba(255,255,255,0.15)] flex flex-col justify-between relative overflow-hidden font-sans border-0 sm:border border-white/20 select-none">
      {/* Background Layer Purple Variant */}
      <ChineseBackground variant="blue" />

      {/* Scrollable Viewport */}
      <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col justify-between relative z-10">
        <div>
          {/* Header & Status bar */}
          <StatusBar />
          <FlashcardHeader onBack={handleBack} />

          {/* Progress Card */}
          <FlashcardProgressCard onDetailClick={() => showToast?.('Xem chi tiết tiến độ Flashcard')} />

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
                        ? 'bg-white text-[#9C27B0] shadow-md scale-105'
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

          {/* Active Interactive Spaced Repetition Session Runner */}
          {activeSessionCards ? (
            <div className="px-4 py-1.5">
              <FlashcardStudySession
                deckTitle={activeSessionTitle}
                cards={activeSessionCards}
                onFinish={(_mastered, _xp) => {
                  // Session complete
                }}
                onClose={() => setActiveSessionCards(null)}
                showToast={showToast}
              />
            </div>
          ) : (
            /* Tab Views Content */
            <>
              {/* 1. Tab Overview (Default) */}
              {activeTab === 'overview' && (
                <div className="space-y-2">
                  <FlashcardCategories
                    activeCategory={selectedCategoryId}
                    onSelectCategory={(catId: string) => {
                      setSelectedCategoryId(catId);
                      showToast?.(`Đã chọn danh mục thẻ: ${catId}`);
                    }}
                  />

                  {/* Preset Decks List */}
                  <div className="px-4 py-1.5 space-y-2">
                    {FLASHCARD_DECKS_DATA.map((deck) => (
                      <div
                        key={deck.id}
                        className="bg-white rounded-2xl p-3.5 shadow-md border border-slate-100 flex items-center justify-between"
                      >
                        <div className="space-y-0.5">
                          <span className="text-[9.5px] font-bold uppercase tracking-wider bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                            {deck.category} • {deck.totalCards} Thẻ
                          </span>
                          <h3 className="text-sm font-extrabold text-slate-900">
                            {deck.name}
                          </h3>
                          <p className="text-[10.5px] text-slate-500 font-medium max-w-[220px]">
                            {deck.description}
                          </p>
                        </div>

                        <button
                          onClick={() => handleStartDeckStudy(deck.id)}
                          type="button"
                          className="bg-[#9C27B0] hover:bg-purple-800 text-white px-3 py-2 rounded-xl text-xs font-bold shadow-xs cursor-pointer active:scale-95 transition-transform flex-shrink-0"
                        >
                          Luyện thẻ
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. Tab Factory (Công xưởng) */}
              {activeTab === 'factory' && (
                <div className="px-4 py-1.5 space-y-3">
                  <div className="bg-white rounded-2xl p-4 shadow-md space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <div className="flex items-center space-x-1.5">
                        <Briefcase className="w-4 h-4 text-orange-600" />
                        <h2 className="text-sm font-extrabold text-slate-900">
                          Bộ thẻ Thuật ngữ & Thao tác Nhà máy
                        </h2>
                      </div>
                      <span className="text-[10px] bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full font-bold">
                        1200+ Thẻ
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 font-medium">
                      Luyện phản xạ ghi nhớ từ vựng máy móc, thiết bị, an toàn lao động và KCS bằng thuật toán Lặp lại ngắt quãng (Spaced Repetition).
                    </p>

                    <button
                      onClick={() => handleStartDeckStudy('deck-factory-vocab')}
                      type="button"
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl text-xs font-bold shadow-md cursor-pointer active:scale-95 transition-transform"
                    >
                      Bắt đầu Ôn Thẻ Công xưởng
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Bottom spacing */}
        <div className="h-3" />
      </div>

      {/* Bottom Navigation with 'flashcards' active */}
      <BottomNavigation activeTab="flashcards" />
    </div>
  );
};
