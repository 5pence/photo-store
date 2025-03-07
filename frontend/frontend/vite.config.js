import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_BACKEND_URL': JSON.stringify(import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'),
  },
})

