import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChineseBackground } from '../components/ChineseBackground';
import { StatusBar } from '../components/StatusBar';
import { WelcomeHeader } from '../components/WelcomeHeader';
import { LearningProgressCard } from '../components/LearningProgressCard';
import { FeatureGrid } from '../components/FeatureGrid';
import { StreakRewardSection } from '../components/StreakRewardSection';
import { BottomNavigation, NavTab } from '../components/BottomNavigation';
import { FeatureItem } from '../data/features';
import { X, Sparkles, CheckCircle2 } from 'lucide-react';

interface HomePageProps {
  showToast?: (msg: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ showToast }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleFeatureClick = (feature: FeatureItem) => {
    if (feature.id === 'phat-am') {
      navigate('/pronunciation');
    } else if (feature.id === 'ngu-phap') {
      navigate('/grammar');
    } else if (feature.id === 'tu-dien') {
      navigate('/dictionary');
    } else if (feature.id === 'flashcard' || feature.id === 'flashcards') {
      navigate('/flashcards');
    } else if (feature.id === 'quiz') {
      navigate('/quiz');
    } else {
      setActiveModal(`Tính năng "${feature.title}" đã mở sẵn sàng! Chúc bạn học tập hiệu quả.`);
    }
  };

  const handleDetailClick = () => {
    setActiveModal('Chi tiết tiến độ: Bạn đã hoàn thành 42/50 bài học và ghi nhớ 228/300 từ vựng cốt lõi!');
  };

  const handleNotificationClick = () => {
    showToast?.('Phiên bản chính thức v2.5.0: Tất cả 7 tính năng & bài học đều đã mở hoàn toàn!');
  };

  return (
    <div className="w-full max-w-[390px] h-[100vh] sm:h-[844px] bg-[#D92329] sm:rounded-[28px] shadow-[0_25px_60px_-15px_rgba(200,20,20,0.5),0_0_0_1px_rgba(255,255,255,0.15)] flex flex-col justify-between relative overflow-hidden font-sans border-0 sm:border border-white/20">
      {/* Background Decorative Layer */}
      <ChineseBackground />

      {/* Scrollable Content Viewport */}
      <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col justify-between relative z-10">
        
        {/* Top Header Region */}
        <div>
          <StatusBar />
          <WelcomeHeader onNotificationClick={handleNotificationClick} />

          {/* Tab view conditional or default home view */}
          {activeTab === 'home' ? (
            <>
              <LearningProgressCard onDetailClick={handleDetailClick} />
              <FeatureGrid onSelectFeature={handleFeatureClick} />
              <StreakRewardSection />
            </>
          ) : (
            <div className="px-5 py-8 text-center text-white space-y-4">
              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md mx-auto flex items-center justify-center border border-white/20">
                <CheckCircle2 className="w-8 h-8 text-amber-300" />
              </div>
              <h3 className="text-xl font-bold">
                {activeTab === 'settings' && 'Cài đặt ứng dụng'}
              </h3>
              <p className="text-xs text-white/80 max-w-[260px] mx-auto">
                Học Tiếng Trung Công Xưởng - Phiên bản Chính Thức.
              </p>
              <button
                onClick={() => setActiveTab('home')}
                type="button"
                className="bg-white text-[#D92329] font-bold text-xs px-5 py-2 rounded-full shadow-md active:scale-95 transition-transform cursor-pointer"
              >
                Quay về Trang chủ
              </button>
            </div>
          )}
        </div>

        {/* Bottom spacing before Nav bar */}
        <div className="h-3" />
      </div>

      {/* Sticky Bottom Navigation Bar */}
      <BottomNavigation
        activeTab={activeTab}
        onTabChange={(tab) => {
          if (tab === 'pronunciation') {
            navigate('/pronunciation');
          } else if (tab === 'grammar') {
            navigate('/grammar');
          } else if (tab === 'dictionary') {
            navigate('/dictionary');
          } else if (tab === 'flashcard' || tab === 'flashcards') {
            navigate('/flashcards');
          } else if (tab === 'quiz') {
            navigate('/quiz');
          } else if (tab === 'settings') {
            navigate('/settings');
          } else {
            setActiveTab(tab);
          }
        }}
      />

      {/* Feature Interactive Modal */}
      {activeModal && (
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-white rounded-2xl p-5 w-full max-w-[320px] shadow-2xl text-center space-y-3 relative border border-red-100">
            <button
              onClick={() => setActiveModal(null)}
              type="button"
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 rounded-full bg-red-50 text-[#EF3B32] mx-auto flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Thông báo</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {activeModal}
            </p>
            <button
              onClick={() => setActiveModal(null)}
              type="button"
              className="w-full bg-gradient-to-r from-[#EF3B32] to-[#D92329] text-white text-xs font-bold py-2.5 rounded-xl shadow-md active:scale-95 transition-transform cursor-pointer"
            >
              Bắt đầu trải nghiệm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
