import request from 'supertest'
import { CharacterModel } from '~models/CharacterModel'
import { app } from '~tests/app'
import {
	createRandomCharacter,
	createRandomCharacters,
} from '~tests/lib/fakeData'

vi.mock('~models/CharacterModel')

const CharacterModelMock = vi.mocked(CharacterModel)
const fakeCharacters = createRandomCharacters()

describe('GET /api/characters', () => {
	it('responds with the array of characters received', async () => {
		CharacterModelMock.getAll.mockResolvedValueOnce(fakeCharacters)
		const response = await request(app).get('/api/characters').expect(200)
		expect(response.body).toEqual(fakeCharacters)
	})

	it('responds with an array of characters received when a scenarioId is provided', async () => {
		const fakeId = crypto.randomUUID()
		CharacterModelMock.getAllFromScenario.mockImplementationOnce(async (id) => {
			return id === fakeId ? fakeCharacters : []
		})

		const response = await request(app)
			.get(`/api/characters?scenarioId=${fakeId}`)
			.expect(200)

		expect(response.body).toEqual(fakeCharacters)
	})

	it('responds with status 400 if scenarioId is not a valid UUID', async () => {
		await request(app)
			.get('/api/characters?scenarioId=invalid-uuid')
			.expect(400)
	})
})

describe('GET /api/characters/:id', () => {
	it('responds with the character with the given ID', async () => {
		const fakeCharacter = createRandomCharacter()
		CharacterModelMock.getById.mockImplementationOnce(async (id) => {
			return id === fakeCharacter.id ? fakeCharacter : null
		})

		const response = await request(app)
			.get(`/api/characters/${fakeCharacter.id}`)
			.expect(200)

		expect(response.body).toEqual(fakeCharacter)
	})

	it('responds with 404 if the character does not exist', async () => {
		CharacterModelMock.getById.mockResolvedValueOnce(null)
		await request(app).get(`/api/characters/${crypto.randomUUID()}`).expect(404)
	})

	it('responds with 400 if the ID is not a valid UUID', () => {
		return request(app).get('/api/characters/invalid-uuid').expect(400)
	})
})

describe('GET /api/characters/:id/click', () => {
	beforeAll(() => {
		CharacterModelMock.click.mockResolvedValue(true)
	})

	it('responds true if the character has been clicked', async () => {
		const response = await request(app)
			.get(`/api/characters/${crypto.randomUUID()}/click`)
			.query({ x: 100, y: 50 })
			.expect(200)

		expect(response.body).toEqual(true)
	})

	it('responds false if the character has not been clicked', async () => {
		CharacterModelMock.click.mockResolvedValueOnce(false)

		const response = await request(app)
			.get(`/api/characters/${crypto.randomUUID()}/click`)
			.query({ x: 100, y: 100 })
			.expect(200)

		expect(response.body).toEqual(false)
	})

	it('ignores extra query parameters', async () => {
		await request(app)
			.get(`/api/characters/${crypto.randomUUID()}/click`)
			.query({ x: 100, y: 100, extraParam: 'extraValue' })
			.expect(200)
	})

	it('accepts decimal coordinates', async () => {
		await request(app)
			.get(`/api/characters/${crypto.randomUUID()}/click`)
			.query({ x: 100.5, y: 200.7 })
			.expect(200)
	})

	it('responds with 400 if the ID is not a valid UUID', async () => {
		await request(app)
			.get('/api/characters/invalid-uuid/click')
			.query({ x: 100, y: 100 })
			.expect(400)
	})

	it('responds with 400 if coordinates are missing', async () => {
		await request(app)
			.get(`/api/characters/${crypto.randomUUID()}/click`)
			.expect(400)
	})

	it('responds with 400 if coordinates are not numbers', async () => {
		await request(app)
			.get(`/api/characters/${crypto.randomUUID()}/click`)
			.query({ x: {}, y: '; DELETE FROM characters;' })
			.expect(400)
	})

	it('responds with 400 if coordinates are negative', async () => {
		await request(app)
			.get(`/api/characters/${crypto.randomUUID()}/click`)
			.query({ x: -10, y: -20 })
			.expect(400)
	})
})
