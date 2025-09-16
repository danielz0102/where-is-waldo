import request from 'supertest'
import { app } from '~tests/app'
import charactersCollection from '~tests/mocks/charactersCollection'

vi.mock('~models/characters.model')

beforeAll(async () => {
	const { CharactersModel } = await import('~models/characters.model')
	const CharactersModelMock = vi.mocked(CharactersModel)

	CharactersModelMock.getAll.mockResolvedValue(charactersCollection)
	CharactersModelMock.getAllFromScenario.mockResolvedValue(
		charactersCollection.filter((character) => character.scenarioId === '1')
	)
	CharactersModelMock.get.mockResolvedValue(charactersCollection[0])
	CharactersModelMock.hasBeenClicked.mockResolvedValue(true)
})

describe('GET /api/characters', () => {
	it('responds with all characters', async () => {
		const response = await request(app).get('/api/characters').expect(200)

		expect(response.body).toEqual(charactersCollection)
	})
})

describe('GET /api/characters/:id', () => {
	it('responds with the character with the given ID', async () => {
		const id = '1'
		const character = charactersCollection.find((c) => c.id === id)
		const response = await request(app).get(`/api/characters/${id}`).expect(200)

		expect(response.body).toEqual(character)
	})

	it('responds with 404 if the character does not exist', async () => {
		const id = 'non-existent-id'
		const { CharactersModel } = await import('~models/characters.model')
		const CharactersModelMock = vi.mocked(CharactersModel)
		CharactersModelMock.get.mockResolvedValue(null)

		const response = await request(app).get(`/api/characters/${id}`).expect(404)

		expect(response.body).toEqual({ error: 'Character not found' })
	})
})

describe('GET /api/characters/:id/click', () => {
	it('responds true if the character has been clicked', async () => {
		const id = '1'
		const x = 75
		const y = 150

		const response = await request(app)
			.get(`/api/characters/${id}/click`)
			.query({ x, y })
			.expect(200)

		expect(response.body).toEqual(true)
	})

	it('responds false if the character has not been clicked', async () => {
		const { CharactersModel } = await import('~models/characters.model')
		const CharactersModelMock = vi.mocked(CharactersModel)
		CharactersModelMock.hasBeenClicked.mockResolvedValue(false)

		const id = '1'
		const x = 10
		const y = 20

		const response = await request(app)
			.get(`/api/characters/${id}/click`)
			.query({ x, y })
			.expect(200)

		expect(response.body).toEqual(false)
	})
})
