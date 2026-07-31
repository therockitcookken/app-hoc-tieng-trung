import React, { useState, useEffect } from 'react';
import { X, Camera, Image, Sparkles, CheckCircle2 } from 'lucide-react';

interface ScanTextModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectWord: (word: string) => void;
}

export const ScanTextModal: React.FC<ScanTextModalProps> = ({
  isOpen,
  onClose,
  onSelectWord,
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      setIsScanning(false);
      setScanResult(null);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSimulateCapture = () => {
    setIsScanning(true);
    setScanResult(null);
    setTimeout(() => {
      setIsScanning(false);
      setScanResult('安全第一');
    }, 1500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="absolute inset-0 bg-slate-900/70 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-5 w-full max-w-[340px] shadow-2xl relative border border-emerald-100 space-y-4"
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

        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#28B849] flex items-center justify-center flex-shrink-0">
            <Camera className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <h3 className="text-[15px] font-extrabold text-slate-900 leading-tight">
              Quét chữ / Tra qua hình ảnh
            </h3>
            <p className="text-[11px] text-slate-500 font-medium">
              Chụp hoặc tải ảnh chứa văn bản tiếng Trung
            </p>
          </div>
        </div>

        {/* Camera Viewfinder Preview */}
        <div className="w-full h-44 bg-slate-900 rounded-xl relative overflow-hidden flex flex-col items-center justify-center border-2 border-dashed border-emerald-400/50">
          <div className="absolute inset-4 border border-emerald-400/60 rounded-lg pointer-events-none" />
          
          {isScanning ? (
            <div className="text-center space-y-2">
              <Sparkles className="w-8 h-8 text-emerald-400 animate-spin mx-auto" />
              <span className="text-xs text-emerald-200 font-bold block animate-pulse">
                Đang nhận diện văn bản OCR...
              </span>
            </div>
          ) : scanResult ? (
            <div className="text-center space-y-2 p-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <span className="text-xs text-slate-300 font-medium block">
                Kết quả nhận diện:
              </span>
              <span className="text-[28px] font-extrabold text-white font-serif tracking-wider block">
                {scanResult}
              </span>
            </div>
          ) : (
            <div className="text-center space-y-2 p-3">
              <Camera className="w-10 h-10 text-slate-500 mx-auto opacity-70" />
              <span className="text-xs text-slate-400 font-medium block">
                Căn chỉnh chữ Hán vào khung hình
              </span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={handleSimulateCapture}
            type="button"
            className="bg-emerald-50 hover:bg-emerald-100 text-[#28B849] font-bold text-xs py-2.5 rounded-xl border border-emerald-200 flex items-center justify-center space-x-1 cursor-pointer"
          >
            <Image className="w-4 h-4" />
            <span>Chọn ảnh mẫu</span>
          </button>

          {scanResult ? (
            <button
              onClick={() => {
                onSelectWord('安全');
                onClose();
              }}
              type="button"
              className="bg-[#28B849] hover:bg-[#1FB03E] text-white font-bold text-xs py-2.5 rounded-xl shadow-md active:scale-95 transition-transform flex items-center justify-center space-x-1 cursor-pointer"
            >
              <span>Tra từ "安全"</span>
            </button>
          ) : (
            <button
              onClick={handleSimulateCapture}
              type="button"
              className="bg-[#28B849] hover:bg-[#1FB03E] text-white font-bold text-xs py-2.5 rounded-xl shadow-md active:scale-95 transition-transform flex items-center justify-center space-x-1 cursor-pointer"
            >
              <Camera className="w-4 h-4" />
              <span>Chụp ảnh ngay</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
