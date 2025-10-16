import type { Character } from '~/db/schema'
import { uuidIsValid } from '~/lib/uuidIsValid'
import { CharacterRepository as repo } from '~/repositories/CharacterRepository'

export const CharactersModel = {
	getAll,
	get,
	getAllFromScenario,
	click,
}

function getAll(): Promise<Character[]> {
	return repo.getAll()
}

async function get(id: string): Promise<Character | null> {
	if (!uuidIsValid(id)) {
		return null
	}

	return repo.getById(id)
}

function getAllFromScenario(id: string): Promise<Character[]> {
	return repo.getByScenarioId(id)
}

async function click({
	id,
	x,
	y,
}: {
	id: string
	x: number
	y: number
}): Promise<boolean> {
	if (!uuidIsValid(id)) {
		return false
	}

	const result = await repo.getByCoordinates({ id, x, y })
	return result.length > 0
}
