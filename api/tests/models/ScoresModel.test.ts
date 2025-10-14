import { eq } from 'drizzle-orm'
import db from '~/db'
import { scores as scoresSchema } from '~/db/schema'
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

function timeToMs(time: string) {
	const [hours, minutes, seconds] = time.split(':').map(Number)

	if (hours === undefined || minutes === undefined || seconds === undefined) {
		throw new Error(`Invalid time format: ${time}`)
	}

	return hours * 3600 + minutes * 60 + seconds
}

function getScore(index: number) {
	const score = allScores[index]

	if (!score) throw new Error(`No score found at index ${index}`)

	return score
}
