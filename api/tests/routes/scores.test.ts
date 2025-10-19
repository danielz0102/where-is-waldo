import request from 'supertest'
import type { Score } from '~/db/schema'
import { BusinessError } from '~/errors'
import { ScoreModel } from '~models/ScoreModel'
import { app } from '~tests/app'
import scoresCollection from '~tests/mocks/scoresCollection'

vi.mock('~models/ScoreModel')

const ScoreModelMock = vi.mocked(ScoreModel)

describe('GET /api/scores/:scenarioId', () => {
	it('responds with an array of scores', async () => {
		ScoreModelMock.getTop10.mockResolvedValueOnce(scoresCollection)

		const response = await request(app)
			.get(`/api/scores/${crypto.randomUUID()}`)
			.expect(200)

		expect(response.body).toEqual(scoresCollection)
	})

	it('responds with 400 if scenarioId is invalid', async () => {
		await request(app).get('/api/scores/invalid-scenario-id').expect(400)
	})
})

describe('POST /api/scores', () => {
	const newScore: Omit<Score, 'id'> = {
		username: 'newTopPlayer',
		scenarioId: crypto.randomUUID(),
		time: '00:45:45',
	}

	it('responds with 201 when a new score is created', async () => {
		const scoreExpected = { id: crypto.randomUUID(), ...newScore }
		ScoreModelMock.new.mockResolvedValueOnce(scoreExpected)

		const response = await request(app)
			.post('/api/scores')
			.send(newScore)
			.expect(201)

		expect(response.body).toMatchObject(scoreExpected)
	})

	it('responds with 409 when a BusinessError occurs', async () => {
		const error = new BusinessError('Score is not in the top 10')
		ScoreModelMock.new.mockRejectedValueOnce(error)

		const response = await request(app)
			.post('/api/scores')
			.send(newScore)
			.expect(409)

		expect(response.body).toMatchObject({ message: error.message })
	})

	it('responds with 400 when time is on the wrong format', async () => {
		await request(app)
			.post('/api/scores')
			.send({ ...newScore, time: 'invalid-time-format' })
			.expect(400)
	})

	it('responds with 400 when scenarioId is not a UUID', async () => {
		await request(app)
			.post('/api/scores')
			.send({ ...newScore, scenarioId: 'invalid-uuid' })
			.expect(400)
	})

	it('responds with 400 when username is not a string', async () => {
		await request(app)
			.post('/api/scores')
			.send({ ...newScore, username: 12345 })
			.expect(400)
	})

	it('responds with 400 when a field is missing', async () => {
		await request(app)
			.post('/api/scores')
			.send({ username: 'playerWithoutTime', scenarioId: crypto.randomUUID() })
			.expect(400)
	})
})
