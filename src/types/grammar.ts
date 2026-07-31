export type HSKLevel = 'HSK 1' | 'HSK 2' | 'HSK 3' | 'HSK 4' | 'HSK 5' | 'HSK 6';
export type GrammarDifficulty = 'Cơ bản' | 'Sơ cấp' | 'Trung cấp' | 'Trung cao cấp' | 'Nâng cao';
export type SentenceRole =
  | 'Chủ ngữ (S)'
  | 'Vị ngữ (P)'
  | 'Động từ (V)'
  | 'Tân ngữ (O)'
  | 'Định ngữ (Att)'
  | 'Trạng ngữ (Adv)'
  | 'Bổ ngữ (Comp)'
  | 'Trợ từ (Part)'
  | 'Giới từ (Prep)'
  | 'Liên từ (Conj)'
  | 'Thời gian (Time)'
  | 'Địa điểm (Loc)';

export interface SentenceAnalysisToken {
  word: string;
  pinyin: string;
  role: SentenceRole;
  roleDescription: string;
  colorClass: string;
}

export interface GrammarExample {
  id: string;
  chinese: string;
  pinyin: string;
  vietnamese: string;
  hskLevel?: HSKLevel;
  isFactoryExample?: boolean;
  audioText: string;
  tokens?: SentenceAnalysisToken[];
}

export interface GrammarFormula {
  pattern: string;
  explanation: string;
  exampleChinese: string;
  examplePinyin: string;
  exampleVietnamese: string;
}

export interface GrammarMistakeItem {
  id: string;
  wrongSentence: string;
  correctSentence: string;
  explanation: string;
  relatedPointTitle: string;
  hskLevel: HSKLevel;
}

export interface GrammarComparisonPair {
  id: string;
  title: string;
  structureA: string;
  structureB: string;
  differenceSummary: string;
  itemA: {
    pattern: string;
    explanation: string;
    exampleChinese: string;
    examplePinyin: string;
    exampleVietnamese: string;
  };
  itemB: {
    pattern: string;
    explanation: string;
    exampleChinese: string;
    examplePinyin: string;
    exampleVietnamese: string;
  };
}

export interface GrammarExerciseItem {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'reorder' | 'error-correction' | 'particle-de';
  category: string;
  title: string;
  instruction: string;
  questionChinese?: string;
  questionPinyin?: string;
  audioText?: string;
  options?: { id: string; text: string; isCorrect: boolean; explanation?: string }[];
  correctAnswerId?: string;
  difficulty: GrammarDifficulty;
  xp: number;
}

export interface GrammarPoint {
  id: string;
  slug: string;
  titleVietnamese: string;
  titleChinese: string;
  hskLevel: HSKLevel;
  difficulty: GrammarDifficulty;
  category: string;
  summary: string;
  detailedExplanation: string;
  formulas: GrammarFormula[];
  usageConditions: string[];
  affirmativePattern?: string;
  negativePattern?: string;
  questionPattern?: string;
  commonMistakes?: string[];
  examples: GrammarExample[];
  factoryExamples?: GrammarExample[];
  isFavorite?: boolean;
  isFactoryTopic?: boolean;
}

export interface GrammarCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  iconName: string;
}
