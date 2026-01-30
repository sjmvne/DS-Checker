import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/DS-Checker/', // Uncommented for GH Pages deploy
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-scan': ['tesseract.js', '@ericblade/quagga2'],
          'vendor-react': ['react', 'react-dom']
        }
      }
    }
  }
})
