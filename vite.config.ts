import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dns from 'dns'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig({
    base: process.env.NODE_ENV === 'production' ? '/github-pages-test/' : './',
    plugins: [
        vue({
            template: { transformAssetUrls }
        }),
        quasar({
            sassVariables: 'src/quasar-variables.scss'
        })
    ],
})
