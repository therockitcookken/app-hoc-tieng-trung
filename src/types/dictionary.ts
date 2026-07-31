export type HSKLevel = 'HSK 1' | 'HSK 2' | 'HSK 3' | 'HSK 4' | 'HSK 5' | 'HSK 6';
export type HSKSystem = 'HSK_2_0' | 'HSK_3_0';
export type FrequencyLevel = 'high' | 'medium' | 'low' | 'rare';
export type PartOfSpeech =
  | 'Danh từ (N)'
  | 'Động từ (V)'
  | 'Tính từ (Adj)'
  | 'Phó từ (Adv)'
  | 'Đại từ (Pron)'
  | 'Giới từ (Prep)'
  | 'Liên từ (Conj)'
  | 'Trợ từ (Part)'
  | 'Lượng từ (Cl)'
  | 'Số từ (Num)'
  | 'Thán từ (Interj)'
  | 'Cụm từ (Phrase)';

export interface DictionarySense {
  id: string;
  vietnameseDefinition: string;
  shortDefinition: string;
  partOfSpeech: PartOfSpeech;
  usageRegister?: 'Khẩu ngữ' | 'Văn viết' | 'Trang trọng' | 'Trung tính';
  domain?: 'Công xưởng' | 'Giao tiếp' | 'Thương mại' | 'Chung';
  measureWords?: string[];
  examples: DictionaryExample[];
}

export interface DictionaryExample {
  id: string;
  chinese: string;
  traditionalChinese?: string;
  pinyin: string;
  vietnamese: string;
  audioText: string;
  isFactoryExample?: boolean;
}

export interface DictionaryCollocation {
  phraseChinese: string;
  phrasePinyin: string;
  phraseVietnamese: string;
  exampleChinese?: string;
}

export interface ConfusingWordPair {
  id: string;
  wordA: string;
  pinyinA: string;
  wordB: string;
  pinyinB: string;
  differenceSummary: string;
  exampleA: string;
  exampleB: string;
}

export interface DictionaryEntry {
  id: string;
  slug: string;
  simplified: string;
  traditional?: string;
  pinyin: string;
  numberedPinyin: string;
  normalizedPinyin: string;
  audioText: string;
  senses: DictionarySense[];
  partOfSpeech: PartOfSpeech;
  hskLevel: HSKLevel;
  hskSystem: HSKSystem;
  frequency: FrequencyLevel;
  categories: string[];
  topics: string[];
  measureWords?: string[];
  radical?: string;
  strokeCount?: number;
  collocations?: DictionaryCollocation[];
  examples: DictionaryExample[];
  factoryExamples?: DictionaryExample[];
  synonyms?: string[];
  antonyms?: string[];
  confusingWords?: string[];
  isFactoryTopic?: boolean;
  isCoreEssential?: boolean;
  isCommunication?: boolean;
  isWorkplace?: boolean;
  isFactoryVocabulary?: boolean;
}

export interface DictionaryCategory {
  id: string;
  name: string;
  description: string;
  iconName: string;
  color: string;
}
