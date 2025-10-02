import { QueryClient } from '@tanstack/react-query'
import { screen } from '@testing-library/react'
import ScenarioQueries from '~/querys/ScenarioQueries'
import { Renderer } from '~tests/utils/Renderer'

import SelectScenario from '.'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
})

const renderer = new Renderer().withRouter().withQueryProvider(queryClient)

const mockedScenarios = [
	{ id: '1', name: 'Scenario 1', imgUrl: '/img1.png' },
	{ id: '2', name: 'Scenario 2', imgUrl: '/img2.png' },
]

vi.mock('~/querys/ScenarioQueries', () => ({
	default: {
		useGetAllQuery: () => ({
			data: mockedScenarios,
			isLoading: false,
			isError: false,
		}),
	},
}))

const ScenariosQueriesMock = vi.mocked(ScenarioQueries)

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

	mockedScenarios.forEach((scn) => {
		const scenarioLink = screen.queryByRole('link', {
			name: new RegExp(scn.name, 'i'),
		})

		expect(scenarioLink).toBeInTheDocument()
		expect(scenarioLink).toHaveAttribute('href', `/scenario/${scn.id}`)

		const scenarioImage = screen.queryByRole('img', {
			name: new RegExp(scn.name, 'i'),
		})

		expect(scenarioImage).toBeInTheDocument()
		expect(scenarioImage).toHaveAttribute('src', scn.imgUrl)
	})
})

test.todo('shows loading state')
test.todo('shows error state')
