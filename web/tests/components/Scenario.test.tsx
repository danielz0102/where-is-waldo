import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Scenario from '~components/Scenario'

vi.mock('~components/TargetBox', () => ({
	default: () => <div data-testid="target-box"></div>,
}))

vi.mock('~components/TargetsMenu', () => ({
	default: () => <div data-testid="targets-menu"></div>,
}))

test('renders a canvas', () => {
	render(<Scenario />)
	const canvas = screen.getByRole('img', { name: /where's waldo/i })
	expect(canvas).toBeInTheDocument()
})

test('shows TargetBox and TargetsMenu on canvas click', async () => {
	render(<Scenario />)

	expect(screen.queryByTestId('target-box')).not.toBeInTheDocument()
	expect(screen.queryByTestId('targets-menu')).not.toBeInTheDocument()

	await clickOnCanvas({ x: 200, y: 250 })

	const targetBox = screen.getByTestId('target-box')
	const targetsMenu = screen.getByTestId('targets-menu')

	expect(targetBox).toBeVisible()
	expect(targetsMenu).toBeVisible()
})

test('hides TargetBox and TargetsMenu on second canvas click', async () => {
	render(<Scenario />)

	await clickOnCanvas({ x: 200, y: 250 })
	await clickOnCanvas({ x: 300, y: 350 })

	expect(screen.queryByTestId('target-box')).not.toBeInTheDocument()
	expect(screen.queryByTestId('targets-menu')).not.toBeInTheDocument()
})

async function clickOnCanvas(coords: { x: number; y: number }) {
	const user = userEvent.setup()
	const canvas = screen.getByRole('img', { name: /where's waldo/i })
	return user.pointer([
		{ target: canvas, coords, keys: '[MouseLeft]' },
		{ keys: '[/MouseLeft]' },
	])
}
