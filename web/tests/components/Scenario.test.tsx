import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Scenario from '~components/Scenario'
import characters from '../mocks/characters'

vi.mock('~components/TargetBox', () => ({
	default: () => <div data-testid="target-box"></div>,
}))

vi.mock('~components/TargetsMenu', () => ({
	default: () => <div data-testid="targets-menu"></div>,
}))

const data = {
	id: '1',
	name: 'Sample Scenario',
	imgUrl: 'sample-url.jpg',
	characters,
}

test('renders a canvas with the correct image', () => {
	render(<Scenario data={data} />)

	const canvas = screen.getByRole('img')

	expect(canvas.style.backgroundImage).toContain(data.imgUrl)
})

test('shows TargetBox and TargetsMenu on canvas click', async () => {
	render(<Scenario data={data} />)

	expect(screen.queryByTestId('target-box')).not.toBeInTheDocument()
	expect(screen.queryByTestId('targets-menu')).not.toBeInTheDocument()

	await clickOnCanvas({ x: 200, y: 250 })

	const targetBox = screen.getByTestId('target-box')
	const targetsMenu = screen.getByTestId('targets-menu')

	expect(targetBox).toBeVisible()
	expect(targetsMenu).toBeVisible()
})

test('hides TargetBox and TargetsMenu on second canvas click', async () => {
	render(<Scenario data={data} />)

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
