import { render, screen } from '@testing-library/react'
import Scenario from '~components/scenario'

const data = {
	id: '1',
	name: 'Sample Scenario',
	imgUrl: 'sample-url.jpg',
}

test('renders a canvas with the correct image', () => {
	render(<Scenario data={data} />)

	const canvas = screen.getByRole('img')
	const styles = getComputedStyle(canvas)

	expect(styles.backgroundImage).toContain(data.imgUrl)
})
