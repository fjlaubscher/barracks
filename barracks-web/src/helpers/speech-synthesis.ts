import { DEFAULT_SETTINGS } from '../data/settings';
import { SETTINGS } from '../data/storage';

export const speakText = (text: string, voiceIndex?: number) => {
  if (speechSynthesis.speaking) {
    speechSynthesis.cancel();
  }

  const storedSettings = localStorage.getItem(SETTINGS);
  const settings: Barracks.Settings = storedSettings
    ? JSON.parse(storedSettings)
    : DEFAULT_SETTINGS;

  const voices = speechSynthesis.getVoices();
  const filteredVoices = voices.filter((v) => v.lang.includes('en'));

  if (filteredVoices[voiceIndex ?? settings.voice]) {
    const regex = /(<([^>]+)>)/gi;
    const withInches = text.replace('"', '”');
    const strippedText = withInches.replace(regex, '');

    let timerId: NodeJS.Timeout;
    const handleChromeTimeoutHack = () => {
      speechSynthesis.pause();
      speechSynthesis.resume();
      timerId = setTimeout(handleChromeTimeoutHack, 10000);
    };

    const utterance = new SpeechSynthesisUtterance(strippedText);
    const preferredVoice = filteredVoices[voiceIndex ?? settings.voice];
    utterance.voice = preferredVoice;
    utterance.lang = preferredVoice.lang;
    utterance.volume = 100;
    utterance.onend = (e) => {
      clearTimeout(timerId);
    };

    timerId = setTimeout(handleChromeTimeoutHack, 10000);
    speechSynthesis.speak(utterance);
  }
};
