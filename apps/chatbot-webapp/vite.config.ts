import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig({
  cacheDir: '../../node_modules/.vite/chatbot-webapp',

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      utils: path.resolve(__dirname, './src/utils/'),
      layouts: path.resolve(__dirname, './src/layouts/'),
      assets: path.resolve(__dirname, './src/assets/'),
      components: path.resolve(__dirname, './src/components/'),
      pages: path.resolve(__dirname, './src/pages/'),
      types: path.resolve(__dirname, './src/types/'),
    },
  },

  server: {
    port: 3333,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [react(), nxViteTsPaths()],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
});
