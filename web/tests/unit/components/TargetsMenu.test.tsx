import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TargetsMenu from '~components/TargetsMenu'
import characters from '~tests/mocks/characters'

test('renders a button for each character passed', () => {
	render(<TargetsMenu characters={characters} onSelection={() => {}} />)

	characters.forEach((c) => {
		expect(screen.getByRole('button', { name: c.name })).toBeInTheDocument()
	})
})

test('executes onSelection when a character is clicked', async () => {
	const user = userEvent.setup()
	const onSelection = vi.fn()
	render(<TargetsMenu characters={characters} onSelection={onSelection} />)
	const button = screen.getByRole('button', { name: characters[0].name })

	await user.click(button)

	expect(onSelection).toHaveBeenCalledOnce()
})
