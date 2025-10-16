import { characters, scenarios } from '~/db/schema'
import { getFirstRecord } from '~tests/lib/dbQueries'
import { CharacterRepository } from '../CharacterRepository'

const getData = await queryData()

describe('getById', () => {
	it('returns the character with the given id', async () => {
		const { character } = getData()

		const result = await CharacterRepository.getById(character.id)

		expect(result).toEqual(character)
	})

	it('returns null if no character with the given id exists', async () => {
		const result = await CharacterRepository.getById(crypto.randomUUID())
		expect(result).toBeNull()
	})

	it('throws an error if the id is not a valid UUID', async () => {
		await expect(CharacterRepository.getById('invalid-uuid')).rejects.toThrow()
	})
})

describe('getByScenarioId', () => {
	it('returns all characters that belong to the given scenario', async () => {
		const { scenario } = getData()

		const characters = await CharacterRepository.getByScenarioId(scenario.id)

		characters.forEach((char) => {
			expect(char.scenarioId).toBe(scenario.id)
		})
	})

	it('returns an empty array if no characters were found', async () => {
		const result = await CharacterRepository.getByScenarioId(
			crypto.randomUUID()
		)
		expect(result).toEqual([])
	})

	it('throws an error if the scenario id is not a valid UUID', async () => {
		await expect(
			CharacterRepository.getByScenarioId('invalid-uuid')
		).rejects.toThrow()
	})
})

describe('getByCoordinates', () => {
	it('returns an array with the characters found at the given coordinates', async () => {
		const { character } = getData()

		const characters = await CharacterRepository.getByCoordinates({
			id: character.id,
			x: (character.minX + character.maxX) / 2,
			y: (character.minY + character.maxY) / 2,
		})

		expect(characters.find((char) => char.id === character.id)).toBeDefined()
	})

	it('returns an empty array if no characters were found at the given coordinates', async () => {
		const { character } = getData()

		const characters = await CharacterRepository.getByCoordinates({
			id: character.id,
			x: 10000,
			y: 10000,
		})

		expect(characters).toEqual([])
	})

	it('throws an error if the id is not a valid UUID', async () => {
		await expect(
			CharacterRepository.getByCoordinates({
				id: 'invalid-uuid',
				x: 50,
				y: 50,
			})
		).rejects.toThrow()
	})
})

async function queryData() {
	const [character, scenario] = await Promise.all([
		getFirstRecord(characters),
		getFirstRecord(scenarios),
	])

	return () => ({ character, scenario })
}
