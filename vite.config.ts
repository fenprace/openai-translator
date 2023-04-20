import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import monkey, { cdn } from 'vite-plugin-monkey'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    monkey({
      entry: 'src/main.tsx',
      userscript: {
        icon: 'https://raw.githubusercontent.com/fenprace/openai-translator/master/src/assets/openai-translator.svg',
        author: 'Zhuo FENG',
        namespace: 'fenprace',
        match: ['*://*/*'],
        license: 'MIT',
      },
      build: {
        externalGlobals: {
          react: cdn.jsdelivr('React', 'umd/react.production.min.js'),
          'react-dom': cdn.jsdelivr(
            'ReactDOM',
            'umd/react-dom.production.min.js',
          ),
        },
      },
    }),
  ],
})
