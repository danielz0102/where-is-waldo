import { render, screen, within } from '@testing-library/react'
import TargetsMenu from '~components/TargetsMenu'

test('displays menu at the position given', () => {
	render(<TargetsMenu x={100} y={200} />)

	const menu = screen.getByRole('menu')
	const styles = window.getComputedStyle(menu)

	//! I didn't find a good way to compute Tailwind classes in test environment, so I cannot avoid testing implementation here
	expect(menu.classList).toContain('absolute')

	expect(styles.top).toBe('200px')
	expect(styles.left).toBe('100px')
})

test('has the Waldo button', () => {
	const waldoItem = queryItem('Waldo')

	expect(waldoItem).toBeDefined()
})

test('has the Wizard button', () => {
	const wizardItem = queryItem('Wizard')

	expect(wizardItem).toBeDefined()
})

test('has the Odlaw button', () => {
	const odlawItem = queryItem('Odlaw')

	expect(odlawItem).toBeDefined()
})

function queryItem(itemName: string) {
	render(<TargetsMenu x={0} y={0} />)

	const menu = screen.getByRole('menu')
	const items = within(menu).getAllByRole('button')

	return items.find((item) => within(item).queryByText(itemName))
}
