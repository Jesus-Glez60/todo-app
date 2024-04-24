import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import EslintPlugin from 'vite-plugin-eslint'
import PurgeIcons from 'vite-plugin-purge-icons'
import svgLoader from 'vite-svg-loader'

import { fileURLToPath, URL } from 'url'

// https://vitejs.dev/config/
export default defineConfig({
 plugins: [
  VueRouter({}),
  vue(),
  svgLoader(),
  Icons(),
  EslintPlugin({ cache: false, include: ['src/**/*.vue', 'src/**/*.ts', 'src/**/*.tsx'] }),
  PurgeIcons(),
 ],
 resolve: {
  alias: {
   '@': fileURLToPath(new URL('./src', import.meta.url)),
  },
 },
 build: {
  minify: 'terser',
  terserOptions: { compress: { drop_debugger: true, drop_console: true } },
 },
 server: {
  port: 5173,
  proxy: {
   '/api': {
    target: '',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, ''),
   },
  },

  hmr: {
   overlay: false,
  },

  host: '0.0.0.0',
 },
 optimizeDeps: {
  include: ['vue', 'vue-router', '@iconify/iconify', 'axios', 'vue-ellipse-progress'],
 },
})
