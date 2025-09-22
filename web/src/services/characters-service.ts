import type { Character } from '~/types'
import { httpClient } from './http-client'

export async function checkClick({
	id,
	x,
	y,
}: {
	id: string
	x: number
	y: number
}): Promise<boolean> {
	const { data } = await httpClient.get<boolean>(
		`characters/${id}/click?x=${x}&y=${y}`
	)

	return data
}

export async function getByScenario(id: string): Promise<Character[]> {
	const { data } = await httpClient.get<Character[]>(
		`characters?scenarioId=${id}`
	)

	return data
}
