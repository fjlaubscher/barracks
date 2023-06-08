import EasySpeech from 'easy-speech';

import { DEFAULT_SETTINGS } from '../data/settings';
import { SETTINGS } from '../data/storage';

const HTML_REGEX = /(<([^>]+)>)/gi;

export const speakText = (text: string, voiceIndex?: number) => {
  try {
    EasySpeech.cancel();

    const storedSettings = localStorage.getItem(SETTINGS);
    const settings: Barracks.Settings = storedSettings
      ? JSON.parse(storedSettings)
      : DEFAULT_SETTINGS;

    const voices: SpeechSynthesisVoice[] = speechSynthesis.getVoices();
    const preferredVoice = voices[voiceIndex ?? settings.voice];

    const withInches = text.replace(/"/g, '”');
    const strippedText = withInches.replace(HTML_REGEX, '');

    EasySpeech.speak({
      text: strippedText,
      voice: preferredVoice
    }).then(() => console.debug('TTS done'));
  } catch (ex) {}
};
