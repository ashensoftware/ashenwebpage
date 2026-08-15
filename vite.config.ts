import { defineConfig, type PreviewServer } from 'vite'
import react from '@vitejs/plugin-react'
import { existsSync, readFileSync } from 'fs'
import { resolve, dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const distDir = resolve(__dirname, 'dist')

function servePrerenderedOr404() {
  return {
    name: 'serve-prerendered-or-404',
    configurePreviewServer(server: PreviewServer) {
      server.middlewares.use((req, res, next) => {
        const urlPath = decodeURIComponent((req.url ?? '/').split('?')[0] ?? '/')
        if (urlPath.startsWith('/@') || urlPath.startsWith('/assets') || urlPath.includes('.')) {
          next()
          return
        }

        const normalized = urlPath === '/' ? '/' : urlPath.replace(/\/$/, '')
        const pageFile = normalized === '/' ? join(distDir, 'index.html') : join(distDir, normalized, 'index.html')
        if (existsSync(pageFile)) {
          res.statusCode = 200
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          res.end(readFileSync(pageFile, 'utf8'))
          return
        }

        const notFound = join(distDir, '404.html')
        if (existsSync(notFound)) {
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          res.end(readFileSync(notFound, 'utf8'))
          return
        }

        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), servePrerenderedOr404()],
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          motion: ['framer-motion'],
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
})
