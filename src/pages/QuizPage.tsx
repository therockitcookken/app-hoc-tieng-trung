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
  const [activeSessionTitle, setActiveSessionTitle] = useState<string>('');
  const [wrongQuestionsQueue, setWrongQuestionsQueue] = useState<QuizQuestion[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');

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
    } else if (collectionId === 'coll-grammar-hsk3') {
      qList = QUIZ_QUESTIONS_DATA.filter((q) => q.category === 'Ngữ pháp');
    }

    const coll = QUIZ_COLLECTIONS_DATA.find((c) => c.id === collectionId);
    setActiveSessionTitle(coll?.title || 'Bài Quiz Kiểm Tra');
    setActiveSessionQuestions(qList.length > 0 ? qList : QUIZ_QUESTIONS_DATA);
    showToast?.(`Bắt đầu bài Quiz: ${coll?.title || 'Kiểm tra'}`);
  };

  const handleFinishQuiz = (_score: number, _totalXp: number, wrongCount: number) => {
    if (wrongCount > 0 && activeSessionQuestions) {
      setWrongQuestionsQueue(activeSessionQuestions);
    }
  };

  return (
    <div className="w-full max-w-[390px] h-[100vh] sm:h-[844px] bg-[#00A86B] sm:rounded-[28px] shadow-[0_25px_60px_-15px_rgba(0,168,107,0.5),0_0_0_1px_rgba(255,255,255,0.15)] flex flex-col justify-between relative overflow-hidden font-sans border-0 sm:border border-white/20 select-none">
      {/* Background Layer Green Variant */}
      <ChineseBackground variant="green" />

      {/* Scrollable Viewport */}
      <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col justify-between relative z-10">
        <div>
          {/* Header & Status bar */}
          <StatusBar />
          <QuizHeader onBack={handleBack} />

          {/* Progress Card */}
          <QuizProgressCard onDetailClick={() => showToast?.('Xem chi tiết tiến độ Quiz')} />

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
                        ? 'bg-white text-[#00A86B] shadow-md scale-105'
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

          {/* Active Interactive Quiz Session Runner */}
          {activeSessionQuestions ? (
            <div className="px-4 py-1.5">
              <QuizSessionPlayer
                questions={activeSessionQuestions}
                collectionTitle={activeSessionTitle}
                onFinish={handleFinishQuiz}
                onClose={() => setActiveSessionQuestions(null)}
                showToast={showToast}
              />
            </div>
          ) : (
            /* Tab Views Content */
            <>
              {/* 1. Tab Overview (Default) */}
              {activeTab === 'overview' && (
                <div className="space-y-2">
                  <QuizCategories
                    activeCategory={selectedCategoryId}
                    onSelectCategory={(catId) => {
                      setSelectedCategoryId(catId);
                      showToast?.(`Đã chọn danh mục Quiz: ${catId}`);
                    }}
                  />

                  {/* Preset Collection Cards List */}
                  <div className="px-4 py-1.5 space-y-2">
                    {QUIZ_COLLECTIONS_DATA.map((coll) => (
                      <div
                        key={coll.id}
                        className="bg-white rounded-2xl p-3.5 shadow-md border border-slate-100 space-y-2 flex items-center justify-between"
                      >
                        <div>
                          <span className="text-[9.5px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                            {coll.category} • {coll.totalQuestions} Câu
                          </span>
                          <h3 className="text-sm font-extrabold text-slate-900 mt-1">
                            {coll.title}
                          </h3>
                          <p className="text-[10.5px] text-slate-500 font-medium">
                            {coll.description}
                          </p>
                        </div>

                        <button
                          onClick={() => handleStartCollection(coll.id)}
                          type="button"
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-xl text-xs font-bold shadow-xs cursor-pointer active:scale-95 transition-transform flex-shrink-0"
                        >
                          Bắt đầu
                        </button>
                      </div>
                    ))}
                  </div>

                  {wrongQuestionsQueue.length > 0 && (
                    <div className="px-4 py-1">
                      <WrongAnswerReview
                        wrongQuestions={wrongQuestionsQueue}
                        onRetake={() => handleStartCollection('coll-daily-challenge')}
                        showToast={showToast}
                      />
                    </div>
                  )}
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
                          Quiz Công xưởng & An toàn Lao động
                        </h2>
                      </div>
                      <span className="text-[10px] bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full font-bold">
                        800+ Câu thực tế
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 font-medium">
                      Kiểm tra phản xạ ngôn ngữ trong các tình huống vận hành máy móc, sự cố, bảo hộ an toàn và KCS.
                    </p>

                    <button
                      onClick={() => handleStartCollection('coll-factory-safety')}
                      type="button"
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl text-xs font-bold shadow-md cursor-pointer active:scale-95 transition-transform"
                    >
                      Bắt đầu Quiz Công xưởng (10 Câu)
                    </button>
                  </div>
                </div>
              )}

              {/* 3. Tab Wrong (Câu sai cần ôn) */}
              {activeTab === 'wrong' && (
                <div className="px-4 py-1.5">
                  <WrongAnswerReview
                    wrongQuestions={wrongQuestionsQueue}
                    onRetake={() => handleStartCollection('coll-daily-challenge')}
                    showToast={showToast}
                  />
                </div>
              )}
            </>
          )}
        </div>

        {/* Bottom spacing */}
        <div className="h-3" />
      </div>

      {/* Bottom Navigation with 'quiz' active */}
      <BottomNavigation activeTab="quiz" />
    </div>
  );
};
