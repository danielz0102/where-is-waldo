import type { ScenarioModel } from '~models/ScenarioModel'
import scenariosCollection from './scenariosCollection'

export const ScenarioModelMock: typeof ScenarioModel = {
	getAll: async () => scenariosCollection,
	getById: async (id: string) => {
		const scenario = scenariosCollection.find((scenario) => scenario.id === id)
		return scenario || null
	},
}
