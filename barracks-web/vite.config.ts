import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test.setup.ts',
    // you might want to disable it, if you don't have tests that rely on CSS
    // since parsing CSS is slow
    css: true
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        '/data/core.json',
        '/data/armies.json',
        '/data/units/germany.json',
        '/data/units/great-britain.json',
        '/data/units/imperial-japan.json',
        '/data/units/soviet-union.json',
        '/data/units/us.json',
        '/images/bolt-action.jpg',
        '/images/germany.jpg',
        '/images/great-britain.jpg',
        '/images/imperial-japan.jpg',
        '/images/soviet-union.jpg',
        '/images/us.jpg'
      ],
      manifest: {
        name: 'Barracks',
        short_name: 'Barracks',
        description: 'Barracks is a free and open-source Bolt Action assistant.',
        theme_color: '#ea7317',
        background_color: '#ea7317',
        icons: [
          {
            src: '/android-icon.png',
            sizes: '1024x1024',
            type: 'image/png',
            purpose: 'maskable any'
          }
        ],
        shortcuts: [
          {
            name: 'New Army List',
            url: '/list',
            icons: []
          },
          {
            name: 'Army Lists',
            url: '/lists',
            icons: []
          },
          {
            name: 'Rules',
            url: '/rules',
            icons: []
          }
        ]
      }
    })
  ]
});
