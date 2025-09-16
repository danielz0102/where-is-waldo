import { CharactersModel } from '~models/CharactersModel'
import { ScenariosModel } from '~models/ScenariosModel'

describe('getAll', () => {
	it('returns all scenarios', async () => {
		const scenarios = await CharactersModel.getAll()
		expect(scenarios).toBeInstanceOf(Array)
	})
})

describe('get', () => {
	it('returns a scenario by id', async () => {
		const allScenarios = await CharactersModel.getAll()

		const scenario = await CharactersModel.get(allScenarios[0].id)

		expect(scenario).toEqual(allScenarios[0])
	})

	it('throws an error if the id does not exist', async () => {
		const result = CharactersModel.get('non-existent-id')

		await expect(result).rejects.toThrow()
	})
})

describe('getAllFromScenario', () => {
	it('returns all characters from a scenario', async () => {
		const allScenarios = await ScenariosModel.getAll()
		const characters = await CharactersModel.getAllFromScenario(
			allScenarios[0].id
		)
		expect(characters).toBeInstanceOf(Array)
	})
})

describe('hasBeenClicked', () => {
	it('returns true if the coords are within the character bounds', async () => {
		const allCharacters = await CharactersModel.getAll()
		const character = allCharacters[0]
		const x = Math.floor((character.minX + character.maxX) / 2)
		const y = Math.floor((character.minY + character.maxY) / 2)

		const result = await CharactersModel.hasBeenClicked(character.id, { x, y })

		expect(result).toBe(true)
	})

	it('returns false if the coords are outside the character bounds', async () => {
		const allCharacters = await CharactersModel.getAll()
		const character = allCharacters[0]
		const x = character.maxX + 10
		const y = character.maxY + 10

		const result = await CharactersModel.hasBeenClicked(character.id, { x, y })

		expect(result).toBe(false)
	})
})
