import { characters } from '~/db/schema'
import { getFirstRecord } from '~tests/lib/dbQueries'
import { CharacterRepository } from '../CharacterRepository'

describe('getByCoordinates', () => {
	it('returns an array with the characters found at the given coordinates', async () => {
		const character = await getFirstRecord(characters)

		const charactersFound = await CharacterRepository.getByCoordinates({
			id: character.id,
			x: (character.minX + character.maxX) / 2,
			y: (character.minY + character.maxY) / 2,
		})

		expect(charactersFound.some((c) => c.id === character.id)).toBe(true)
	})
})
