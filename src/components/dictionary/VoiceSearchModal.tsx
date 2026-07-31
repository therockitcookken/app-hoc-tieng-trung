import React, { useState, useEffect, useRef } from 'react';
import { X, Mic } from 'lucide-react';

interface VoiceSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectWord: (word: string) => void;
}

export const VoiceSearchModal: React.FC<VoiceSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectWord,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      handleStartListening();
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStartListening = () => {
    setIsListening(true);
    setRecognizedText(null);
    setTimer(0);

    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev >= 3) {
          if (timerRef.current) clearInterval(timerRef.current);
          setIsListening(false);
          setRecognizedText('学习');
          return 4;
        }
        return prev + 1;
      });
    }, 1000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="absolute inset-0 bg-slate-900/70 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 w-full max-w-[320px] shadow-2xl relative border border-emerald-100 text-center space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          type="button"
          className="absolute top-3.5 right-3.5 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-full bg-emerald-50 text-[#28B849] mx-auto flex items-center justify-center">
          <Mic className="w-6 h-6 stroke-[2.2]" />
        </div>

        <div>
          <h3 className="text-[16px] font-extrabold text-slate-900">
            Tìm kiếm bằng giọng nói
          </h3>
          <p className="text-[11.5px] text-slate-500 font-medium mt-1">
            Hãy nói từ tiếng Trung bạn muốn tra
          </p>
        </div>

        {/* Pulse Mic Container */}
        <div className="py-4 flex flex-col items-center justify-center space-y-3">
          <button
            onClick={handleStartListening}
            type="button"
            className={`w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl transition-all cursor-pointer ${
              isListening
                ? 'bg-emerald-500 animate-pulse ring-8 ring-emerald-300/40'
                : 'bg-gradient-to-tr from-[#34C759] to-[#28B849]'
            }`}
          >
            <Mic className="w-9 h-9 stroke-[2]" />
          </button>

          {isListening ? (
            <span className="text-xs font-bold text-emerald-600 animate-pulse">
              Đang lắng nghe... ({timer}s)
            </span>
          ) : recognizedText ? (
            <div className="space-y-1">
              <span className="text-xs text-slate-400 font-medium block">
                Kết quả nhận diện:
              </span>
              <span className="text-[24px] font-extrabold text-[#28B849] font-serif block">
                "{recognizedText}"
              </span>
            </div>
          ) : (
            <span className="text-xs text-slate-400 font-medium">
              Chạm vào micro để nói lại
            </span>
          )}
        </div>

        {/* Confirm Button */}
        {recognizedText && (
          <button
            onClick={() => {
              onSelectWord(recognizedText);
              onClose();
            }}
            type="button"
            className="w-full bg-gradient-to-r from-[#34C759] to-[#28B849] text-white text-xs font-bold py-2.5 rounded-xl shadow-md active:scale-95 transition-transform cursor-pointer"
          >
            Tra từ "{recognizedText}" ngay
          </button>
        )}
      </div>
    </div>
  );
};
