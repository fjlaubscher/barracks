/// <reference types="@fjlaubscher/matter/src/matter" />

declare module 'react-helmet';

declare module 'easy-speech';

interface Document {
  startViewTransition(callback: () => void): void;
}
