import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChineseBackground } from '../components/ChineseBackground';
import { StatusBar } from '../components/StatusBar';
import { QuizHeader } from '../components/quiz/QuizHeader';
import { QuizProgressCard } from '../components/quiz/QuizProgressCard';
import { QuizCategories } from '../components/quiz/QuizCategories';
import { WrongAnswerReview } from '../components/quiz/WrongAnswerReview';
import { QuizSessionPlayer } from '../components/quiz/QuizSessionPlayer';
import { BottomNavigation } from '../components/BottomNavigation';
import { QUIZ_QUESTIONS_DATA } from '../data/quiz/quizQuestionsData';
import { QUIZ_COLLECTIONS_DATA } from '../data/quiz/quizCollectionsData';
import { QuizQuestion } from '../types/quiz';
import { Briefcase } from 'lucide-react';

type QuizTab =
  | 'overview'
  | 'today'
  | 'hsk'
  | 'vocab'
  | 'grammar'
  | 'pronunciation'
  | 'listening'
  | 'factory'
  | 'mock'
  | 'wrong';

interface QuizPageProps {
  showToast?: (msg: string) => void;
}

export const QuizPage: React.FC<QuizPageProps> = ({ showToast }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<QuizTab>('overview');
  const [activeSessionQuestions, setActiveSessionQuestions] = useState<QuizQuestion[] | null>(null);

  const tabs: { id: QuizTab; label: string; badge?: string }[] = [
    { id: 'overview', label: 'Tổng quan' },
    { id: 'today', label: 'Hôm nay' },
    { id: 'factory', label: 'Công xưởng & Nhà máy', badge: '800+' },
    { id: 'vocab', label: 'Từ vựng HSK' },
    { id: 'grammar', label: 'Ngữ pháp' },
    { id: 'pronunciation', label: 'Phát âm & Pinyin' },
    { id: 'listening', label: 'Nghe hiểu' },
    { id: 'mock', label: 'Thi thử HSK', badge: '20 Đề' },
    { id: 'wrong', label: 'Câu sai cần ôn' },
  ];

  const handleBack = () => {
    navigate(-1);
  };

  const handleStartCollection = (collectionId: string) => {
    let qList = QUIZ_QUESTIONS_DATA;

    if (collectionId === 'coll-factory-safety') {
      qList = QUIZ_QUESTIONS_DATA.filter((q) => q.isFactoryQuestion || q.category === 'Công xưởng & Nhà máy');
    } else if (collectionId === 'coll-grammar-particles') {
      qList = QUIZ_QUESTIONS_DATA.filter((q) => q.category === 'Ngữ pháp');
    } else if (collectionId === 'coll-hsk1-2-core') {
      qList = QUIZ_QUESTIONS_DATA.filter((q) => q.hskLevel === 'HSK 1' || q.hskLevel === 'HSK 2');
    }

    if (qList.length === 0) qList = QUIZ_QUESTIONS_DATA;

    setActiveSessionQuestions(qList);
  };

  return (
    <div className="w-full min-h-screen bg-[#E65100] flex flex-col justify-between relative font-sans overflow-x-hidden">
      {/* Background Layer Orange Variant */}
      <ChineseBackground variant="orange" />

      {/* Responsive Viewport */}
      <div className="responsive-container py-4 flex-1 flex flex-col justify-between relative z-10">
        <div>
          {/* Header & Status bar */}
          <StatusBar />
          <QuizHeader onBack={handleBack} />

          {/* Active Session Runner View */}
          {activeSessionQuestions ? (
            <div className="py-2 max-w-4xl mx-auto">
              <QuizSessionPlayer
                collectionTitle="Bài Trắc Nghiệm Ôn Tập"
                questions={activeSessionQuestions}
                onFinish={() => {
                  setActiveSessionQuestions(null);
                }}
                onClose={() => setActiveSessionQuestions(null)}
                showToast={showToast}
              />
            </div>
          ) : (
            <div>
              {/* Progress & Challenge Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-3">
                <div className="lg:col-span-2">
                  <QuizProgressCard
                    onDetailClick={() => showToast?.('Chi tiết tiến độ Trắc nghiệm')}
                  />
                </div>
                <div className="lg:col-span-1 flex flex-col justify-center bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-white space-y-2">
                  <h3 className="font-bold text-sm">🔥 Thử Thách Hàng Ngày</h3>
                  <p className="text-xs text-white/80">Hoàn thành 10 câu trắc nghiệm để nhận 50 điểm XP & mở khóa huy hiệu!</p>
                  <button
                    onClick={() => {
                      setActiveSessionQuestions(QUIZ_QUESTIONS_DATA);
                    }}
                    type="button"
                    className="w-full bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold text-xs py-2.5 rounded-xl shadow-md cursor-pointer active:scale-95 transition-transform"
                  >
                    Bắt đầu thử thách ngay
                  </button>
                </div>
              </div>

              {/* Horizontal Scrollable Tabs Bar */}
              <div className="py-2 mb-3">
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
                            ? 'bg-white text-[#E65100] shadow-md scale-105'
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
                  <QuizCategories
                    activeCategory="all"
                    onSelectCategory={() => {}}
                  />

                  {/* Collections Grid */}
                  <div className="space-y-2">
                    <h2 className="text-white text-base sm:text-lg font-black px-1">Bộ Đề Trắc Nghiệm Nổi Bật</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {QUIZ_COLLECTIONS_DATA.map((col) => (
                        <div
                          key={col.id}
                          className="bg-white rounded-2xl p-4 shadow-md space-y-3 border border-amber-100 hover:shadow-lg transition-shadow"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
                              {col.category}
                            </span>
                            <span className="text-xs text-slate-500 font-bold">{col.totalQuestions} câu</span>
                          </div>
                          <h3 className="text-sm sm:text-base font-extrabold text-slate-900">{col.title}</h3>
                          <p className="text-xs text-slate-600 line-clamp-2">{col.description}</p>
                          <button
                            onClick={() => handleStartCollection(col.id)}
                            type="button"
                            className="w-full bg-[#E65100] hover:bg-[#D84315] text-white font-bold text-xs py-2.5 rounded-xl shadow-xs cursor-pointer active:scale-95 transition-transform flex items-center justify-center space-x-1"
                          >
                            <Briefcase className="w-4 h-4" />
                            <span>Vào làm bài ngay</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'wrong' && (
                <div className="py-1">
                  <WrongAnswerReview
                    wrongQuestions={QUIZ_QUESTIONS_DATA.slice(0, 3)}
                    onRetake={() => {
                      setActiveSessionQuestions(QUIZ_QUESTIONS_DATA.slice(0, 3));
                    }}
                    showToast={showToast}
                  />
                </div>
              )}

              {activeTab !== 'overview' && activeTab !== 'wrong' && (
                <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md space-y-4">
                  <h2 className="text-base sm:text-lg font-black text-slate-900 border-b pb-2">
                    Bộ Đề Kiểm Tra - {tabs.find((t) => t.id === activeTab)?.label}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {QUIZ_COLLECTIONS_DATA.slice(0, 6).map((col) => (
                      <div key={col.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                        <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                          {col.category}
                        </span>
                        <h3 className="text-sm font-extrabold text-slate-900">{col.title}</h3>
                        <p className="text-xs text-slate-600">{col.description}</p>
                        <button
                          onClick={() => handleStartCollection(col.id)}
                          type="button"
                          className="w-full bg-[#E65100] text-white text-xs font-bold py-2 rounded-xl"
                        >
                          Làm bộ đề này
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
      <BottomNavigation activeTab="quiz" />
    </div>
  );
};
