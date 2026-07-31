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
  Info,
  Check,
  Sparkles,
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

  const [hapticFeedback, setHapticFeedback] = useState(() => {
    return localStorage.getItem('setting_hapticFeedback') !== 'false';
  });

  const [reducedMotion, setReducedMotion] = useState(() => {
    return localStorage.getItem('setting_reducedMotion') === 'true';
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

  const handleClearHistory = () => {
    try {
      localStorage.removeItem('dict_recent_searches');
      showToast?.('Đã xóa sạch lịch sử tra cứu từ vựng!');
    } catch {
      showToast?.('Lịch sử tra cứu đã trống.');
    }
  };

  const handleResetProgress = () => {
    if (window.confirm('Bạn có chắc chắn muốn đặt lại toàn bộ tiến độ học tập không?')) {
      try {
        localStorage.clear();
        showToast?.('Đã đặt lại tiến độ học tập về ban đầu!');
      } catch {
        // Ignore
      }
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
    <div className="w-full max-w-[390px] h-[100vh] sm:h-[844px] bg-slate-900 sm:rounded-[28px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.15)] flex flex-col justify-between relative overflow-hidden font-sans border-0 sm:border border-white/20">
      {/* Background Decorative Layer (Red variant default) */}
      <ChineseBackground />

      {/* Scrollable Viewport */}
      <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col justify-between relative z-10">
        <div>
          <StatusBar />

          {/* Header */}
          <div className="w-full px-4 pt-3 pb-2 relative z-10">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate(-1)}
                type="button"
                className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-xs active:scale-90 transition-transform cursor-pointer"
                aria-label="Quay lại"
              >
                <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
              </button>

              <div className="flex-1 text-center px-2">
                <h1 className="text-[20px] font-extrabold tracking-wide uppercase drop-shadow-xs text-white">
                  CÀI ĐẶT
                </h1>
                <p className="text-[11.5px] text-white/90 font-medium tracking-tight mt-0.5">
                  Tùy chỉnh hệ thống & dữ liệu học tập
                </p>
              </div>

              <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-xs">
                <Sliders className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="px-4 py-2 space-y-3.5">
            {/* Group 1: Learning Preferences */}
            <div className="bg-white rounded-2xl p-4 shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-white/80 space-y-3">
              <h2 className="text-[13px] font-extrabold text-slate-900 tracking-tight flex items-center space-x-1.5 border-b border-slate-100 pb-2">
                <Sparkles className="w-4 h-4 text-[#EF3B32]" />
                <span>Hiển thị & Âm thanh học tập</span>
              </h2>

              {/* Pinyin Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[12.5px] font-bold text-slate-800">Hiển thị Pinyin</h3>
                  <p className="text-[10.5px] text-slate-500 font-medium">Hiện phiên âm trên bài học & từ vựng</p>
                </div>
                <button
                  onClick={() => toggleSetting('setting_showPinyin', showPinyin, setShowPinyin)}
                  type="button"
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    showPinyin ? 'bg-[#EF3B32]' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-md absolute top-0.5 transition-transform ${
                      showPinyin ? 'left-[22px]' : 'left-0.5'
                    }`}
                  />
                </button>
              </div>

              {/* Vietnamese Toggle */}
              <div className="flex items-center justify-between pt-1">
                <div>
                  <h3 className="text-[12.5px] font-bold text-slate-800">Dịch nghĩa tiếng Việt</h3>
                  <p className="text-[10.5px] text-slate-500 font-medium">Hiện nghĩa tiếng Việt chi tiết</p>
                </div>
                <button
                  onClick={() => toggleSetting('setting_showVietnamese', showVietnamese, setShowVietnamese)}
                  type="button"
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    showVietnamese ? 'bg-[#EF3B32]' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-md absolute top-0.5 transition-transform ${
                      showVietnamese ? 'left-[22px]' : 'left-0.5'
                    }`}
                  />
                </button>
              </div>

              {/* Speech Speed */}
              <div className="pt-2 border-t border-slate-100 space-y-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-[12.5px] font-bold text-slate-800 flex items-center space-x-1">
                    <Volume2 className="w-4 h-4 text-slate-500" />
                    <span>Tốc độ đọc tiếng Trung</span>
                  </h3>
                  <span className="text-[11px] font-bold text-[#EF3B32]">{speechSpeed}x</span>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-1">
                  {(['0.75', '1.0', '1.25'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSpeedChange(s)}
                      type="button"
                      className={`py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        speechSpeed === s
                          ? 'bg-red-50 border-[#EF3B32] text-[#EF3B32] shadow-2xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {s}x {s === '0.75' ? '(Chậm)' : s === '1.0' ? '(Chuẩn)' : '(Nhanh)'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Group 2: System & Vibration */}
            <div className="bg-white rounded-2xl p-4 shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-white/80 space-y-3">
              <h2 className="text-[13px] font-extrabold text-slate-900 tracking-tight flex items-center space-x-1.5 border-b border-slate-100 pb-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Trải nghiệm & Phản hồi</span>
              </h2>

              {/* Sound Effects */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[12.5px] font-bold text-slate-800">Hiệu ứng âm thanh</h3>
                  <p className="text-[10.5px] text-slate-500 font-medium">Âm thanh khi trả lời đúng/sai</p>
                </div>
                <button
                  onClick={() => toggleSetting('setting_soundEffects', soundEffects, setSoundEffects)}
                  type="button"
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    soundEffects ? 'bg-amber-500' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-md absolute top-0.5 transition-transform ${
                      soundEffects ? 'left-[22px]' : 'left-0.5'
                    }`}
                  />
                </button>
              </div>

              {/* Haptic Feedback */}
              <div className="flex items-center justify-between pt-1">
                <div>
                  <h3 className="text-[12.5px] font-bold text-slate-800">Rung phản hồi</h3>
                  <p className="text-[10.5px] text-slate-500 font-medium">Hiệu ứng rung chạm haptic khi tương tác</p>
                </div>
                <button
                  onClick={() => toggleSetting('setting_hapticFeedback', hapticFeedback, setHapticFeedback)}
                  type="button"
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    hapticFeedback ? 'bg-amber-500' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-md absolute top-0.5 transition-transform ${
                      hapticFeedback ? 'left-[22px]' : 'left-0.5'
                    }`}
                  />
                </button>
              </div>

              {/* Reduced Motion */}
              <div className="flex items-center justify-between pt-1">
                <div>
                  <h3 className="text-[12.5px] font-bold text-slate-800">Giảm chuyển động (Reduced Motion)</h3>
                  <p className="text-[10.5px] text-slate-500 font-medium">Tắt các hiệu ứng hoạt họa trượt ngang</p>
                </div>
                <button
                  onClick={() => toggleSetting('setting_reducedMotion', reducedMotion, setReducedMotion)}
                  type="button"
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    reducedMotion ? 'bg-amber-500' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-md absolute top-0.5 transition-transform ${
                      reducedMotion ? 'left-[22px]' : 'left-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Group 3: Data Management */}
            <div className="bg-white rounded-2xl p-4 shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-white/80 space-y-2.5">
              <h2 className="text-[13px] font-extrabold text-slate-900 tracking-tight flex items-center space-x-1.5 border-b border-slate-100 pb-2">
                <Sliders className="w-4 h-4 text-blue-600" />
                <span>Quản lý dữ liệu học</span>
              </h2>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={handleExportData}
                  type="button"
                  className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 p-2.5 rounded-xl text-[11px] font-bold flex items-center justify-center space-x-1.5 cursor-pointer active:scale-95 transition-transform"
                >
                  <Download className="w-4 h-4 text-blue-600" />
                  <span>Sao lưu dữ liệu</span>
                </button>

                <button
                  onClick={handleClearHistory}
                  type="button"
                  className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 p-2.5 rounded-xl text-[11px] font-bold flex items-center justify-center space-x-1.5 cursor-pointer active:scale-95 transition-transform"
                >
                  <RotateCcw className="w-4 h-4 text-amber-600" />
                  <span>Xóa lịch sử tìm</span>
                </button>
              </div>

              <button
                onClick={handleResetProgress}
                type="button"
                className="w-full bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 py-2.5 px-3 rounded-xl text-[11.5px] font-bold flex items-center justify-center space-x-1.5 cursor-pointer active:scale-95 transition-transform mt-1"
              >
                <RotateCcw className="w-4 h-4 text-red-600" />
                <span>Đặt lại tiến độ học tập ban đầu</span>
              </button>
            </div>

            {/* Group 4: App Info & Official Release Banner */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-4 shadow-md space-y-2 text-center">
              <div className="w-9 h-9 rounded-full bg-white/10 mx-auto flex items-center justify-center border border-white/20">
                <Info className="w-5 h-5 text-amber-300" />
              </div>
              <h3 className="text-xs font-bold text-white">
                Học Tiếng Trung Công Xưởng - Bản Chính Thức
              </h3>
              <p className="text-[10px] text-slate-300">
                Phiên bản v2.5.0 Official Release • Full 100% Tính Năng
              </p>
              <div className="pt-1 flex items-center justify-center space-x-1 text-[9.5px] text-emerald-400 font-bold">
                <Check className="w-3.5 h-3.5" />
                <span>Đã lưu trữ tiến độ trên thiết bị này</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom spacing */}
        <div className="h-3" />
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab="settings" />
    </div>
  );
};
