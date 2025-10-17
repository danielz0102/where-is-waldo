import { characters } from '~/db/schema'
import { CharacterModel } from '~models/CharacterModel'
import { getFirstRecord } from '~tests/lib/dbQueries'

describe('click', () => {
	it('returns true if the coordinates are within the character bounds', async () => {
		const character = await getFirstRecord(characters)

		const isClicked = await CharacterModel.click({
			id: character.id,
			x: character.minX + 1,
			y: character.minY + 1,
		})

		expect(isClicked).toBe(true)
	})

	it('returns false if the coordinates are outside the character bounds', async () => {
		const character = await getFirstRecord(characters)

		const isClicked = await CharacterModel.click({
			id: character.id,
			x: character.maxX + 10,
			y: character.maxY + 10,
		})

		expect(isClicked).toBe(false)
	})
})
