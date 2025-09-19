import axios from 'axios'
import { API_URL } from '~/config'
import type { Character } from '~/types'

export async function getCharactersFromScenario(
	id: string
): Promise<Character[]> {
	const { data } = await axios.get<Character[]>(
		`${API_URL}/api/characters?scenarioId=${id}`
	)

	return data
}
