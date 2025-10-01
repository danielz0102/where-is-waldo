import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import LandingPage from '.'

function renderWithRouter(component: React.ReactElement) {
	return render(<MemoryRouter>{component}</MemoryRouter>)
}

test('displays the app title "Where is Waldo?"', () => {
	renderWithRouter(<LandingPage />)

	const title = screen.getByRole('heading', { name: /where is waldo\?/i })
	expect(title).toBeInTheDocument()
})

test('has a link to the select-level page', () => {
	renderWithRouter(<LandingPage />)

	const selectLevelLink = screen.getByRole('link', { name: /start playing/i })
	expect(selectLevelLink).toBeInTheDocument()
	expect(selectLevelLink).toHaveAttribute('href', '/select-level')
})
