export type HSKLevel = 'HSK 1' | 'HSK 2' | 'HSK 3' | 'HSK 4' | 'HSK 5' | 'HSK 6';
export type QuizQuestionType =
  | 'multiple-choice'
  | 'multiple-select'
  | 'fill-blank'
  | 'reorder'
  | 'matching'
  | 'listening'
  | 'pronunciation'
  | 'tone-recognition'
  | 'true-false'
  | 'error-correction'
  | 'translation'
  | 'reading';

export type QuizDifficulty = 'Dễ' | 'Trung bình' | 'Khó';
export type QuizCategoryType =
  | 'Từ vựng HSK'
  | 'Ngữ pháp'
  | 'Phát âm & Pinyin'
  | 'Nghe hiểu'
  | 'Giao tiếp thiết yếu'
  | 'Công xưởng & Nhà máy'
  | 'An toàn lao động'
  | 'Thi thử HSK';

export interface QuizOption {
  id: string;
  textChinese?: string;
  textPinyin?: string;
  textVietnamese: string;
  isCorrect: boolean;
  explanation?: string;
}

export interface QuizQuestion {
  id: string;
  slug: string;
  type: QuizQuestionType;
  category: QuizCategoryType;
  subcategory?: string;
  hskLevel: HSKLevel;
  difficulty: QuizDifficulty;
  questionChinese: string;
  questionPinyin?: string;
  questionVietnamese: string;
  options: QuizOption[];
  correctAnswerId: string;
  explanation: string;
  audioText?: string;
  isFactoryQuestion?: boolean;
  xp: number;
}

export interface QuizCollection {
  id: string;
  title: string;
  description: string;
  category: QuizCategoryType;
  hskLevel?: HSKLevel;
  totalQuestions: number;
  estimatedMinutes: number;
  xpReward: number;
  iconName: string;
  color: string;
  isFactoryCollection?: boolean;
}

export interface QuizSessionState {
  collectionId: string;
  questions: QuizQuestion[];
  currentIndex: number;
  userAnswers: Record<string, string>; // questionId -> optionId
  isFinished: boolean;
  startTime: number;
  score: number;
  totalXp: number;
  isPaused: boolean;
}

export interface WrongAnswerRecord {
  id: string;
  question: QuizQuestion;
  userOptionId: string;
  timestamp: number;
}

export interface QuizAchievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}
