// biome-ignore lint/correctness/noUndeclaredDependencies: vitest is declared in the root package.json
import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		environment: 'node',
		globals: true,
	},
	resolve: {
		alias: {
			'~config': '/src/config.ts',
			'~controllers': '/src/controllers',
			'~models': '/src/models',
			'~routers': '/src/routers',
			'~': '/src',
			'~tests': '/tests',
		},
	},
})
