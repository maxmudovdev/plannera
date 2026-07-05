import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-oxc'

// base: '/'  — для собственного домена (plannera.uz).
// Если сайт будет жить на username.github.io/имя-репозитория БЕЗ домена,
// поменяй на:  base: '/имя-репозитория/'
export default defineConfig({
  plugins: [react()],
  base: '/',
})
