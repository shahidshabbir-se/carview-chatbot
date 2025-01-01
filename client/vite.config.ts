import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@context': path.resolve(__dirname, './src/context/'),
      '@interfaces': path.resolve(__dirname, 'src/interfaces'),
      '@api': path.resolve(__dirname, 'src/services/api'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@middlewares': path.resolve(__dirname, 'src/middlewares'),
      '@utils': path.resolve(__dirname, 'src/utils')
    }
  }
})
