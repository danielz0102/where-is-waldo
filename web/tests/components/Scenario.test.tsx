import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Scenario from '~components/Scenario'

vi.mock('~components/TargetsMenu', () => ({
	default: ({ x = 0, y = 0 }) => (
		<div data-testid="targets-menu" data-x={x} data-y={y}></div>
	),
}))

test('shows the targets menu when user clicks', async () => {
	const user = userEvent.setup()
	render(<Scenario />)

	expect(screen.queryByTestId('targets-menu')).not.toBeInTheDocument()

	const canvas = screen.getByTestId('scenario')
	await user.click(canvas)

	expect(screen.queryByTestId('targets-menu')).toBeInTheDocument()
})

test('hides the targets menu when user clicks again', async () => {
	const user = userEvent.setup()
	render(<Scenario />)

	const canvas = screen.getByTestId('scenario')
	await user.click(canvas)

	expect(screen.queryByTestId('targets-menu')).toBeInTheDocument()

	await user.click(canvas)

	expect(screen.queryByTestId('targets-menu')).not.toBeInTheDocument()
})

test('passes correct position to targets menu when clicked', async () => {
	const user = userEvent.setup()
	render(<Scenario />)

	const canvas = screen.getByTestId('scenario')
	await user.pointer([
		{ target: canvas, coords: { x: 50, y: 100 }, keys: '[MouseLeft]' },
		{ keys: '[/MouseLeft]' },
	])

	const menu = screen.getByTestId('targets-menu')

	expect(menu).toHaveAttribute('data-x', '50')
	expect(menu).toHaveAttribute('data-y', '100')
})
