import { apiClient } from '~/api/apiClient'
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
	const { data } = await apiClient.get<boolean>(
		`characters/${id}/click?x=${x}&y=${y}`
	)

	return data
}

export async function getByScenario(id: string): Promise<Character[]> {
	const { data } = await apiClient.get<Character[]>(
		`characters?scenarioId=${id}`
	)

	return data
}
