import type { Character } from '~/types'
import { httpClient } from './http-client'

interface CheckClickParams {
	id: string
	x: number
	y: number
}

export async function checkClick(params: CheckClickParams): Promise<boolean> {
	const { data } = await httpClient.get<boolean>(
		`characters/${params.id}/click?x=${params.x}&y=${params.y}`
	)

	return data
}

export async function getByScenario(id: string): Promise<Character[]> {
	const { data } = await httpClient.get<Character[]>(
		`characters?scenarioId=${id}`
	)

	return data
}
