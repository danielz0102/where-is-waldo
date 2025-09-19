import { render, screen, within } from '@testing-library/react'
import TargetsMenu from '~components/TargetsMenu'
import characters from '../mocks/characters'

test('renders a button for each target passed', () => {
	render(<TargetsMenu characters={characters} />)

	const menu = screen.getByRole('menu')
	const items = within(menu).getAllByRole('button')

	expect(items).toHaveLength(characters.length)
})
