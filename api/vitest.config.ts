import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		environment: 'happy-dom',
		globals: true,
	},
	resolve: {
		alias: {
			'~config': '/src/config.ts',
			'~controllers': '/src/controllers',
			'~models': '/src/models',
			'~routers': '/src/routers',
			'~': '/src',
		},
	},
})
