export type HSKLevel = 'HSK 1' | 'HSK 2' | 'HSK 3' | 'HSK 4' | 'HSK 5' | 'HSK 6';
export type CardType = 'vocabulary' | 'sentence' | 'grammar' | 'pronunciation' | 'custom';
export type SourceType = 'dictionary' | 'grammar' | 'pronunciation' | 'quiz' | 'custom';
export type LearningState = 'new' | 'learning' | 'review' | 'mastered' | 'suspended';
export type StudyRating = 'again' | 'hard' | 'good' | 'easy';

export interface SpacedRepetitionData {
  repetitions: number;
  intervalDays: number;
  easeFactor: number;
  lapses: number;
  lastReviewedAt?: number;
  nextReviewAt: number;
}

export interface FlashcardItem {
  id: string;
  cardType: CardType;
  sourceType: SourceType;
  sourceId: string;
  deckIds: string[];
  frontOverride?: string;
  backOverride?: string;
  note?: string;
  mnemonic?: string;
  tags?: string[];
  hskLevel?: HSKLevel;
  isFavorite?: boolean;
  learningState: LearningState;
  reviewData: SpacedRepetitionData;
  simplified?: string;
  pinyin?: string;
  vietnamese?: string;
  audioText?: string;
}

export interface FlashcardDeck {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: 'HSK' | 'Giao tiếp' | 'Công xưởng' | 'Ngữ pháp' | 'Phát âm' | 'Tùy chọn';
  sourceType: SourceType;
  iconName: string;
  color: string;
  cardIds: string[];
  totalCards: number;
  dueCards: number;
  masteredCards: number;
  hskLevel?: HSKLevel;
  isDefault?: boolean;
}

export interface FlashcardSessionState {
  deckId: string;
  cards: FlashcardItem[];
  currentIndex: number;
  isFlipped: boolean;
  reviewedCount: number;
  masteredCount: number;
  againCount: number;
  earnedXp: number;
  startTime: number;
  isFinished: boolean;
}
