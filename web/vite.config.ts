import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'~ui': '/src/components/ui',
			'~components': '/src/components',
			'~assets': '/src/assets',
			'~': '/src',
		},
	},
})
