import { mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(viteConfig, {
	test: {
		globals: true,
		environment: 'happy-dom',
		setupFiles: './tests/setup.ts',
	},
})
