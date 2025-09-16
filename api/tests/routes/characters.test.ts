import request from 'supertest'
import { CharactersModel } from '~models/CharactersModel'
import { app } from '~tests/app'
import charactersCollection from '~tests/mocks/charactersCollection'

vi.mock('~models/CharactersModel')

const CharactersModelMock = vi.mocked(CharactersModel)

describe('GET /api/characters', () => {
	it('responds with all characters', async () => {
		CharactersModelMock.getAll.mockResolvedValueOnce(charactersCollection)

		const response = await request(app).get('/api/characters').expect(200)

		expect(response.body).toEqual(charactersCollection)
	})
})

describe('GET /api/characters/:id', () => {
	it('responds with the character with the given ID', async () => {
		const character = charactersCollection[0]
		CharactersModelMock.get.mockResolvedValueOnce(character)

		const response = await request(app).get('/api/characters/1').expect(200)

		expect(response.body).toEqual(character)
	})

	it('responds with 404 if the character does not exist', async () => {
		CharactersModelMock.get.mockResolvedValueOnce(null)

		const response = await request(app)
			.get('/api/characters/non-existent-id')
			.expect(404)

		expect(response.body).toEqual({ error: 'Character not found' })
	})
})

describe('GET /api/characters/:id/click', () => {
	it('responds true if the character has been clicked', async () => {
		CharactersModelMock.hasBeenClicked.mockResolvedValueOnce(true)

		const response = await request(app)
			.get('/api/characters/1/click')
			.query({ x: 75, y: 150 })
			.expect(200)

		expect(response.body).toEqual(true)
	})

	it('responds false if the character has not been clicked', async () => {
		CharactersModelMock.hasBeenClicked.mockResolvedValueOnce(false)

		const response = await request(app)
			.get('/api/characters/1/click')
			.query({ x: 75, y: 150 })
			.expect(200)

		expect(response.body).toEqual(false)
	})

	it('responds with 400 if x or y query params are missing', () => {
		return request(app).get('/api/characters/1/click').expect(400)
	})
})
