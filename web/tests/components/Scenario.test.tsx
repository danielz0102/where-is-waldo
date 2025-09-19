import { render, screen } from '@testing-library/react'
import Scenario from '~components/Scenario'
import characters from '../mocks/characters'

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
