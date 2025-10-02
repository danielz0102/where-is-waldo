import { screen } from '@testing-library/react'
import { renderWithRouter } from '~tests/utils/renderWithRouter'
import LandingPage from '.'

test('displays the app title "Where is Waldo?"', () => {
	renderWithRouter(<LandingPage />)

	const title = screen.getByRole('heading', { name: /where is waldo\?/i })

	expect(title).toBeInTheDocument()
})

test('has a link to the select-scenario page', () => {
	renderWithRouter(<LandingPage />)

	const selectScenarioLink = screen.getByRole('link', {
		name: /start playing/i,
	})

	expect(selectScenarioLink).toBeInTheDocument()
	expect(selectScenarioLink).toHaveAttribute('href', '/select-scenario')
})
