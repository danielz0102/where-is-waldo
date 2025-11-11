import { screen } from '@testing-library/react'
import { Renderer } from '~tests/utils/Renderer'
import LandingPage from '.'

const renderer = new Renderer().withRouter()

test('displays the app title "Where is Waldo?"', () => {
	renderer.render(<LandingPage />)
	const title = screen.getByRole('heading', { name: /where is waldo\?/i })
	expect(title).toBeVisible()
})

test('has a link to the select-scenario page', () => {
	renderer.render(<LandingPage />)

	const selectScenarioLink = screen.getByRole('link', {
		name: /start playing/i,
	})

	expect(selectScenarioLink).toBeVisible()
	expect(selectScenarioLink).toHaveAttribute('href', '/select-scenario')
})
