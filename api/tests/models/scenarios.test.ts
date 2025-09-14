import { ScenariosModel } from '~models/scenarios.model'

describe('getAll', () => {
	it('should return all scenarios', async () => {
		const scenarios = await ScenariosModel.getAll()
		expect(scenarios).toBeInstanceOf(Array)
	})
})
