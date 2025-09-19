import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TargetsMenu from '~components/TargetsMenu'
import characters from '../mocks/characters'

test('renders a button for each target passed', () => {
	render(<TargetsMenu characters={characters} onCharacterSelected={() => {}} />)

	const menu = screen.getByRole('menu')
	const buttons = within(menu).getAllByRole('button')

	expect(buttons).toHaveLength(characters.length)
})

test('calls onCharacterSelected when a target is clicked', async () => {
	const user = userEvent.setup()
	const onCharacterSelected = vi.fn()
	render(
		<TargetsMenu
			characters={characters}
			onCharacterSelected={onCharacterSelected}
		/>
	)
	const button = screen.getByRole('button', { name: characters[0].name })

	await user.click(button)

	expect(onCharacterSelected).toHaveBeenCalledWith(characters[0])
})
