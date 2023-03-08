import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        '/data/armies.json',
        '/data/units/germany.json',
        '/data/units/great-britain.json',
        '/data/units/us.json'
      ],
      manifest: {
        name: 'Barracks',
        short_name: 'Barracks',
        description: 'Barracks is a free and open-source Bolt Action assistant.',
        theme_color: '#EA7317',
        background_color: '#EA7317',
        icons: [
          {
            src: '/android-icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/android-icon.png',
            sizes: '1024x1024',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});
