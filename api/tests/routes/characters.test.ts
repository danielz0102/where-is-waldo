import request from 'supertest'
import { app } from '~tests/app'
import charactersCollection from '~tests/mocks/charactersCollection'
import { AsyncServiceMocker } from '~tests/utils/AsyncServiceMocker'

vi.mock('~models/CharactersModel')

const { CharactersModel } = await import('~models/CharactersModel')
const CharactersModelMocker = new AsyncServiceMocker(CharactersModel)

describe('GET /api/characters', () => {
	it('responds with all characters', async () => {
		CharactersModelMocker.mock('getAll', charactersCollection)

		const response = await request(app).get('/api/characters').expect(200)

		expect(response.body).toEqual(charactersCollection)
	})
})

describe('GET /api/characters/:id', () => {
	it('responds with the character with the given ID', async () => {
		const character = charactersCollection[0]
		CharactersModelMocker.mock('get', character)

		const response = await request(app).get('/api/characters/1').expect(200)

		expect(response.body).toEqual(character)
	})

	it('responds with 404 if the character does not exist', async () => {
		CharactersModelMocker.mock('get', null)

		const response = await request(app)
			.get('/api/characters/non-existent-id')
			.expect(404)

		expect(response.body).toEqual({ error: 'Character not found' })
	})
})

describe('GET /api/characters/:id/click', () => {
	it('responds true if the character has been clicked', async () => {
		CharactersModelMocker.mock('hasBeenClicked', true)

		const response = await request(app)
			.get('/api/characters/1/click')
			.query({ x: 75, y: 150 })
			.expect(200)

		expect(response.body).toEqual(true)
	})

	it('responds false if the character has not been clicked', async () => {
		CharactersModelMocker.mock('hasBeenClicked', false)

		const response = await request(app)
			.get('/api/characters/1/click')
			.query({ x: 75, y: 150 })
			.expect(200)

		expect(response.body).toEqual(false)
	})

	it.todo('responds with 400 if x or y query params are missing')
})
