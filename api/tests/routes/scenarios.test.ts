import request from 'supertest'
import { app } from '~tests/app'
import { getRandomFrom } from '~tests/lib/getRandomFrom'
import scenariosCollection from '~tests/mocks/scenariosCollection'

vi.mock('~models/ScenarioModel', async () => {
	const { ScenarioModelMock } = await import('~tests/mocks/ScenarioModelMock')
	return { ScenarioModel: ScenarioModelMock }
})

describe('GET /api/scenarios', () => {
	it('responds with all scenarios', async () => {
		const response = await request(app).get('/api/scenarios').expect(200)
		expect(response.body).toEqual(scenariosCollection)
	})
})

describe('GET /api/scenarios/:id', () => {
	it('responds with the scenario found', async () => {
		const fakeScenario = getRandomFrom(scenariosCollection)

		const response = await request(app)
			.get(`/api/scenarios/${fakeScenario.id}`)
			.expect(200)

		expect(response.body).toEqual(fakeScenario)
	})

	it('responds 404 if the scenario does not exist', async () => {
		await request(app).get(`/api/scenarios/${crypto.randomUUID()}`).expect(404)
	})

	it('responds 400 if the id is not a valid UUID', async () => {
		await request(app).get('/api/scenarios/invalid-uuid').expect(400)
	})
})
