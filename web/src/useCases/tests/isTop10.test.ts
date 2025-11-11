import { timeToSeconds } from '~/lib/timeUtils'
import ScoreService from '~/services/ScoreService'
import { isTop10 } from '~/useCases/isTop10'
import { createRandomScores } from '~tests/utils/fakeData'

vi.mock('~/services/ScoreService', () => ({
	default: {
		getTop10ByScenario: vi.fn(),
	},
}))

const getTop10Mock = vi.mocked(ScoreService.getTop10ByScenario)

test('returns true if there are less than 10 scores', async () => {
	getTop10Mock.mockResolvedValueOnce(createRandomScores(5))

	const result = await isTop10(crypto.randomUUID(), 60)

	expect(result).toBe(true)
})

test('returns true if the new score is better than at least one of the top 10 scores', async () => {
	const fakeScores = createRandomScores(10)
	getTop10Mock.mockResolvedValueOnce(fakeScores)

	const newScoreInSeconds = timeToSeconds(fakeScores[0].time) - 1
	const result = await isTop10(crypto.randomUUID(), newScoreInSeconds)

	expect(result).toBe(true)
})

test('returns false if the new score is worse than all of the top 10 scores', async () => {
	const fakeScores = createRandomScores(10)
	getTop10Mock.mockResolvedValueOnce(fakeScores)
	const worstScore = fakeScores.reduce((prev, curr) => {
		return timeToSeconds(prev.time) > timeToSeconds(curr.time) ? prev : curr
	})

	const newScore = timeToSeconds(worstScore.time) + 1
	const result = await isTop10(crypto.randomUUID(), newScore)

	expect(result).toBe(false)
})
