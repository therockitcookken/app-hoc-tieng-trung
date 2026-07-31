/**
 * Global Chinese Text-to-Speech Engine
 * 100% Free External Online Standard Mandarin Chinese Voice Sources
 * (NetEase Youdao Chinese Voice, Google Translate Mandarin TTS, Baidu Chinese TTS)
 * NO Windows/System default TTS voice is used!
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

export function stopChineseSpeech(): void {
  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    } catch {
      // Ignore audio pause error
    }
    currentAudio = null;
  }
}

/**
 * Main function to play authentic Standard Mandarin Chinese audio
 * Uses 100% External Free Chinese Voice APIs with CDN High Availability
 * Completely avoids default Windows TTS voice.
 */
export function speakChinese(text: string, rate: number = 0.85): void {
  if (!text || !text.trim()) return;

  const rawText = text.trim();

  // 1. Stop any currently playing audio
  stopChineseSpeech();

  // 2. Normalize text: map pinyin initials/finals to standard Chinese characters if text is pure Pinyin sound
  const cleanLower = rawText.toLowerCase().replace(/[^a-zünv]/g, '');
  let textToSpeak = rawText;

  // If text is a standalone Pinyin symbol (e.g., 'zh', 'ü', 'a', 'o', 'e', 'b', 'p', 'm'), use standard Chinese audio equivalent
  if (PINYIN_SOUND_MAP[cleanLower] && !/[\u4e00-\u9fa5]/.test(rawText)) {
    textToSpeak = PINYIN_SOUND_MAP[cleanLower];
  }

  const encodedText = encodeURIComponent(textToSpeak);

  // 3. Array of 100% Free External Online Standard Mandarin Chinese Voice URLs (High Availability CDN)
  const voiceSources = [
    // Source 1: NetEase Youdao Mandarin Voice API (High fidelity Mandarin voice)
    `https://dict.youdao.com/dictvoice?audio=${encodedText}&le=zh`,
    // Source 2: Google Translate Mandarin TTS API (Standard Beijing Mandarin voice)
    `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodedText}&tl=zh-CN&client=tw-ob`,
    // Source 3: Baidu Mandarin Chinese TTS API 1
    `https://tts.baidu.com/text2audio?tex=${encodedText}&cuid=baike&lan=ZH&ctp=1&pdt=301&spd=4`,
    // Source 4: Baidu Mandarin Chinese TTS API 2
    `https://fanyi.baidu.com/gettts?lan=zh&text=${encodedText}&spd=4&source=web`,
  ];

  let sourceIndex = 0;

  const playNextSource = () => {
    if (sourceIndex >= voiceSources.length) return;

    const url = voiceSources[sourceIndex];
    sourceIndex++;

    try {
      const audio = new Audio(url);
      currentAudio = audio;
      audio.playbackRate = rate;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Playback failed or blocked, try next external online Chinese voice source
          playNextSource();
        });
      }
    } catch {
      playNextSource();
    }
  };

  playNextSource();
}
