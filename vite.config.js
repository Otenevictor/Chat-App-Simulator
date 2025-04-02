import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),

  ],
  base: "/", 
  server: {
    historyApiFallback: true, // Helps Vite serve `index.html` for all routes
  },// Ensures correct routing
})
