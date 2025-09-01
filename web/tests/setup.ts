import * as matchers from '@testing-library/jest-dom/matchers'
import { cleanup } from '@testing-library/react'
import { afterEach, expect, beforeEach } from 'vitest'
import '~/index.css'

expect.extend(matchers)

beforeEach(() => {
	// Inject essential CSS rules for testing when computed styles don't work
	if (typeof document !== 'undefined') {
		const existingStyle = document.getElementById('test-styles')
		if (!existingStyle) {
			const style = document.createElement('style')
			style.id = 'test-styles'
			style.textContent = `
				.absolute { position: absolute !important; }
				.flex { display: flex !important; }
				.flex-col { flex-direction: column !important; }
				.gap-2 { gap: 0.5rem !important; }
				.size-8 { width: 2rem !important; height: 2rem !important; }
				.cursor-pointer { cursor: pointer !important; }
				.object-contain { object-fit: contain !important; }
			`
			document.head.appendChild(style)
		}
		
		// Force reflow to ensure styles are applied
		document.body.offsetHeight
	}
})

afterEach(() => {
	cleanup()
})
