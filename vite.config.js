import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        tailwindcss({
          content: [
            "./index.html",
            "./src/**/*.{js,ts,jsx,tsx}",
          ],
          theme: {
            extend: {
              colors: {
                primary: {
                  light: '#4CAF50',
                  DEFAULT: '#2E7D32',
                  dark: '#1B5E20',
                },
                secondary: {
                  light: '#FFA726',
                  DEFAULT: '#FF6F00',
                  dark: '#E65100',
                },
                background: '#F5F7FA',
              },
              fontFamily: {
                sans: ['Poppins', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
              },
              boxShadow: {
                'sm': '0px 2px 4px rgba(0, 0, 0, 0.05)',
                'md': '0px 4px 8px rgba(0, 0, 0, 0.05)',
                'lg': '0px 8px 16px rgba(0, 0, 0, 0.05)',
                'xl': '0px 16px 24px rgba(0, 0, 0, 0.05)',
                '2xl': '0px 24px 32px rgba(0, 0, 0, 0.05)',
              },
              borderRadius: {
                'sm': '4px',
                DEFAULT: '8px',
                'md': '12px',
                'lg': '16px',
              },
              container: {
                center: true,
                padding: {
                  DEFAULT: '1rem',
                  sm: '2rem',
                  lg: '4rem',
                  xl: '5rem',
                },
              },
            },
          },
        }),
        autoprefixer(),
      ],
    },
  },
})
