import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import viteConfig from './vite.config'
const base = process.env.NODE_ENV === 'production' ? '/brocante/' : '/'

export default mergeConfig(
  viteConfig,
  defineConfig({
    base: base,
    plugins: [
      vue(),
      VitePWA({
        registerType: 'autoUpdate',
        manifest: {
          name: 'Brocante',
          includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
          theme_color: '#ffffff',
          icons: [
            {
              src: 'pwa-64x64.png',
              sizes: '64x64',
              type: 'image/png',
            },
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: 'maskable-icon-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
      }),
      // VueI18nPlugin({
      //   /* options */
      //   // locale messages resource pre-compile option
      //   include: resolve(dirname(fileURLToPath(import.meta.url)), './path/to/src/locales/**'),
      // }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
    },
  }),
)
