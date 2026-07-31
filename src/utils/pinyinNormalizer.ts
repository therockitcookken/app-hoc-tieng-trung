import { removeToneMarks } from './pinyinToneConverter';

/**
 * Normalizes a Pinyin or text string for flexible search matching.
 * Converts tone marks, numbered pinyin, 'v' / 'ü' / 'u:', uppercase letters to lowercase no-tone string.
 */
export function normalizePinyin(input: string): string {
  if (!input) return '';

  let text = input.trim().toLowerCase();

  // Replace v/u: with ü
  text = text.replace(/u:/g, 'ü').replace(/v/g, 'ü');

  // Remove tone numbers if present (e.g., hao3 -> hao, xue2 -> xue)
  text = text.replace(/[0-5]/g, '');

  // Strip tone marks using converter utility
  text = removeToneMarks(text);

  // Replace spaces and special characters
  text = text.replace(/[^a-z0-9àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđ\s]/gi, '');

  return text.trim();
}
