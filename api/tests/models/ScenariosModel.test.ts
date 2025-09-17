import { ScenariosModel } from '~models/ScenariosModel'

describe('getAll', () => {
	it('returns an array', async () => {
		const scenarios = await ScenariosModel.getAll()
		expect(scenarios).toBeInstanceOf(Array)
	})
})

describe('get', () => {
	it('returns a scenario by id', async () => {
		const scenarios = await ScenariosModel.getAll()

		const scenario = await ScenariosModel.get(scenarios[0].id)

		expect(scenario).toEqual(scenarios[0])
	})

	it('returns null if the scenario does not exists', async () => {
		const result = await ScenariosModel.get(crypto.randomUUID())

		expect(result).toBeNull()
	})

	it('returns null if the id is not valid', async () => {
		const result = await ScenariosModel.get('not-a-uuid')

		expect(result).toBeNull()
	})
})
