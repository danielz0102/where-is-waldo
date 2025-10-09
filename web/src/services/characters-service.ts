import type { Character } from '~/types'
import HTTPClient from './HTTPClient'

interface CheckClickParams {
	id: string
	x: number
	y: number
}

export async function checkClick(params: CheckClickParams): Promise<boolean> {
	const { data } = await HTTPClient.get<boolean>(
		`characters/${params.id}/click?x=${params.x}&y=${params.y}`
	)

	return data
}

export async function getByScenario(id: string): Promise<Character[]> {
	const { data } = await HTTPClient.get<Character[]>(
		`characters?scenarioId=${id}`
	)

	return data
}
