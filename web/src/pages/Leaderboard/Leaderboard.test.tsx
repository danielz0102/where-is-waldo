import { QueryClient } from '@tanstack/react-query'
import { screen } from '@testing-library/react'
import { useParams } from 'react-router'
import Leaderboard from '~/pages/Leaderboard'
import ScenarioService from '~services/ScenarioService'
import ScoreService from '~services/ScoreService'
import { createRandomScenario, createRandomScores } from '~tests/utils/fakeData'
import { Renderer } from '~tests/utils/Renderer'

vi.mock('react-router', async () => {
	const actual = await vi.importActual('react-router')
	return {
		...actual,
		useParams: vi.fn(),
	}
})

vi.mock('~services/ScenarioService', () => ({
	default: {
		getBySlug: vi.fn(),
	},
}))

vi.mock('~services/ScoreService', () => ({
	default: {
		getTop10ByScenario: vi.fn(),
	},
}))

const useParamsMock = vi.mocked(useParams)
const ScenarioServiceMock = vi.mocked(ScenarioService)
const ScoreServiceMock = vi.mocked(ScoreService)
const fakeScenario = createRandomScenario()
const fakeScores = createRandomScores(5)
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
})
const renderer = new Renderer().withRouter().withQueryProvider(queryClient)

beforeEach(() => {
	ScenarioServiceMock.getBySlug.mockResolvedValue(fakeScenario)
	ScoreServiceMock.getTop10ByScenario.mockResolvedValue(fakeScores)
	useParamsMock.mockReturnValue({ scenarioSlug: fakeScenario.slug })
	queryClient.clear()
})

test('has loading state', () => {
	ScoreServiceMock.getTop10ByScenario.mockImplementationOnce(
		() => new Promise(() => {})
	)

	renderer.render(<Leaderboard />)

	expect(screen.getByText(/loading/i)).toBeVisible()
})

test('has scenario name in heading', async () => {
	renderer.render(<Leaderboard />)

	const heading = await screen.findByRole('heading', {
		name: `${fakeScenario.name} Leaderboard`,
	})

	expect(heading).toBeVisible()
})

test('shows message when there are no scores', async () => {
	ScoreServiceMock.getTop10ByScenario.mockResolvedValueOnce([])

	renderer.render(<Leaderboard />)

	const message = await screen.findByText(/There are no scores yet/i)
	expect(message).toBeVisible()
})

test('renders link to scenario page in empty state', async () => {
	ScoreServiceMock.getTop10ByScenario.mockResolvedValueOnce([])

	renderer.render(<Leaderboard />)

	const link = await screen.findByRole('link', { name: /Be the first one!/i })
	expect(link).toBeVisible()
	expect(link).toHaveAttribute('href', `/scenario/${fakeScenario.slug}`)
})

test('renders table with correct headers', async () => {
	renderer.render(<Leaderboard />)

	expect(
		await screen.findByRole('columnheader', { name: 'Rank' })
	).toBeVisible()
	expect(screen.getByRole('columnheader', { name: 'User' })).toBeVisible()
	expect(screen.getByRole('columnheader', { name: 'Time' })).toBeVisible()
})

test('renders all scores in the table', async () => {
	renderer.render(<Leaderboard />)

	for (const score of fakeScores) {
		expect(await screen.findByText(score.username)).toBeVisible()
		expect(screen.getByText(score.time)).toBeVisible()
	}
})

test('displays correct rank numbers', async () => {
	renderer.render(<Leaderboard />)

	await screen.findByRole('columnheader', { name: 'Rank' })

	fakeScores.forEach((_, index) => {
		const rankCell = screen.getByText((index + 1).toString())
		expect(rankCell).toBeVisible()
	})
})
