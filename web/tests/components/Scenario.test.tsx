import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Scenario from '~components/Scenario'

vi.mock('~ui/Dropdown', () => ({
	default: () => <div data-testid="dropdown"></div>,
}))

test('is a button', () => {
	render(<Scenario />)

	const button = screen.queryByRole('button')
	expect(button).toBeInTheDocument()
})

test('has an image', () => {
	render(<Scenario />)

	const button = screen.getByRole('button')
	const img = within(button).queryByRole('img', {
		name: /where's waldo scene/i,
	})

	expect(img).toBeInTheDocument()
})

test('shows a dropdown when user clicks', async () => {
	const user = userEvent.setup()
	render(<Scenario />)

	expect(screen.queryByTestId('dropdown')).not.toBeInTheDocument()

	const button = screen.getByRole('button')
	await user.click(button)

	expect(screen.queryByTestId('dropdown')).toBeInTheDocument()
})

test('hides the dropdown when user clicks again', async () => {
	const user = userEvent.setup()
	render(<Scenario />)

	const button = screen.getByRole('button')
	await user.click(button)

	expect(screen.queryByTestId('dropdown')).toBeInTheDocument()

	await user.click(button)

	expect(screen.queryByTestId('dropdown')).not.toBeInTheDocument()
})
