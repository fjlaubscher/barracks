/// <reference types="vite/client" />
/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />

interface ImportMetaEnv {
  readonly VITE_WORKER_URL: string;
  readonly VITE_OAUTH_CLIENT_ID: string;
  readonly VITE_BARRACKS_VERSION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
