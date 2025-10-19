import request from 'supertest'
import { ScenarioModel } from '~models/ScenarioModel'
import { app } from '~tests/app'
import {
	createRandomScenario,
	createRandomScenarios,
} from '~tests/lib/fakeData'

vi.mock('~models/ScenarioModel')

const ScenarioModelMock = vi.mocked(ScenarioModel)
const fakeScenarios = createRandomScenarios()

describe('GET /api/scenarios', () => {
	it('responds with an array of scenarios', async () => {
		ScenarioModelMock.getAll.mockResolvedValueOnce(fakeScenarios)
		const response = await request(app).get('/api/scenarios').expect(200)
		expect(response.body).toEqual(fakeScenarios)
	})
})

describe('GET /api/scenarios/:id', () => {
	it('responds with the scenario found', async () => {
		const fakeScenario = createRandomScenario()
		ScenarioModelMock.getById.mockImplementationOnce(async (id: string) => {
			return id === fakeScenario.id ? fakeScenario : null
		})

		const response = await request(app)
			.get(`/api/scenarios/${fakeScenario.id}`)
			.expect(200)

		expect(response.body).toEqual(fakeScenario)
	})

	it('responds 404 if the scenario does not exist', async () => {
		ScenarioModelMock.getById.mockResolvedValueOnce(null)
		await request(app).get(`/api/scenarios/${crypto.randomUUID()}`).expect(404)
	})

	it('responds 400 if the id is not a valid UUID', async () => {
		await request(app).get('/api/scenarios/invalid-uuid').expect(400)
	})
})
