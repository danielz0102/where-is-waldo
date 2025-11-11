import { QueryClient } from '@tanstack/react-query'
import { screen, waitForElementToBeRemoved } from '@testing-library/react'
import ScenarioService from '~services/ScenarioService'
import { createRandomScenarios } from '~tests/utils/fakeData'
import { Renderer } from '~tests/utils/Renderer'
import SelectScenario from '.'

vi.mock('~services/ScenarioService', () => ({
	default: {
		getAll: vi.fn(),
	},
}))

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
})
const renderer = new Renderer().withRouter().withQueryProvider(queryClient)
const fakeScenarios = createRandomScenarios()
const getAllMock = vi.mocked(ScenarioService.getAll)

beforeEach(() => {
	getAllMock.mockResolvedValue(fakeScenarios)
	queryClient.clear()
})

test('has a title', () => {
	renderer.render(<SelectScenario />)

	const title = screen.queryByRole('heading', {
		level: 1,
		name: /select a scenario/i,
	})

	expect(title).toBeVisible()
})

test('has a link to go back to the landing page', () => {
	renderer.render(<SelectScenario />)

	const backLink = screen.queryByRole('link', {
		name: /home/i,
	})

	expect(backLink).toBeInTheDocument()
	expect(backLink).toHaveAttribute('href', '/')
})

test('shows loading state for scenarios', () => {
	getAllMock.mockImplementationOnce(() => new Promise(() => {}))
	renderer.render(<SelectScenario />)
	expect(screen.queryByText(/loading/i)).toBeInTheDocument()
})

test('displays two buttons and an image for each scenario', async () => {
	renderer.render(<SelectScenario />)

	const loading = await screen.findByText(/loading/i)
	await waitForElementToBeRemoved(loading)

	fakeScenarios.forEach((scn) => {
		const playButton = screen.getByRole('link', {
			name: new RegExp(`play.*${scn.name}`, 'i'),
		})
		const leaderboardButton = screen.getByRole('link', {
			name: new RegExp(`leaderboard.*${scn.name}`, 'i'),
		})
		const scenarioImage = screen.getByRole('img', {
			name: new RegExp(scn.name, 'i'),
		})

		expect(playButton).toHaveAttribute('href', `/scenario/${scn.slug}`)
		expect(leaderboardButton).toHaveAttribute(
			'href',
			`/leaderboard/${scn.slug}`
		)
		expect(scenarioImage).toHaveAttribute('src', scn.imgUrl)
	})
})

test('shows error state', async () => {
	getAllMock.mockRejectedValueOnce(new Error('Failed to fetch'))
	renderer.render(<SelectScenario />)

	const loading = await screen.findByText(/loading/i)
	await waitForElementToBeRemoved(loading)

	expect(screen.queryByText(/error.*occurred/i)).toBeInTheDocument()
})
