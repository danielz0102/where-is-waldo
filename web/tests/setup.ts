import * as matchers from '@testing-library/jest-dom/matchers'
import { cleanup } from '@testing-library/react'
import { afterEach, expect, beforeEach } from 'vitest'

expect.extend(matchers)

// Define common Tailwind utilities used in tests
// This is more maintainable than hardcoded CSS as values come from Tailwind's defaults
const TAILWIND_UTILITIES = {
	// Position
	absolute: { position: 'absolute' },
	
	// Display
	flex: { display: 'flex' },
	
	// Flex direction
	'flex-col': { 'flex-direction': 'column' },
	
	// Gap (using Tailwind's default spacing scale: 0.25rem base)
	'gap-2': { gap: '0.5rem' }, // 2 * 0.25rem
	
	// Size (using Tailwind's default spacing scale)
	'size-8': { width: '2rem', height: '2rem' }, // 8 * 0.25rem
	
	// Cursor
	'cursor-pointer': { cursor: 'pointer' },
	
	// Object fit
	'object-contain': { 'object-fit': 'contain' },
	
	// Background colors - simplified without alpha and modern color functions
	'bg-neutral-700/70': { 'background-color': 'rgba(64, 64, 64, 0.7)' },
	
	// Text colors
	'text-neutral-100': { color: '#f5f5f5' },
}

beforeEach(() => {
	// Only apply styles if we're in a DOM environment and CSS isn't working
	if (typeof document !== 'undefined') {
		// Create a test to see if CSS classes are working
		const testDiv = document.createElement('div')
		testDiv.className = 'absolute'
		document.body.appendChild(testDiv)
		
		const computedStyle = window.getComputedStyle(testDiv)
		const hasWorkingCSS = computedStyle.position === 'absolute'
		
		document.body.removeChild(testDiv)
		
		// Only inject styles if CSS classes aren't working
		if (!hasWorkingCSS) {
			const existingStyle = document.getElementById('tailwind-test-utilities')
			if (!existingStyle) {
				const style = document.createElement('style')
				style.id = 'tailwind-test-utilities'
				
				// Generate CSS rules from the utilities map
				const cssRules = Object.entries(TAILWIND_UTILITIES)
					.map(([className, styles]) => {
						const styleProps = Object.entries(styles)
							.map(([prop, value]) => `${prop}: ${value} !important`)
							.join('; ')
						return `.${className.replace('/', '\\/')} { ${styleProps}; }`
					})
					.join('\n')
				
				style.textContent = cssRules
				document.head.appendChild(style)
				
				// Force reflow to ensure styles are applied
				document.body.offsetHeight
			}
		}
	}
})

afterEach(() => {
	cleanup()
})
