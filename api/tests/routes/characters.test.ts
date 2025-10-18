import request from 'supertest'
import { CharacterModel } from '~models/CharacterModel'
import { app } from '~tests/app'
import charactersCollection from '~tests/mocks/charactersCollection'

vi.mock('~models/CharacterModel', async () => {
	const { CharacterModelMock } = await import('~tests/mocks/CharacterModelMock')
	return {
		CharacterModel: CharacterModelMock,
	}
})

const CharacterModelMock = vi.mocked(CharacterModel)

describe('GET /api/characters', () => {
	it('responds with all characters', async () => {
		const charactersExpected = await CharacterModelMock.getAll()
		const response = await request(app).get('/api/characters').expect(200)
		expect(response.body).toEqual(charactersExpected)
	})

	it('responds with all characters from the scenario passed', async () => {
		const { scenarioId } = getFakeCharacter()
		const scenariosExpected =
			await CharacterModelMock.getAllFromScenario(scenarioId)

		const response = await request(app)
			.get(`/api/characters?scenarioId=${scenarioId}`)
			.expect(200)

		expect(response.body).toEqual(scenariosExpected)
	})

	it('responds with status 400 if scenarioId is not a valid UUID', async () => {
		await request(app)
			.get('/api/characters?scenarioId=invalid-uuid')
			.expect(400)
	})
})

describe('GET /api/characters/:id', () => {
	it('responds with the character with the given ID', async () => {
		const fakeCharacter = getFakeCharacter()

		const response = await request(app)
			.get(`/api/characters/${fakeCharacter.id}`)
			.expect(200)

		expect(response.body).toEqual(fakeCharacter)
	})

	it('responds with 404 if the character does not exist', async () => {
		const response = await request(app)
			.get(`/api/characters/${crypto.randomUUID()}`)
			.expect(404)

		expect(response.body).toEqual({ error: 'Character not found' })
	})

	it('responds with 400 if the ID is not a valid UUID', async () => {
		await request(app).get('/api/characters/invalid-uuid').expect(400)
	})
})

describe('GET /api/characters/:id/click', () => {
	it('responds true if the character has been clicked', async () => {
		const fakeCharacter = getFakeCharacter()

		const response = await request(app)
			.get(`/api/characters/${fakeCharacter.id}/click`)
			.query({ x: fakeCharacter.maxX, y: fakeCharacter.maxY })
			.expect(200)

		expect(response.body).toEqual(true)
	})

	it('responds false if the character has not been clicked', async () => {
		const fakeCharacter = getFakeCharacter()

		const response = await request(app)
			.get(`/api/characters/${fakeCharacter.id}/click`)
			.query({ x: fakeCharacter.maxX + 1, y: fakeCharacter.maxY + 1 })
			.expect(200)

		expect(response.body).toEqual(false)
	})

	it('responds false if the character does not exist', async () => {
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
		const fakeCharacter = getFakeCharacter()
		await request(app)
			.get(`/api/characters/${fakeCharacter.id}/click`)
			.expect(400)
	})

	it('responds with 400 if coordinates are not numbers', async () => {
		const fakeCharacter = getFakeCharacter()
		await request(app)
			.get(`/api/characters/${fakeCharacter.id}/click`)
			.query({ x: {}, y: '; DELETE FROM characters;' })
			.expect(400)
	})

	it('responds with 400 if coordinates are negative', async () => {
		const fakeCharacter = getFakeCharacter()
		await request(app)
			.get(`/api/characters/${fakeCharacter.id}/click`)
			.query({ x: -10, y: -20 })
			.expect(400)
	})
})

function getFakeCharacter() {
	const fakeCharacter = charactersCollection[0]

	if (!fakeCharacter) {
		throw new Error('Character with index 0 was not found in the collection')
	}

	return fakeCharacter
}
