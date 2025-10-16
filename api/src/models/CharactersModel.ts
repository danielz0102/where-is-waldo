import type { Character } from '~/db/schema'
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
	const result = await repo.getByCoordinates({ id, x, y })
	return result.length > 0
}
