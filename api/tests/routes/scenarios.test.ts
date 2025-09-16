import request from 'supertest'
import { app } from '~tests/app'
import scenariosCollection from '~tests/mocks/scenariosCollection'

vi.mock('~models/ScenariosModel')

describe('GET /api/scenarios', () => {
	it('responds with all scenarios', async () => {
		const { ScenariosModel } = await import('~models/ScenariosModel')
		vi.mocked(ScenariosModel.getAll).mockResolvedValueOnce(scenariosCollection)

		const response = await request(app).get('/api/scenarios').expect(200)

		expect(response.body).toEqual(scenariosCollection)
	})
})

describe('GET /api/scenarios/:id', () => {
	it('responds with the scenario found', async () => {
		const { ScenariosModel } = await import('~models/ScenariosModel')
		vi.mocked(ScenariosModel.get).mockResolvedValueOnce(scenariosCollection[0])

		const response = await request(app).get('/api/scenarios/1').expect(200)

		expect(response.body).toEqual(scenariosCollection[0])
	})

	it('responds with an error if the scenario does not exist', async () => {
		const { ScenariosModel } = await import('~models/ScenariosModel')
		vi.mocked(ScenariosModel.get).mockResolvedValueOnce(null)

		const response = await request(app)
			.get('/api/scenarios/unknown')
			.expect(404)

		expect(response.body).toEqual({ error: 'Scenario not found' })
	})
})
