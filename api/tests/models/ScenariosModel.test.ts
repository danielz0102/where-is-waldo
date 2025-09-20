import { ScenariosModel } from '~models/ScenariosModel'

describe('get', () => {
	it('returns all the scenarios if no filter is provided', async () => {
		const scenarios = await ScenariosModel.get()
		expect(scenarios).toBeInstanceOf(Array)
	})

	it('returns the scenario found by the filters', async () => {
		const scenarios = await ScenariosModel.get()

		const result = await ScenariosModel.get({
			id: scenarios[0].id,
			name: scenarios[0].name,
		})

		expect(result).toEqual([scenarios[0]])
	})

	it('returns an empty array if the scenario does not exists', async () => {
		const result = await ScenariosModel.get({
			name: 'non-existing-scenario',
			id: crypto.randomUUID(),
		})

		expect(result).toEqual([])
	})
})
