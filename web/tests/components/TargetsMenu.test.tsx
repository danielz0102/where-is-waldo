import { render, screen, within } from '@testing-library/react'
import TargetsMenu from '~components/TargetsMenu'

test('has the Waldo button', () => {
	const waldoItem = searchForItem('Waldo')

	expect(waldoItem).toBeDefined()
})

test('has the Wizard button', () => {
	const wizardItem = searchForItem('Wizard')

	expect(wizardItem).toBeDefined()
})

test('has the Odlaw button', () => {
	const odlawItem = searchForItem('Odlaw')

	expect(odlawItem).toBeDefined()
})

function searchForItem(itemName: string) {
	render(<TargetsMenu />)

	const items = screen.getAllByRole('button')

	return items.find((item) => within(item).queryByText(itemName))
}
