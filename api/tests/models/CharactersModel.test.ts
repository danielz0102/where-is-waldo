import { CharactersModel } from '~models/CharactersModel'
import { ScenariosModel } from '~models/ScenariosModel'

describe('getAll', () => {
	it('returns an array', async () => {
		const characters = await CharactersModel.getAll()
		expect(characters).toBeInstanceOf(Array)
	})
})

describe('get', () => {
	it('returns the character with the given id', async () => {
		const characters = await CharactersModel.getAll()

		const character = await CharactersModel.get(characters[0].id)

		expect(character).toEqual(characters[0])
	})

	it('returns null if the character does not exist', async () => {
		const result = await CharactersModel.get(crypto.randomUUID())

		expect(result).toBeNull()
	})

	it.todo('returns null if the uuid is not valid')
})

describe('getAllFromScenario', () => {
	it('returns an array', async () => {
		const scenarios = await ScenariosModel.getAll()

		const characters = await CharactersModel.getAllFromScenario(scenarios[0].id)

		expect(characters).toBeInstanceOf(Array)
	})
})

describe('hasBeenClicked', () => {
	it('returns true if the coords are within the character bounds', async () => {
		const { x, y, id } = await getIdWithValidCoordinates()

		const result = await CharactersModel.hasBeenClicked(id, { x, y })

		expect(result).toBe(true)
	})

	it('returns false if the coords are outside the character bounds', async () => {
		const { x, y, id } = await getIdWithInvalidCoordinates()

		const result = await CharactersModel.hasBeenClicked(id, { x, y })

		expect(result).toBe(false)
	})

	it('returns false if the character does not exists', async () => {
		const result = await CharactersModel.hasBeenClicked(crypto.randomUUID(), {
			x: 0,
			y: 0,
		})

		expect(result).toBe(false)
	})

	it.todo('returns false if the uuid is not valid')
})

async function getIdWithValidCoordinates(): Promise<{
	x: number
	y: number
	id: string
}> {
	const characters = await CharactersModel.getAll()
	const character = characters[0]
	const x = Math.floor((character.minX + character.maxX) / 2)
	const y = Math.floor((character.minY + character.maxY) / 2)

	return { x, y, id: character.id }
}

async function getIdWithInvalidCoordinates(): Promise<{
	x: number
	y: number
	id: string
}> {
	const characters = await CharactersModel.getAll()
	const character = characters[0]
	const x = character.maxX + 10
	const y = character.maxY + 10

	return { x, y, id: character.id }
}
