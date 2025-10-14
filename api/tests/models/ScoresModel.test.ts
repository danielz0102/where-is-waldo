import { eq } from 'drizzle-orm'
import db from '~/db'
import { scores as scoresSchema } from '~/db/schema'
import { msToTime, timeToMs } from '~/lib/timeUtils'
import { ScoresModel } from '~/models/ScoresModel'

const allScores = await db.select().from(scoresSchema)

describe('getAllFromScenario', async () => {
	it('returns the top 10 by default of a given scenario', async () => {
		const id = getScore(0).scenarioId
		const scores = await ScoresModel.getAllFromScenario(id)

		expect(scores.length).toBeLessThanOrEqual(10)

		scores.forEach((score, i) => {
			const next = scores[i + 1]
			if (!next) return
			const ms = timeToMs(score.time)
			const nextMs = timeToMs(next.time)

			expect(ms).toBeLessThanOrEqual(nextMs)
		})
	})

	it('returns the given quantity', async () => {
		const id = getScore(0).scenarioId
		const limit = 5

		const scores = await ScoresModel.getAllFromScenario(id, limit)

		expect(scores.length).toBeLessThanOrEqual(limit)
	})
})

describe('create', () => {
	const newScore = {
		username: 'test_user',
		time: '00:02:30',
		scenarioId: getScore(0).scenarioId,
	}

	beforeEach(async () => {
		await db
			.delete(scoresSchema)
			.where(eq(scoresSchema.username, newScore.username))
	})

	it('inserts a new score', async () => {
		await ScoresModel.create(newScore)

		const scores = await db
			.select()
			.from(scoresSchema)
			.where(eq(scoresSchema.username, newScore.username))

		expect(scores.length).toBe(1)
		expect(scores[0]).toMatchObject(newScore)
	})
})

describe('isTop10', () => {
	it('returns true if the score is in the top 10 for the scenario', async () => {
		const id = getScore(0).scenarioId
		const time = getScore(0).time

		const isTop10 = await ScoresModel.isTop10(time, id)

		expect(isTop10).toBe(true)
	})

	it('returns false if the score is not in the top 10 for the scenario', async () => {
		const id = getScore(0).scenarioId
		const scores = await ScoresModel.getAllFromScenario(id)

		if (scores.length < 10) {
			throw new Error('Not enough scores to test this case')
		}

		const worst = await getWorstScore(id)
		const newWorstTime = msToTime(timeToMs(worst.time) + 1000)
		const isTop10 = await ScoresModel.isTop10(newWorstTime, id)

		expect(isTop10).toBe(false)
	})

	it('returns false if the score is equal to the top 10 score for the scenario', async () => {
		const id = getScore(0).scenarioId
		const scores = await ScoresModel.getAllFromScenario(id)

		if (scores.length < 10) {
			throw new Error('Not enough scores to test this case')
		}

		const worst = await getWorstScore(id)
		const isTop10 = await ScoresModel.isTop10(worst.time, id)

		expect(isTop10).toBe(false)
	})
})

function getScore(index: number) {
	const score = allScores[index]

	if (!score) throw new Error(`No score found at index ${index}`)

	return score
}

async function getWorstScore(scenarioId: string) {
	const scores = await ScoresModel.getAllFromScenario(scenarioId)
	const worst = scores[scores.length - 1]

	if (worst === undefined) {
		throw new Error('Could not determine the worst top 10 score')
	}

	return worst
}
