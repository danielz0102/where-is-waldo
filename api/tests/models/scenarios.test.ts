import { ScenariosModel } from '~models/ScenariosModel'

describe('getAll', () => {
	it('returns all scenarios', async () => {
		const scenarios = await ScenariosModel.getAll()
		expect(scenarios).toBeInstanceOf(Array)
	})
})

describe('get', () => {
	it('returns a scenario by id', async () => {
		const allScenarios = await ScenariosModel.getAll()

		const scenario = await ScenariosModel.get(allScenarios[0].id)

		expect(scenario).toEqual(allScenarios[0])
	})

	it('throws an error if the id does not exist', async () => {
		const result = ScenariosModel.get('non-existent-id')

		await expect(result).rejects.toThrow()
	})
})
