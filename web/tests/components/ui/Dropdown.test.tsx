import { render, screen } from '@testing-library/react'
import Dropdown from '~ui/Dropdown'

test('renders a list', () => {
	render(<Dropdown>x</Dropdown>)

	expect(screen.queryByRole('list')).toBeInTheDocument()
})

test('shows the items passed as children', () => {
	render(
		<Dropdown>
			<li>Item 1</li>
			<li>Item 2</li>
			<li>Item 3</li>
		</Dropdown>
	)

	expect(screen.queryByText('Item 1')).toBeInTheDocument()
	expect(screen.queryByText('Item 2')).toBeInTheDocument()
	expect(screen.queryByText('Item 3')).toBeInTheDocument()
})
