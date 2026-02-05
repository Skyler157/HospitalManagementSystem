import { defineConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer';
import react from '@vitejs/plugin-react-swc'
import dotenv from 'dotenv'
dotenv.config()


export default defineConfig(({ mode }) => ({
  build: {
    chunkSizeWarningLimit: 15000,//kB
  },
  plugins: [react()],
  base: '/',
  // base: mode === 'development' ? '/' : '/wanene-ehr/dist/',
}));
