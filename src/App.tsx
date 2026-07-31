import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { PronunciationPage } from './pages/PronunciationPage';
import { GrammarPage } from './pages/GrammarPage';
import { DictionaryPage } from './pages/DictionaryPage';
import { FlashcardsPage } from './pages/FlashcardsPage';
import { QuizPage } from './pages/QuizPage';
import { SettingsPage } from './pages/SettingsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <main className="min-h-screen w-full bg-slate-900 flex flex-col items-center justify-start selection:bg-red-500 selection:text-white">
          {/* Toast Notification Banner */}
          {toastMessage && (
            <div className="fixed top-4 z-50 animate-bounce transition-all">
              <div className="bg-amber-400 text-slate-900 font-bold px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 text-xs border border-amber-300">
                <Sparkles className="w-4 h-4 text-slate-900" />
                <span>{toastMessage}</span>
              </div>
            </div>
          )}

          {/* Application Router View */}
          <Routes>
            <Route path="/" element={<HomePage showToast={showToast} />} />
            <Route path="/pronunciation" element={<PronunciationPage showToast={showToast} />} />
            <Route path="/grammar" element={<GrammarPage showToast={showToast} />} />
            <Route path="/dictionary" element={<DictionaryPage showToast={showToast} />} />
            <Route path="/flashcards" element={<FlashcardsPage showToast={showToast} />} />
            <Route path="/flashcard" element={<Navigate to="/flashcards" replace />} />
            <Route path="/quiz" element={<QuizPage showToast={showToast} />} />
            <Route path="/settings" element={<SettingsPage showToast={showToast} />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
