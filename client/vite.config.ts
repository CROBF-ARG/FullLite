import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import env from "../src/config/env";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../dist/public',
    emptyOutDir: true
  },
  server: {
    proxy: env.MODE === "development" ? {
      "/api": {
        target: `htpp://localhost:${env.PORT}`,
        changeOrigin: true,
        secure: false
      }
    } : {}
  }
})
