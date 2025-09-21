import axios from 'axios'
import { API_URL } from '~/config'
import type { Character } from '~/types'

export async function checkClick({
	id,
	x,
	y,
}: {
	id: string
	x: number
	y: number
}): Promise<boolean> {
	const { data } = await axios.get<boolean>(
		`${API_URL}/api/characters/${id}/click?x=${x}&y=${y}`
	)

	return data
}

export async function getByScenario(id: string): Promise<Character[]> {
	const { data } = await axios.get<Character[]>(
		`${API_URL}/api/characters?scenarioId=${id}`
	)

	return data
}
