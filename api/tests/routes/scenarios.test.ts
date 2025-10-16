import request from 'supertest'
import type { Scenario } from '~/db/schema'
import { ScenariosModel } from '~/models/ScenariosModel'
import { app } from '~tests/app'
import scenariosCollection from '~tests/mocks/scenariosCollection'

vi.mock('~models/ScenariosModel')

const ScenariosModelMock = vi.mocked(ScenariosModel)

beforeEach(() => {
	vi.clearAllMocks()
})

const fakeScenario: Scenario = {
	id: '1',
	name: 'Test Scenario',
	imgUrl: 'http://example.com/image.jpg',
}

describe('GET /api/scenarios', () => {
	it('responds with all scenarios', async () => {
		ScenariosModelMock.get.mockResolvedValueOnce(scenariosCollection)

		const response = await request(app).get('/api/scenarios').expect(200)

		expect(response.body).toEqual(scenariosCollection)
	})

	it('allows get by name', async () => {
		ScenariosModelMock.get.mockResolvedValueOnce([fakeScenario])

		const response = await request(app)
			.get('/api/scenarios')
			.query({ name: fakeScenario.name })
			.expect(200)

		expect(ScenariosModelMock.get).toHaveBeenCalledWith({
			name: fakeScenario.name,
		})
		expect(response.body).toEqual([fakeScenario])
	})

	it('ignores unknown query params', async () => {
		ScenariosModelMock.get.mockResolvedValueOnce(scenariosCollection)

		await request(app)
			.get('/api/scenarios')
			.query({ unknown: 'value' })
			.expect(200)

		expect(ScenariosModelMock.get).toHaveBeenCalledWith({})
	})
})

describe('GET /api/scenarios/:id', () => {
	it('responds with the scenario found', async () => {
		ScenariosModelMock.get.mockResolvedValueOnce([fakeScenario])

		const response = await request(app)
			.get(`/api/scenarios/${fakeScenario.id}`)
			.expect(200)

		expect(response.body).toEqual(fakeScenario)
	})

	it('responds with an error if the scenario does not exist', async () => {
		ScenariosModelMock.get.mockResolvedValueOnce([])

		const response = await request(app)
			.get('/api/scenarios/unknown')
			.expect(404)

		expect(response.body).toEqual({ error: 'Scenario not found' })
	})
})
