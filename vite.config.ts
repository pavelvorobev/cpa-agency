import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import vueDevTools from 'vite-plugin-vue-devtools'

const getPath = (path: string) => fileURLToPath(new URL(path, import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    createSvgIconsPlugin({
      iconDirs: [getPath('./src/app/assets/icons')],
      symbolId: 'icon-[name]',
      svgoOptions: {
        plugins: [
          {
            name: 'removeAttrs',
            params: { attrs: 'fill' },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': getPath('./src')
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/app/assets/styles/_variables.scss" as *;
        `
      },
    },
  },
})
