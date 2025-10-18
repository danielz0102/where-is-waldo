import type { CharacterModel } from '~models/CharacterModel'
import charactersCollection from '~tests/mocks/charactersCollection'

export const CharacterModelMock: typeof CharacterModel = {
	getAll: async () => charactersCollection,
	getAllFromScenario: async (scenarioId: string) =>
		charactersCollection.filter((char) => char.scenarioId === scenarioId),
	getById: async (id: string) =>
		charactersCollection.find((char) => char.id === id) || null,
	click: async ({ id, x, y }) => {
		const character = await CharacterModelMock.getById(id)

		if (!character) {
			return false
		}
		return (
			x >= character.minX &&
			x <= character.maxX &&
			y >= character.minY &&
			y <= character.maxY
		)
	},
}
