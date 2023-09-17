import { defineConfig } from 'vite'
import postcss from './postcss.config.js'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import nodePolyfills from 'vite-plugin-node-stdlib-browser'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env
  },
  css: {
    postcss,
  },
  plugins: [react(),nodePolyfills()],
  resolve: {
    alias: [
      {
        find: /^~.+/,
        replacement: (val) => {
          return val.replace(/^~/, "");
        },
      },
    ],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  },
  server:{
    host: true,
    port: 3000
  } 
})
