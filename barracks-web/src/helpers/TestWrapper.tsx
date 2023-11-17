import React from 'react';
import type { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ToastProvider } from '@fjlaubscher/matter';
import { GoogleOAuthProvider } from '@react-oauth/google';

interface TestWrapperProps {
  children: ReactNode;
}

export const TestWrapper = ({ children }: TestWrapperProps) => (
  <React.StrictMode>
    <MemoryRouter>
      <RecoilRoot>
        <ToastProvider>
          <GoogleOAuthProvider clientId={import.meta.env.VITE_OAUTH_CLIENT_ID}>
            {children}
          </GoogleOAuthProvider>
        </ToastProvider>
      </RecoilRoot>
    </MemoryRouter>
  </React.StrictMode>
);
