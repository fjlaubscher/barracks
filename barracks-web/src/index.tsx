import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ToastProvider } from '@fjlaubscher/matter';
import { SWRConfig } from 'swr';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Analytics } from '@vercel/analytics/react';
import EasySpeech from 'easy-speech';

import './styles/global.scss';

import App from './app';
import ErrorBoundary from './components/error-boundary';
import { TTS_READY } from './data/storage';

const isProduction = window.location.host === 'barracks.francoislaubscher.dev';

localStorage.removeItem(TTS_READY);

if (navigator.userAgent !== 'ReactSnap') {
  const result = EasySpeech.detect();
  if (result.speechSynthesis && result.speechSynthesisUtterance) {
    EasySpeech.init({ maxTimeout: 5000, interval: 250 })
      .then(() => console.debug('load complete'))
      .catch((e: any) => console.error(e));
  }
}

const BarracksApp = () => (
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <RecoilRoot>
          <ToastProvider>
            <SWRConfig
              value={{
                fetcher: (resource: RequestInfo | URL, init?: RequestInit) =>
                  fetch(resource, init).then((res) => res.json())
              }}
            >
              <GoogleOAuthProvider clientId={import.meta.env.VITE_OAUTH_CLIENT_ID}>
                <App />
                <Analytics mode={isProduction ? 'production' : 'development'} />
              </GoogleOAuthProvider>
            </SWRConfig>
          </ToastProvider>
        </RecoilRoot>
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);

createRoot(document.getElementById('root') as HTMLElement).render(<BarracksApp />);
