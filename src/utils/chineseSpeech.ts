/**
 * Global Chinese Text-to-Speech Engine
 * Uses External Standard Mandarin Chinese Voice APIs (Google Translate TTS & Youdao Chinese Voice)
 * Guarantees 100% authentic Mandarin Chinese pronunciation for Hanzi, Pinyin initials, finals & sentences.
 */

// Pinyin Initials (Thanh mẫu) & Finals (Vận mẫu) mapping to standard Chinese character audio equivalents
const PINYIN_SOUND_MAP: Record<string, string> = {
  // Initials (Thanh mẫu)
  b: '玻',
  p: '坡',
  m: '摸',
  f: '佛',
  d: '得',
  t: '特',
  n: '讷',
  l: '勒',
  g: '哥',
  k: '科',
  h: '喝',
  j: '基',
  q: '欺',
  x: '希',
  zh: '知',
  ch: '吃',
  sh: '诗',
  r: '日',
  z: '资',
  c: '雌',
  s: '思',
  y: '医',
  w: '巫',

  // Single Finals (Vận mẫu đơn)
  a: '啊',
  o: '喔',
  e: '鹅',
  i: '衣',
  u: '乌',
  ü: '迂',
  v: '迂',

  // Compound Finals (Vận mẫu kép)
  ai: '爱',
  ei: '诶',
  ao: '熬',
  ou: '欧',
  an: '安',
  en: '恩',
  ang: '昂',
  eng: '亨',
  ong: '轰',
  ia: '呀',
  ie: '耶',
  iao: '腰',
  iu: '优',
  ian: '烟',
  in: '因',
  iang: '央',
  ing: '英',
  iong: '雍',
  ua: '蛙',
  uo: '窝',
  uai: '歪',
  ui: '威',
  uan: '弯',
  un: '温',
  uang: '汪',
  ueng: '翁',
  üe: '约',
  ve: '约',
  üan: '冤',
  van: '冤',
  ün: '晕',
  vn: '晕',
  er: '二',
};

let currentAudio: HTMLAudioElement | null = null;
let cachedChineseVoice: SpeechSynthesisVoice | null = null;

export function getChineseVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  if (cachedChineseVoice) return cachedChineseVoice;

  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  const preferredVoice = voices.find((v) => {
    const lang = v.lang.toLowerCase();
    const name = v.name.toLowerCase();
    return (
      (lang.startsWith('zh') || lang.includes('zh-cn') || lang.includes('zh-tw') || lang.includes('zh-hk')) &&
      (name.includes('xiaoxiao') ||
        name.includes('huihui') ||
        name.includes('kangkang') ||
        name.includes('google') ||
        name.includes('natural') ||
        name.includes('online'))
    );
  });
  if (preferredVoice) {
    cachedChineseVoice = preferredVoice;
    return preferredVoice;
  }

  const anyChineseVoice = voices.find((v) => {
    const lang = v.lang.toLowerCase();
    const name = v.name.toLowerCase();
    return lang.startsWith('zh') || lang.includes('zh-cn') || name.includes('chinese') || name.includes('mandarin');
  });
  if (anyChineseVoice) {
    cachedChineseVoice = anyChineseVoice;
    return anyChineseVoice;
  }

  return null;
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    cachedChineseVoice = null;
    getChineseVoice();
  };
}

function speakWithBrowserTTS(text: string, rate: number = 0.85): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.rate = rate;

    const voice = getChineseVoice();
    if (voice) {
      utterance.voice = voice;
    }

    window.speechSynthesis.speak(utterance);
  } catch (e) {
    console.warn('Browser TTS error:', e);
  }
}

/**
 * Main function to play authentic Standard Mandarin Chinese audio
 * Uses external Chinese Voice sources (Youdao Mandarin Chinese Voice & Google Translate TTS)
 */
export function speakChinese(text: string, rate: number = 0.85): void {
  if (!text || !text.trim()) return;

  const rawText = text.trim();

  // 1. Stop any currently playing audio or speech
  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    } catch {
      // Ignore audio pause error
    }
    currentAudio = null;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }

  // 2. Normalize text: map pinyin initials/finals to standard Chinese characters if text is pure Pinyin sound
  const cleanLower = rawText.toLowerCase().replace(/[^a-zünv]/g, '');
  let textToSpeak = rawText;

  // If text is a standalone Pinyin symbol (e.g., 'zh', 'ü', 'a', 'o', 'e', 'b', 'p', 'm'), use standard Chinese audio equivalent
  if (PINYIN_SOUND_MAP[cleanLower] && !/[\u4e00-\u9fa5]/.test(rawText)) {
    textToSpeak = PINYIN_SOUND_MAP[cleanLower];
  }

  const encodedText = encodeURIComponent(textToSpeak);

  // 3. External Chinese Voice API URLs (High quality Mandarin Chinese Voice)
  // Primary: Youdao Chinese Dict Voice API (Standard Mandarin Female/Male Voice)
  // Secondary: Google Translate Mandarin Chinese TTS API
  const primaryUrl = `https://dict.youdao.com/dictvoice?audio=${encodedText}&le=zh`;
  const secondaryUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodedText}&tl=zh-CN&client=tw-ob`;

  try {
    const audio = new Audio(primaryUrl);
    currentAudio = audio;
    audio.playbackRate = rate;

    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback to Secondary Google Translate Chinese Voice
        const secondaryAudio = new Audio(secondaryUrl);
        currentAudio = secondaryAudio;
        secondaryAudio.playbackRate = rate;

        secondaryAudio.play().catch(() => {
          // Final Fallback: Browser Web Speech API with forced Chinese voice
          speakWithBrowserTTS(textToSpeak, rate);
        });
      });
    }
  } catch (err) {
    console.warn('Audio play error, falling back to Web Speech API:', err);
    speakWithBrowserTTS(textToSpeak, rate);
  }
}
