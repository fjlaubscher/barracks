/// <reference types="@fjlaubscher/matter/src/matter" />

declare module 'react-helmet';

interface Document {
  startViewTransition(callback: () => void): void;
}
