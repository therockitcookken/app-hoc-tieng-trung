import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChineseBackground } from '../components/ChineseBackground';
import { StatusBar } from '../components/StatusBar';
import { BottomNavigation } from '../components/BottomNavigation';
import {
  ChevronLeft,
  Volume2,
  Sliders,
  RotateCcw,
  Download,
  Zap,
} from 'lucide-react';

interface SettingsPageProps {
  showToast?: (msg: string) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ showToast }) => {
  const navigate = useNavigate();

  // Settings states stored in LocalStorage
  const [showPinyin, setShowPinyin] = useState(() => {
    return localStorage.getItem('setting_showPinyin') !== 'false';
  });

  const [showVietnamese, setShowVietnamese] = useState(() => {
    return localStorage.getItem('setting_showVietnamese') !== 'false';
  });

  const [speechSpeed, setSpeechSpeed] = useState<'0.75' | '1.0' | '1.25'>(() => {
    return (localStorage.getItem('setting_speechSpeed') as any) || '1.0';
  });

  const [soundEffects, setSoundEffects] = useState(() => {
    return localStorage.getItem('setting_soundEffects') !== 'false';
  });

  const toggleSetting = (key: string, val: boolean, setter: (v: boolean) => void) => {
    const nextVal = !val;
    setter(nextVal);
    localStorage.setItem(key, String(nextVal));
    showToast?.('Đã lưu thiết lập cài đặt!');
  };

  const handleSpeedChange = (speed: '0.75' | '1.0' | '1.25') => {
    setSpeechSpeed(speed);
    localStorage.setItem('setting_speechSpeed', speed);
    showToast?.(`Tốc độ phát âm: ${speed}x`);
  };

  const handleResetProgress = () => {
    if (window.confirm('Bạn có chắc chắn muốn làm mới toàn bộ tiến độ học tập? (Lịch sử làm bài và từ yêu thích sẽ giữ nguyên)')) {
      localStorage.removeItem('user_learning_progress');
      showToast?.('Đã làm mới tiến độ bài học!');
    }
  };

  const handleExportData = () => {
    try {
      const data: Record<string, string> = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) data[key] = localStorage.getItem(key) || '';
      }
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `chinese_app_backup_${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast?.('Đã xuất dữ liệu sao lưu thành công!');
    } catch {
      showToast?.('Không thể xuất dữ liệu sao lưu.');
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-900 flex flex-col justify-between relative font-sans overflow-x-hidden">
      {/* Background Decorative Layer */}
      <ChineseBackground />

      {/* Responsive Viewport */}
      <div className="responsive-container py-4 flex-1 flex flex-col justify-between relative z-10">
        <div>
          <StatusBar />

          {/* Header */}
          <div className="w-full py-3 mb-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate(-1)}
                type="button"
                className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-xs active:scale-90 transition-transform cursor-pointer"
                aria-label="Quay lại"
              >
                <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
              </button>

              <div className="flex-1 text-center px-2">
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-wide uppercase text-white">
                  CÀI ĐẶT
                </h1>
                <p className="text-xs sm:text-sm text-white/90 font-medium mt-0.5">
                  Tùy chỉnh hệ thống & dữ liệu học tập
                </p>
              </div>

              <div className="w-10 h-10" />
            </div>
          </div>

          {/* Settings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {/* Display Settings Card */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-md border border-slate-100 space-y-4">
              <div className="flex items-center space-x-2 border-b pb-2">
                <Sliders className="w-5 h-5 text-red-600" />
                <h2 className="font-extrabold text-slate-900 text-sm sm:text-base">Hiển Thị Hán Ngữ</h2>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-slate-800">Hiển thị Pinyin</p>
                    <p className="text-[11px] text-slate-500">Hiện phiên âm chuẩn trên các bài học</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={showPinyin}
                    onChange={() => toggleSetting('setting_showPinyin', showPinyin, setShowPinyin)}
                    className="w-5 h-5 accent-red-600 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-slate-800">Hiển thị nghĩa Tiếng Việt</p>
                    <p className="text-[11px] text-slate-500">Bản dịch câu ví dụ và nghĩa từ vựng</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={showVietnamese}
                    onChange={() => toggleSetting('setting_showVietnamese', showVietnamese, setShowVietnamese)}
                    className="w-5 h-5 accent-red-600 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Audio Settings Card */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-md border border-slate-100 space-y-4">
              <div className="flex items-center space-x-2 border-b pb-2">
                <Volume2 className="w-5 h-5 text-emerald-600" />
                <h2 className="font-extrabold text-slate-900 text-sm sm:text-base">Âm Thanh & Giọng Đọc (TTS)</h2>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs sm:text-sm font-bold text-slate-800 mb-1">Tốc độ phát âm chuẩn</p>
                  <div className="grid grid-cols-3 gap-2">
                    {(['0.75', '1.0', '1.25'] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => handleSpeedChange(s)}
                        type="button"
                        className={`py-1.5 rounded-lg text-xs font-extrabold border cursor-pointer ${
                          speechSpeed === s
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {s}x {s === '1.0' ? '(Chuẩn)' : s === '0.75' ? '(Chậm)' : '(Nhanh)'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-slate-800">Hiệu ứng âm thanh</p>
                    <p className="text-[11px] text-slate-500">Phát âm phản hồi khi làm Quiz & Flashcard</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={soundEffects}
                    onChange={() => toggleSetting('setting_soundEffects', soundEffects, setSoundEffects)}
                    className="w-5 h-5 accent-emerald-600 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* System & Data Backup Card */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-md border border-slate-100 space-y-4">
              <div className="flex items-center space-x-2 border-b pb-2">
                <Zap className="w-5 h-5 text-amber-500" />
                <h2 className="font-extrabold text-slate-900 text-sm sm:text-base">Dữ Liệu & Hệ Thống</h2>
              </div>

              <div className="space-y-2.5">
                <button
                  onClick={handleExportData}
                  type="button"
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm py-2.5 rounded-xl border border-slate-200 flex items-center justify-center space-x-2 cursor-pointer active:scale-95 transition-transform"
                >
                  <Download className="w-4 h-4 text-blue-600" />
                  <span>Sao lưu tiến độ (Export JSON)</span>
                </button>

                <button
                  onClick={handleResetProgress}
                  type="button"
                  className="w-full bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs sm:text-sm py-2.5 rounded-xl border border-red-200 flex items-center justify-center space-x-2 cursor-pointer active:scale-95 transition-transform"
                >
                  <RotateCcw className="w-4 h-4 text-red-600" />
                  <span>Làm mới tiến độ học tập</span>
                </button>
              </div>

              <div className="pt-2 border-t text-center text-[11px] text-slate-500 space-y-0.5">
                <p className="font-bold text-slate-700">App Học Tiếng Trung Công Xưởng v2.5.0</p>
                <p>Mở hoàn toàn 7 module & 2.000 từ vựng thật 100%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="h-4" />
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab="settings" />
    </div>
  );
};
