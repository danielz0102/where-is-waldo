import { render, screen, within } from '@testing-library/react'
import TargetsMenu from '~components/TargetsMenu'
import characters from '../mocks/characters'

test('renders a button for each character passed', () => {
	render(<TargetsMenu characters={characters} />)

	const menu = screen.getByRole('menu')
	const buttons = within(menu).getAllByRole('button')

	expect(buttons).toHaveLength(characters.length)
})
