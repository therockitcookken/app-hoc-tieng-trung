import { FlashcardItem } from '../../../types/flashcards';
import { DictionaryEntry } from '../../../types/dictionary';

export function generateCore2000Flashcards(entries: DictionaryEntry[]): FlashcardItem[] {
  return entries.map((entry, idx) => {
    let deckId = 'deck-[#1]';
    if (entry.isFactoryVocabulary) {
      deckId = 'deck-factory-vocab';
    } else if (entry.isCommunication) {
      deckId = 'deck-essential-comm';
    } else if (entry.hskLevel === 'HSK 1') {
      deckId = 'deck-hsk1';
    }

    const vnDef = entry.senses?.[0]?.vietnameseDefinition || 'Từ vựng Hán ngữ';

    return {
      id: `fc-core-${(idx + 1).toString().padStart(4, '0')}`,
      cardType: 'vocabulary',
      sourceType: 'dictionary',
      sourceId: entry.id,
      deckIds: [deckId],
      simplified: entry.simplified,
      pinyin: entry.pinyin,
      vietnamese: vnDef,
      audioText: entry.audioText || entry.simplified,
      hskLevel: entry.hskLevel,
      learningState: 'new',
      reviewData: {
        repetitions: 0,
        intervalDays: 0,
        easeFactor: 2.5,
        lapses: 0,
        nextReviewAt: Date.now(),
      },
    };
  });
}
