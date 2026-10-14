import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Expose VITE_, NEXT_PUBLIC_, and SUPABASE_ environment variables to the browser bundle
  envPrefix: ['VITE_', 'NEXT_PUBLIC_', 'SUPABASE_'],
})
