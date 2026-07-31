import { DictionaryEntry } from '../../types/dictionary';
import { generateCore2000Entries } from './core2000/core2000Generator';

export const DICTIONARY_ENTRIES_DATA: DictionaryEntry[] = generateCore2000Entries();
