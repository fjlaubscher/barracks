import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ToastProvider } from '@fjlaubscher/matter';
import { SWRConfig } from 'swr';
import { GoogleOAuthProvider } from '@react-oauth/google';

import './styles/global.scss';

import App from './app';
import ErrorBoundary from './components/ErrorBoundary';

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
              </GoogleOAuthProvider>
            </SWRConfig>
          </ToastProvider>
        </RecoilRoot>
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);

createRoot(document.getElementById('root') as HTMLElement).render(<BarracksApp />);
