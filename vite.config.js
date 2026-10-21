import react from '@vitejs/plugin-react'
import { existsSync } from 'node:fs'
import { defineConfig, loadEnv } from 'vite'

// Serves the Vercel functions in /api during `npm run dev`, so the app and API
// run together locally. In production Vercel serves /api itself.
const devApi = () => ({
  name: 'dev-api',
  configureServer(server) {
    server.middlewares.use('/api', async (req, res, next) => {
      const name = req.url.split('?')[0].replace(/^\/+|\/+$/g, '')
      const file = `api/${name}.js`
      // Only real endpoints: no _lib helpers, no path tricks.
      if (!/^[a-z0-9-]+(\/[a-z0-9-]+)*$/.test(name) || !existsSync(file)) return next()
      try {
        const mod = await server.ssrLoadModule(`/${file}`)
        await mod.default(req, res)
      } catch (e) {
        next(e)
      }
    })
  },
})

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Server-only secrets (SHIPROCKET_*) from .env files for the local API; never exposed to the browser.
  Object.assign(process.env, loadEnv(mode, process.cwd(), 'SHIPROCKET_'))
  return { plugins: [react(), devApi()] }
})
