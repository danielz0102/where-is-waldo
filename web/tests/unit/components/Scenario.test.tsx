import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Scenario from '~components/Scenario'

const data = {
	id: '1',
	name: 'Sample Scenario',
	imgUrl: 'sample-url.jpg',
}

test('renders a canvas with the correct image', () => {
	render(<Scenario data={data} onClick={() => {}} />)

	const canvas = screen.getByRole('img')
	const styles = getComputedStyle(canvas)

	expect(styles.backgroundImage).toContain(data.imgUrl)
})

test('executes on click', async () => {
	const user = userEvent.setup()
	const cb = vi.fn()
	render(<Scenario data={data} onClick={cb} />)

	const canvas = screen.getByRole('img')
	await user.click(canvas)

	expect(cb).toHaveBeenCalledOnce()
})
