import request from 'supertest'
import { app } from '~tests/app'
import scenariosCollection from '~tests/mocks/scenariosCollection'
import { AsyncServiceMocker } from '~tests/utils/AsyncServiceMocker'

vi.mock('~models/ScenariosModel')

const { ScenariosModel } = await import('~models/ScenariosModel')
const ScenariosModelMocker = new AsyncServiceMocker(ScenariosModel)

describe('GET /api/scenarios', () => {
	it('responds with all scenarios', async () => {
		ScenariosModelMocker.mock('getAll', scenariosCollection)

		const response = await request(app).get('/api/scenarios').expect(200)

		expect(response.body).toEqual(scenariosCollection)
	})
})

describe('GET /api/scenarios/:id', () => {
	it('responds with the scenario found', async () => {
		ScenariosModelMocker.mock('get', scenariosCollection[0])

		const response = await request(app).get('/api/scenarios/1').expect(200)

		expect(response.body).toEqual(scenariosCollection[0])
	})

	it('responds with an error if the scenario does not exist', async () => {
		ScenariosModelMocker.mock('get', null)

		const response = await request(app)
			.get('/api/scenarios/unknown')
			.expect(404)

		expect(response.body).toEqual({ error: 'Scenario not found' })
	})
})
