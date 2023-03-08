import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ToastProvider } from '@fjlaubscher/matter';
import { SWRConfig } from 'swr';

import './styles/global.scss';

import App from './app';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <RecoilRoot>
        <ToastProvider>
          <SWRConfig
            value={{
              fetcher: (resource: RequestInfo | URL, init?: RequestInit) =>
                fetch(resource, init).then((res) => res.json())
            }}
          >
            <App />
          </SWRConfig>
        </ToastProvider>
      </RecoilRoot>
    </BrowserRouter>
  </React.StrictMode>
);
