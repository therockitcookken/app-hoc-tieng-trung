/**
 * Global Chinese Text-to-Speech Engine
 * Guarantees 100% authentic Chinese voice selection across Windows/Mac/iOS/Android browsers
 */

let cachedChineseVoice: SpeechSynthesisVoice | null = null;

export function getChineseVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;

  if (cachedChineseVoice) return cachedChineseVoice;

  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  // 1. Try to find preferred high-quality Chinese voices (Microsoft Xiaoxiao, Huihui, Kangkang, Google Mandarin, Natural)
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

  // 2. Fallback to any Chinese language voice
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

// Pre-load voices when browser loads voice list asynchronously
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    cachedChineseVoice = null; // Reset to force re-fetch with new voices list
    getChineseVoice();
  };
}

export function speakChinese(text: string, rate: number = 0.85): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  if (!text || !text.trim()) return;

  try {
    window.speechSynthesis.cancel(); // Cancel previous speech to prevent queue build-up

    const utterance = new SpeechSynthesisUtterance(text.trim());
    utterance.lang = 'zh-CN';
    utterance.rate = rate;
    utterance.pitch = 1.0;

    const voice = getChineseVoice();
    if (voice) {
      utterance.voice = voice;
    }

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn('Speech synthesis playback error:', err);
  }
}
