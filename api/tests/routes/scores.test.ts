import request from 'supertest'
import { ScoresModel } from '~models/ScoresModel'
import { app } from '~tests/app'

vi.mock('~models/ScoresModel')

const ScoresModelMock = vi.mocked(ScoresModel)

beforeEach(() => {
	vi.clearAllMocks()
})

describe('GET /api/scores/:scenarioId', () => {
	it('responds with all scores for the given scenario', async () => {
		const scenarioId = 'scenario-1'
		const fakeScores = [
			{ id: '1', username: 'user1', time: '00:01:30', scenarioId },
			{ id: '2', username: 'user2', time: '00:02:00', scenarioId },
		]
		ScoresModelMock.getAllFromScenario.mockResolvedValueOnce(fakeScores)

		const response = await request(app)
			.get(`/api/scores/${scenarioId}`)
			.expect(200)

		expect(response.body).toEqual(fakeScores)
	})

	it('responds with the number of scores provided by limit query param', async () => {
		const scenarioId = 'scenario-1'
		const limit = 1
		const fakeScores = [
			{ id: '1', username: 'user1', time: '00:01:30', scenarioId },
		]
		ScoresModelMock.getAllFromScenario.mockResolvedValueOnce(fakeScores)

		const response = await request(app)
			.get(`/api/scores/${scenarioId}`)
			.query({ limit })
			.expect(200)

		expect(ScoresModelMock.getAllFromScenario).toHaveBeenCalledWith(
			scenarioId,
			limit
		)
		expect(response.body).toEqual(fakeScores)
	})
})
