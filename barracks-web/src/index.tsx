import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ToastProvider } from '@fjlaubscher/matter';
import { SWRConfig } from 'swr';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Analytics } from '@vercel/analytics/react';

import './styles/global.scss';

import App from './app';
import ErrorBoundary from './components/error-boundary';

const isProduction = window.location.host === 'barracks.francoislaubscher.dev';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
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
