import { Browser } from '@cloudflare/puppeteer';

interface Env {
  NAMESPACE: KVNamespace;
  BROWSER: Browser
}