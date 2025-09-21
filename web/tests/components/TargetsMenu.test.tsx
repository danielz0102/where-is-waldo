import { render, screen, within } from '@testing-library/react'
import TargetsMenu from '~components/TargetsMenu'
import characters from '../mocks/characters'

test('renders a button for each character passed', () => {
	render(<TargetsMenu characters={characters} />)

	const menu = screen.getByRole('menu')
	const buttons = within(menu).getAllByRole('button')

	expect(buttons).toHaveLength(characters.length)
})

test('the buttons has a character name and image', () => {
	render(<TargetsMenu characters={characters} />)

	characters.forEach((c) => {
		expect(screen.queryByText(c.name)).toBeVisible()
		expect(screen.getByAltText(c.name)).toHaveAttribute('src', c.imgUrl)
	})
})
