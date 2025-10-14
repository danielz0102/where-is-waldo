import type { Character } from '~/db/schema'
import { CharactersModel } from '~models/CharactersModel'

describe('getAll', () => {
	it('returns an array', async () => {
		const characters = await CharactersModel.getAll()
		expect(characters).toBeInstanceOf(Array)
	})
})

describe('get', () => {
	it('returns the character with the given id', async () => {
		const char = await getFirstCharacter()

		const result = await CharactersModel.get(char.id)

		expect(result).toEqual(char)
	})

	it('returns null if the character does not exist', async () => {
		const result = await CharactersModel.get(crypto.randomUUID())

		expect(result).toBeNull()
	})

	it('returns null if the uuid is not valid', async () => {
		const result = await CharactersModel.get('not-a-uuid')

		expect(result).toBeNull()
	})
})

describe('getAllFromScenario', () => {
	it('returns an array', async () => {
		const char = await getFirstCharacter()

		const characters = await CharactersModel.getAllFromScenario(char.id)

		expect(characters).toBeInstanceOf(Array)
	})
})

describe('hasBeenClicked', () => {
	it('returns true if the coords are within the character bounds', async () => {
		const character = await getFirstCharacter()
		const x = Math.floor((character.minX + character.maxX) / 2)
		const y = Math.floor((character.minY + character.maxY) / 2)

		const result = await CharactersModel.hasBeenClicked(character.id, { x, y })

		expect(result).toBe(true)
	})

	it('returns false if the coords are outside the character bounds', async () => {
		const character = await getFirstCharacter()
		const x = character.maxX + 10
		const y = character.maxY + 10

		const result = await CharactersModel.hasBeenClicked(character.id, { x, y })

		expect(result).toBe(false)
	})

	it('returns false if the character does not exists', async () => {
		const result = await CharactersModel.hasBeenClicked(crypto.randomUUID(), {
			x: 0,
			y: 0,
		})

		expect(result).toBe(false)
	})

	it('returns false if the uuid is not valid', async () => {
		const result = await CharactersModel.hasBeenClicked('not-a-uuid', {
			x: 0,
			y: 0,
		})

		expect(result).toBe(false)
	})
})

async function getFirstCharacter(): Promise<Character> {
	const characters = await CharactersModel.getAll()

	const char = characters[0]

	if (char === undefined) {
		throw new Error('No characters found in the database')
	}

	return char
}
