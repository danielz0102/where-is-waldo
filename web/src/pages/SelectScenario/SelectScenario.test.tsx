import { screen } from '@testing-library/react'
import ScenarioQueries from '~/querys/ScenarioQueries'
import fakeScenarios from '~tests/mocks/scenarios'
import { Renderer } from '~tests/utils/Renderer'
import SelectScenario from '.'

const renderer = new Renderer().withRouter()

vi.mock('~/querys/ScenarioQueries', () => ({
	default: {
		useGetAllQuery: vi.fn(() => ({
			data: fakeScenarios,
			isLoading: false,
			isError: false,
		})),
	},
}))

const mockUseGetAllQuery = vi.mocked(ScenarioQueries.useGetAllQuery)

test('has a title', () => {
	renderer.render(<SelectScenario />)

	const title = screen.queryByRole('heading', {
		level: 1,
		name: /select a scenario/i,
	})

	expect(title).toBeInTheDocument()
})

test('has a link to go back to the landing page', () => {
	renderer.render(<SelectScenario />)

	const backLink = screen.queryByRole('link', {
		name: /home/i,
	})

	expect(backLink).toBeInTheDocument()
	expect(backLink).toHaveAttribute('href', '/')
})

test('displays a link and an image for each scenario', () => {
	renderer.render(<SelectScenario />)

	fakeScenarios.forEach((scn) => {
		const scenarioLink = screen.getByRole('link', {
			name: new RegExp(scn.name, 'i'),
		})

		expect(scenarioLink).toHaveAttribute('href', `/scenario/${scn.id}`)

		const scenarioImage = screen.getByRole('img', {
			name: new RegExp(scn.name, 'i'),
		})

		expect(scenarioImage).toHaveAttribute('src', scn.imgUrl)
	})
})

test('shows loading state', () => {
	mockUseGetAllQuery.mockReturnValueOnce({
		data: undefined,
		isLoading: true,
		isError: false,
	} as ReturnType<typeof ScenarioQueries.useGetAllQuery>)

	renderer.render(<SelectScenario />)

	expect(screen.queryByText(/loading/i)).toBeInTheDocument()
})

test('shows error state', () => {
	mockUseGetAllQuery.mockReturnValueOnce({
		data: undefined,
		isLoading: false,
		isError: true,
		error: new Error('Failed to fetch'),
	} as ReturnType<typeof ScenarioQueries.useGetAllQuery>)

	renderer.render(<SelectScenario />)

	expect(screen.queryByText(/error/i)).toBeInTheDocument()
})
