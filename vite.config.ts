import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === 'production'
  // Set your repository name here when deploying under username.github.io/<repo>
  const repoBase = '/shopos/'
  return {
    plugins: [react()],
    base: isProd ? repoBase : '/',
    build: { outDir: 'dist', assetsDir: 'assets' },
    assetsInclude: ['**/*.svg', '**/*.woff2', '**/*.woff', '**/*.ttf'],
    server: {
      host: true
    }
  }
})
