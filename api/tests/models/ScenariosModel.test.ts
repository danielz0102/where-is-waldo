import { ScenariosModel } from '~models/ScenariosModel'

describe('get', () => {
	it('returns all the scenarios if no filter is provided', async () => {
		const scenarios = await ScenariosModel.get()
		expect(scenarios).toBeInstanceOf(Array)
	})

	it('returns the scenario found by the filters', async () => {
		const scenarios = await ScenariosModel.get()
		const first = scenarios[0]

		if (first === undefined) {
			throw new Error('No scenarios found in the database')
		}

		const result = await ScenariosModel.get({
			id: first.id,
			name: first.name,
		})

		expect(result).toEqual([first])
	})

	it('returns an empty array if the scenario does not exists', async () => {
		const result = await ScenariosModel.get({
			name: 'non-existing-scenario',
			id: crypto.randomUUID(),
		})

		expect(result).toEqual([])
	})
})
