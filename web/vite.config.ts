/// <reference types="vitest/config" />
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			'~ui': '/src/components/ui',
			'~components': '/src/components',
			'~services': '/src/services',
			'~assets': '/src/assets',
			'~hooks': '/src/hooks',
			'~tests': '/tests',
			'~': '/src',
		},
	},
	test: {
		globals: true,
		environment: 'happy-dom',
		setupFiles: './tests/setup.ts',
	},
})
