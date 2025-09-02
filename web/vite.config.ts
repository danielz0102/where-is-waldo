import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig, mergeConfig } from 'vite'
import { defineConfig as defineVitestConfig } from 'vitest/config'

// https://vite.dev/config/
export default mergeConfig(
	defineConfig({
		plugins: [react(), tailwindcss()],
		resolve: {
			alias: {
				'~ui': '/src/components/ui',
				'~components': '/src/components',
				'~assets': '/src/assets',
				'~': '/src',
			},
		},
	}),
	defineVitestConfig({
		test: {
			globals: true,
			environment: 'happy-dom',
			setupFiles: './tests/setup.ts',
			css: false, // Disable CSS processing to avoid parsing errors
		},
	})
)
