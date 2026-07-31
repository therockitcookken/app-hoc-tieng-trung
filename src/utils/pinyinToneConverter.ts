/**
 * Pinyin Tone Mark Converter Utility
 * Converts numbered pinyin (e.g. hao3, lü4, xue2) <-> tone marked pinyin (e.g. hǎo, lǜ, xué)
 */

const TONE_MAP: Record<string, string[]> = {
  a: ['a', 'ā', 'á', 'ǎ', 'à', 'a'],
  e: ['e', 'ē', 'é', 'ě', 'è', 'e'],
  o: ['o', 'ō', 'ó', 'ǒ', 'ò', 'o'],
  i: ['i', 'ī', 'í', 'ǐ', 'ì', 'i'],
  u: ['u', 'ū', 'ú', 'ǔ', 'ù', 'u'],
  ü: ['ü', 'ǖ', 'ǘ', 'ǚ', 'ǜ', 'ü'],
  v: ['ü', 'ǖ', 'ǘ', 'ǚ', 'ǜ', 'ü'], // 'v' as alias for 'ü'
};

const REVERSE_TONE_MAP: Record<string, { char: string; tone: number }> = {};
Object.entries(TONE_MAP).forEach(([base, tones]) => {
  tones.forEach((t, idx) => {
    if (idx > 0 && idx < 5) {
      REVERSE_TONE_MAP[t] = { char: base === 'v' ? 'ü' : base, tone: idx };
    }
  });
});

/**
 * Converts a single numbered Pinyin word (e.g. "hao3", "lü4", "xue2") to tone-marked Pinyin ("hǎo", "lǜ", "xué").
 */
export function convertNumberedPinyinWordToToneMarks(word: string): string {
  if (!word) return '';
  // Normalize 'v' to 'ü'
  let normalized = word.replace(/v/g, 'ü').replace(/V/g, 'Ü');

  const match = normalized.match(/^([a-zA-ZüÜ]+)([0-5])$/);
  if (!match) return normalized;

  const [, syllables, toneStr] = match;
  const tone = parseInt(toneStr, 10);
  if (tone === 0 || tone === 5) return syllables;

  // Rules for placing tone mark:
  // 1. First priority: 'a' or 'e'
  // 2. In 'ou', place on 'o'
  // 3. Otherwise, place on the last vowel (e.g., 'iu' -> on 'u', 'ui' -> on 'i')
  let targetIndex = -1;
  const lower = syllables.toLowerCase();

  if (lower.includes('a')) {
    targetIndex = lower.indexOf('a');
  } else if (lower.includes('e')) {
    targetIndex = lower.indexOf('e');
  } else if (lower.includes('ou')) {
    targetIndex = lower.indexOf('o');
  } else {
    // Find the last vowel
    for (let i = lower.length - 1; i >= 0; i--) {
      if ('iouü'.includes(lower[i])) {
        targetIndex = i;
        break;
      }
    }
  }

  if (targetIndex === -1) return syllables;

  const targetChar = syllables[targetIndex];
  const lowerTarget = targetChar.toLowerCase();
  const toneArray = TONE_MAP[lowerTarget];

  if (!toneArray || !toneArray[tone]) return syllables;

  const markedChar = targetChar === lowerTarget ? toneArray[tone] : toneArray[tone].toUpperCase();

  return syllables.substring(0, targetIndex) + markedChar + syllables.substring(targetIndex + 1);
}

/**
 * Converts full numbered pinyin text (e.g. "ni3 hao3 ma5") to tone marks ("nǐ hǎo ma")
 */
export function convertNumberedPinyinToToneMarks(text: string): string {
  if (!text) return '';
  return text
    .split(/(\s+)/)
    .map((token) => (/\s+/.test(token) ? token : convertNumberedPinyinWordToToneMarks(token)))
    .join('');
}

/**
 * Converts tone-marked pinyin text (e.g. "nǐ hǎo") to numbered pinyin ("ni3 hao3")
 */
export function convertToneMarksToNumberedPinyin(text: string): string {
  if (!text) return '';
  const result: string[] = [];

  text.split(/\s+/).forEach((word) => {
    let toneFound = 0;
    let cleanWord = '';

    for (const char of word) {
      if (REVERSE_TONE_MAP[char]) {
        cleanWord += REVERSE_TONE_MAP[char].char;
        toneFound = REVERSE_TONE_MAP[char].tone;
      } else {
        cleanWord += char;
      }
    }

    if (toneFound > 0) {
      result.push(`${cleanWord}${toneFound}`);
    } else {
      result.push(cleanWord);
    }
  });

  return result.join(' ');
}

/**
 * Removes tone marks from pinyin text (e.g. "hǎo" -> "hao")
 */
export function removeToneMarks(text: string): string {
  if (!text) return '';
  let res = '';
  for (const char of text) {
    if (REVERSE_TONE_MAP[char]) {
      res += REVERSE_TONE_MAP[char].char;
    } else {
      res += char;
    }
  }
  return res;
}
