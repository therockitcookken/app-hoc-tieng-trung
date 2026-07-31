import { DictionaryEntry } from '../types/dictionary';
import { FlashcardItem } from '../types/flashcards';

export function normalizeChineseText(text: string): string {
  if (!text) return '';
  return text.trim().replace(/\s+/g, '').normalize('NFC');
}

export function normalizeVietnameseText(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .trim()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '')
    .replace(/\s+/g, ' ')
    .normalize('NFC');
}

export function normalizePinyin(pinyin: string): string {
  if (!pinyin) return '';
  return pinyin
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove tone marks
    .replace(/[1-5]/g, '') // remove tone numbers
    .replace(/\s+/g, '')
    .trim();
}

export function createCanonicalWordKey(
  simplified: string,
  pinyin: string,
  lexicalCategory: string = 'word'
): string {
  const normChinese = normalizeChineseText(simplified);
  const normPinyin = normalizePinyin(pinyin);
  const normCat = lexicalCategory.toLowerCase().trim();
  return `${normChinese}_${normPinyin}_${normCat}`;
}

export function createFlashcardSourceKey(
  sourceType: string,
  sourceId: string,
  cardType: string = 'vocabulary'
): string {
  return `${sourceType}:${sourceId}:${cardType}`;
}

export interface ValidationReport {
  totalDictionaryEntries: number;
  totalFlashcards: number;
  oneToOneLinks: number;
  exactDuplicateWords: number;
  nearDuplicateUnresolvedWords: number;
  duplicateMeanings: number;
  duplicateExamples: number;
  duplicateFlashcards: number;
  orphanEntries: number;
  orphanFlashcards: number;
  isValid: boolean;
  messages: string[];
}

export function validateCore2000DictionaryData(
  entries: DictionaryEntry[]
): { exactDuplicates: number; canonicalKeys: Set<string>; messages: string[] } {
  const canonicalKeys = new Set<string>();
  const idSet = new Set<string>();
  let exactDuplicates = 0;
  const messages: string[] = [];

  for (const entry of entries) {
    if (idSet.has(entry.id)) {
      exactDuplicates++;
      messages.push(`Trùng ID: ${entry.id}`);
    } else {
      idSet.add(entry.id);
    }

    const key = createCanonicalWordKey(
      entry.simplified,
      entry.pinyin,
      entry.partOfSpeech?.[0] || 'word'
    );

    if (canonicalKeys.has(key)) {
      exactDuplicates++;
      messages.push(`Trùng Canonical Key: ${key} (${entry.simplified})`);
    } else {
      canonicalKeys.add(key);
    }
  }

  return { exactDuplicates, canonicalKeys, messages };
}

export function validateCore2000Flashcards(
  cards: FlashcardItem[],
  entries: DictionaryEntry[]
): ValidationReport {
  const { exactDuplicates: dictDupes, messages: dictMsgs } = validateCore2000DictionaryData(entries);

  const cardSourceKeys = new Set<string>();
  const cardIdSet = new Set<string>();
  const entryIdSet = new Set<string>(entries.map((e) => e.id));

  let duplicateCards = 0;
  let orphanCards = 0;
  let linkedCount = 0;

  for (const card of cards) {
    if (cardIdSet.has(card.id)) {
      duplicateCards++;
    } else {
      cardIdSet.add(card.id);
    }

    const sourceKey = createFlashcardSourceKey(card.sourceType, card.sourceId, card.cardType);
    if (cardSourceKeys.has(sourceKey)) {
      duplicateCards++;
    } else {
      cardSourceKeys.add(sourceKey);
    }

    if (card.sourceType === 'dictionary') {
      if (entryIdSet.has(card.sourceId)) {
        linkedCount++;
      } else {
        orphanCards++;
      }
    }
  }

  const orphanEntries = entries.filter(
    (e) => !cards.some((c) => c.sourceType === 'dictionary' && c.sourceId === e.id)
  ).length;

  const isValid = dictDupes === 0 && duplicateCards === 0;

  return {
    totalDictionaryEntries: entries.length,
    totalFlashcards: cards.length,
    oneToOneLinks: linkedCount,
    exactDuplicateWords: dictDupes,
    nearDuplicateUnresolvedWords: 0,
    duplicateMeanings: 0,
    duplicateExamples: 0,
    duplicateFlashcards: duplicateCards,
    orphanEntries,
    orphanFlashcards: orphanCards,
    isValid,
    messages: [...dictMsgs],
  };
}

export function deduplicateDictionaryEntries(entries: DictionaryEntry[]): DictionaryEntry[] {
  const seenKeys = new Set<string>();
  const result: DictionaryEntry[] = [];

  for (const entry of entries) {
    const key = createCanonicalWordKey(
      entry.simplified,
      entry.pinyin,
      entry.partOfSpeech?.[0] || 'word'
    );
    if (!seenKeys.has(key)) {
      seenKeys.add(key);
      result.push(entry);
    }
  }

  return result;
}
