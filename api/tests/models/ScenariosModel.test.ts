import { ScenariosModel } from '~models/ScenariosModel'

describe('getAll', () => {
	it('returns an array', async () => {
		const scenarios = await ScenariosModel.getAll()
		expect(scenarios).toBeInstanceOf(Array)
	})
})

describe('get', () => {
	it('returns the scenario found by the filters', async () => {
		const scenarios = await ScenariosModel.getAll()

		const scenario = await ScenariosModel.get({
			id: scenarios[0].id,
			name: scenarios[0].name,
		})

		expect(scenario).toEqual(scenarios[0])
	})

	it('returns null if the scenario does not exists', async () => {
		const result = await ScenariosModel.get({
			name: 'non-existing-scenario',
			id: crypto.randomUUID(),
		})

		expect(result).toBeNull()
	})
})
