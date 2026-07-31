import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="w-full max-w-[390px] h-[100vh] sm:h-[844px] bg-slate-900 sm:rounded-[28px] flex flex-col items-center justify-center p-6 text-center text-white space-y-4">
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 border border-red-500/30">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold">Đã có lỗi xảy ra</h2>
          <p className="text-xs text-slate-300 max-w-[260px]">
            Hệ thống đã tự động khôi phục. Vui lòng bấm thử lại để tiếp tục sử dụng ứng dụng.
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false });
              window.location.href = '/';
            }}
            type="button"
            className="bg-[#EF3B32] text-white font-bold text-xs px-5 py-2.5 rounded-full shadow-md active:scale-95 transition-transform flex items-center space-x-1.5 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Thử lại ngay</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
