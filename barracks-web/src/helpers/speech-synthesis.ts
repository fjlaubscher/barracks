import { DEFAULT_SETTINGS } from '../data/settings';
import { SETTINGS } from '../data/storage';

const HTML_REGEX = /(<([^>]+)>)/gi;

export const speakText = (text: string, voiceIndex?: number) => {
  if (speechSynthesis.speaking) {
    speechSynthesis.cancel();
  }

  const storedSettings = localStorage.getItem(SETTINGS);
  const settings: Barracks.Settings = storedSettings
    ? JSON.parse(storedSettings)
    : DEFAULT_SETTINGS;

  const voices = speechSynthesis.getVoices();

  const withInches = text.replace('"', '”');
  const strippedText = withInches.replace(HTML_REGEX, '');

  let timerId: NodeJS.Timeout;
  const handleChromeTimeoutHack = () => {
    speechSynthesis.pause();
    speechSynthesis.resume();
    timerId = setTimeout(handleChromeTimeoutHack, 10000);
  };

  const preferredIndex = voiceIndex ?? settings.voice;
  const utterance = new SpeechSynthesisUtterance(strippedText);
  utterance.voice = voices[preferredIndex];
  utterance.lang = voices[preferredIndex].lang;
  utterance.onstart = () => handleChromeTimeoutHack();
  utterance.onend = () => clearTimeout(timerId);

  speechSynthesis.speak(utterance);
};
