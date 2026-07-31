import { FlashcardItem } from '../../types/flashcards';
import { DICTIONARY_ENTRIES_DATA } from '../dictionary/dictionaryEntriesData';
import { generateCore2000Flashcards } from './core2000/core2000Cards';

export const FLASHCARD_CARDS_DATA: FlashcardItem[] = generateCore2000Flashcards(DICTIONARY_ENTRIES_DATA);
