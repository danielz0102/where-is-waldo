import request from 'supertest'
import { BusinessError } from '~/errors'
import { ScoreModel } from '~models/ScoreModel'
import { app } from '~tests/app'
import { createRandomScore, createRandomScores } from '~tests/lib/fakeData'

vi.mock('~models/ScoreModel')

const ScoreModelMock = vi.mocked(ScoreModel)
const fakeScores = createRandomScores()

describe('GET /api/scores/:scenarioId', () => {
	it('responds with an array of scores', async () => {
		const fakeId = crypto.randomUUID()
		ScoreModelMock.getTop10.mockImplementationOnce(async (id) => {
			return id === fakeId ? fakeScores : []
		})

		const response = await request(app).get(`/api/scores/${fakeId}`).expect(200)

		expect(response.body).toEqual(fakeScores)
	})

	it('responds with 400 if scenarioId is invalid', async () => {
		await request(app).get('/api/scores/invalid-scenario-id').expect(400)
	})
})

describe('POST /api/scores', () => {
	it('responds with 201 when a new score is created', async () => {
		const scoreExpected = createRandomScore()
		const { id: _, ...scoreToSend } = scoreExpected
		ScoreModelMock.new.mockImplementationOnce(async (score) => {
			const isTheSame =
				score.username === scoreExpected.username &&
				score.scenarioId === scoreExpected.scenarioId &&
				score.time === scoreExpected.time

			if (!isTheSame) {
				return Promise.reject('Score data is not being passed correctly')
			}

			return scoreExpected
		})

		const response = await request(app)
			.post('/api/scores')
			.send(scoreToSend)
			.expect(201)

		expect(response.body).toMatchObject(scoreExpected)
	})

	it('responds with 409 when a BusinessError occurs', async () => {
		const error = new BusinessError('Score is not in the top 10')
		ScoreModelMock.new.mockRejectedValueOnce(error)

		const response = await request(app)
			.post('/api/scores')
			.send(createRandomScore())
			.expect(409)

		expect(response.body).toMatchObject({ message: error.message })
	})

	it('responds with 400 when time is on the wrong format', () => {
		return request(app)
			.post('/api/scores')
			.send({ ...createRandomScore(), time: 'invalid-time-format' })
			.expect(400)
	})

	it('responds with 400 when scenarioId is not a UUID', () => {
		return request(app)
			.post('/api/scores')
			.send({ ...createRandomScore(), scenarioId: 'invalid-uuid' })
			.expect(400)
	})

	it('responds with 400 when username is not a string', () => {
		return request(app)
			.post('/api/scores')
			.send({ ...createRandomScore(), username: 12345 })
			.expect(400)
	})

	it('responds with 400 when a field is missing', () => {
		const fakeScore = createRandomScore()
		const { time: _, ...scoreWithoutTime } = fakeScore

		return request(app).post('/api/scores').send(scoreWithoutTime).expect(400)
	})
})
