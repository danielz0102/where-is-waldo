import { eq } from 'drizzle-orm'
import db from '~/db'
import { scenarios, scores } from '~/db/schema'
import { msToTime, timeToMs } from '~/lib/timeUtils'
import { ScoreModel } from '~models/ScoreModel'
import { getFirstRecord } from '~tests/lib/dbQueries'

describe('getTop10', () => {
	it('returns the top 10 of the given scenario', async () => {
		const scenario = await getFirstRecord(scenarios)

		const scores = await ScoreModel.getTop10(scenario.id)

		expect(scores.length).toBeLessThanOrEqual(10)
		expect(scores[0]?.scenarioId).toBe(scenario.id)

		scores.forEach((current, i) => {
			if (i === 0 || i === scores.length - 1) return

			const nextOne = scores[i + 1]

			if (!nextOne) {
				throw new Error('Next score is undefined', { cause: scores })
			}

			expect(timeToMs(current.time)).toBeLessThanOrEqual(timeToMs(nextOne.time))
		})
	})
})

describe('new', async () => {
	const scenario = await getFirstRecord(scenarios)
	const newScoreData = {
		username: 'new_user_that_should_not_exist_01022002',
		time: '00:02:30',
		scenarioId: scenario.id,
	}

	afterAll(async () => {
		await db.delete(scores).where(eq(scores.username, newScoreData.username))
	})

	it('creates a new score if the username does not exist', async () => {
		const newScore = await ScoreModel.new(newScoreData)
		expect(newScore).toMatchObject(newScoreData)
	})

	it('updates the score if the username exists and the new score is better', async () => {
		const existingScore = await ScoreModel.getTop10(scenario.id).then(
			(scores) => scores.find((s) => s.username === newScoreData.username)
		)

		if (!existingScore) {
			throw new Error('Existing score not found', { cause: newScoreData })
		}

		const updatedScore = await ScoreModel.new({
			...newScoreData,
			time: '00:02:00',
		})

		expect(updatedScore?.id).toBe(existingScore.id)
		expect(updatedScore?.time).toBe('00:02:00')
	})

	it('throws an error if the new score is not better than the existing one', async () => {
		const promise = ScoreModel.new({
			...newScoreData,
			time: '00:03:00',
		})

		await expect(promise).rejects.toThrow(/score is not better/i)
	})
})

describe('isTop10', async () => {
	const scenario = await getFirstRecord(scenarios)
	const scores = await ScoreModel.getTop10(scenario.id)
	const worstTop10 = scores.at(-1)

	if (!worstTop10) {
		throw new Error('No scores found for the scenario', { cause: scenario })
	}

	it('returns true if the score is less than the worst top 10 score', async () => {
		const time = msToTime(timeToMs(worstTop10.time) - 1000)
		const isTop10 = await ScoreModel.isTop10(time, scenario.id)
		expect(isTop10).toBe(true)
	})

	it('returns false if the score is greater than the worst top 10 score', async () => {
		const time = msToTime(timeToMs(worstTop10.time) + 1000)
		const isTop10 = await ScoreModel.isTop10(time, scenario.id)
		expect(isTop10).toBe(false)
	})

	it('returns false if the score is equal to the worst top 10 score', async () => {
		const isTop10 = await ScoreModel.isTop10(worstTop10.time, scenario.id)
		expect(isTop10).toBe(false)
	})
})
