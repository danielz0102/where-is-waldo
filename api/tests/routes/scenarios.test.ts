import request from 'supertest'
import { ScenariosModel } from '~models/ScenariosModel'
import { app } from '~tests/app'
import scenariosCollection from '~tests/mocks/scenariosCollection'

vi.mock('~models/ScenariosModel')

const ScenariosModelMock = vi.mocked(ScenariosModel)

describe('GET /api/scenarios', () => {
	it('responds with all scenarios', async () => {
		ScenariosModelMock.get.mockResolvedValueOnce(scenariosCollection)

		const response = await request(app).get('/api/scenarios').expect(200)

		expect(response.body).toEqual(scenariosCollection)
	})
})

describe('GET /api/scenarios/:id', () => {
	it('responds with the scenario found', async () => {
		ScenariosModelMock.get.mockResolvedValueOnce([scenariosCollection[0]])

		const response = await request(app).get('/api/scenarios/1').expect(200)

		expect(response.body).toEqual(scenariosCollection[0])
	})

	it('responds with an error if the scenario does not exist', async () => {
		ScenariosModelMock.get.mockResolvedValueOnce([])

		const response = await request(app)
			.get('/api/scenarios/unknown')
			.expect(404)

		expect(response.body).toEqual({ error: 'Scenario not found' })
	})
})
