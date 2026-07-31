import React, { useState, useEffect, useRef } from 'react';
import { X, Edit3, Trash2 } from 'lucide-react';

interface HandwritingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectWord: (word: string) => void;
}

export const HandwritingModal: React.FC<HandwritingModalProps> = ({
  isOpen,
  onClose,
  onSelectWord,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const suggestions = ['好', '学', '安', '工', '机', '质'];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      setTimeout(() => handleClearCanvas(), 50);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#28B849';
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="absolute inset-0 bg-slate-900/70 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-5 w-full max-w-[340px] shadow-2xl relative border border-emerald-100 space-y-3"
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
            <Edit3 className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <h3 className="text-[15px] font-extrabold text-slate-900 leading-tight">
              Tra từ qua viết tay
            </h3>
            <p className="text-[11px] text-slate-500 font-medium">
              Vẽ nét chữ Hán trực tiếp lên ô bên dưới
            </p>
          </div>
        </div>

        {/* Handwriting Canvas Box */}
        <div className="w-full h-48 bg-[#FAFAFA] rounded-2xl border-2 border-dashed border-[#28B849]/40 relative overflow-hidden flex items-center justify-center">
          {/* Grid lines background */}
          <div className="absolute inset-0 border-r border-b border-dashed border-slate-200 pointer-events-none" style={{ left: '50%', top: 0, bottom: 0, width: 0 }} />
          <div className="absolute inset-0 border-b border-dashed border-slate-200 pointer-events-none" style={{ top: '50%', left: 0, right: 0, height: 0 }} />

          <canvas
            ref={canvasRef}
            width={290}
            height={180}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="cursor-crosshair relative z-10 w-full h-full"
          />

          <span className="absolute bottom-2 right-2 text-[10px] text-slate-400 font-medium pointer-events-none">
            Vẽ vào đây
          </span>
        </div>

        {/* Clear & Control Toolbar */}
        <div className="flex items-center justify-between pt-0.5">
          <span className="text-[11px] font-bold text-slate-700">
            Gợi ý nhận diện:
          </span>
          <button
            onClick={handleClearCanvas}
            type="button"
            className="text-[11px] text-red-600 font-bold flex items-center space-x-1 hover:underline cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Xóa nét</span>
          </button>
        </div>

        {/* Candidate List Buttons */}
        <div className="grid grid-cols-6 gap-1.5">
          {suggestions.map((char) => (
            <button
              key={char}
              onClick={() => {
                onSelectWord(char);
                onClose();
              }}
              type="button"
              className="h-10 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-xl text-[20px] font-extrabold text-slate-900 font-serif flex items-center justify-center transition-all active:scale-90 cursor-pointer"
            >
              {char}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
