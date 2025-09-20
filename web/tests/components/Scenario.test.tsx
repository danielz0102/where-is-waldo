import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Scenario from '~components/Scenario'
import characters from '../mocks/characters'

vi.mock('~/components/TargetBox', () => ({
	default: () => <div data-testid="target-box"></div>,
}))

vi.mock('~/components/TargetsMenu', () => ({
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
	const styles = getComputedStyle(canvas)

	expect(styles.backgroundImage).toContain(data.imgUrl)
})

test('shows TargetBox and TargetsMenu when canvas is clicked', async () => {
	const user = userEvent.setup()
	render(<Scenario data={data} />)

	expect(screen.queryByTestId('target-box')).not.toBeInTheDocument()
	expect(screen.queryByTestId('targets-menu')).not.toBeInTheDocument()

	const canvas = screen.getByRole('img')

	await user.click(canvas)

	expect(screen.getByTestId('target-box')).toBeInTheDocument()
	expect(screen.getByTestId('targets-menu')).toBeInTheDocument()
})

test('hides TargetBox and TargetsMenu when canvas is clicked again', async () => {
	const user = userEvent.setup()
	render(<Scenario data={data} />)

	const canvas = screen.getByRole('img')

	await user.click(canvas)
	await user.click(canvas)

	expect(screen.queryByTestId('target-box')).not.toBeInTheDocument()
	expect(screen.queryByTestId('targets-menu')).not.toBeInTheDocument()
})
