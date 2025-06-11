import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
<<<<<<< HEAD
        target: 'http://localhost:8080',
=======
        target: 'http://localhost:5000', // Backend port
>>>>>>> e597eab112c410ff26201f7695364f381bd9d6b3
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

