import request from 'supertest'
import { app } from '~tests/app'
import scenariosCollection from '~tests/mocks/scenariosCollection'

vi.mock('~models/ScenariosModel')

beforeAll(async () => {
	const { ScenariosModel } = await import('~models/ScenariosModel')
	vi.mocked(ScenariosModel.getAll).mockResolvedValue(scenariosCollection)
	vi.mocked(ScenariosModel.get).mockResolvedValue(scenariosCollection[0])
})

describe('getAll', () => {
	it('responds with all scenarios', async () => {
		const response = await request(app).get('/api/scenarios').expect(200)

		expect(response.body).toEqual(scenariosCollection)
	})
})

describe('get', () => {
	it('responds with the identified scenario', async () => {
		const scenario = scenariosCollection.find((s) => s.id === '1')

		const response = await request(app).get('/api/scenarios/1').expect(200)

		expect(response.body).toEqual(scenario)
	})

	it('responds with an error if the scenario does not exist', async () => {
		const { ScenariosModel } = await import('~models/ScenariosModel')
		vi.mocked(ScenariosModel.get).mockResolvedValueOnce(undefined)

		const response = await request(app)
			.get('/api/scenarios/unknown')
			.expect(404)

		expect(response.body).toEqual({ error: 'Scenario not found' })
	})
})
