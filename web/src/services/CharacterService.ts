import type { Character } from '~/types'
import HTTPClient from './HTTPClient'

export default {
	checkClick,
	getByScenario,
}

interface CheckClickParams {
	id: string
	x: number
	y: number
}

async function checkClick(params: CheckClickParams): Promise<boolean> {
	const { data } = await HTTPClient.get<boolean>(
		`characters/${params.id}/click?x=${params.x}&y=${params.y}`
	)

	return data
}

async function getByScenario(id: string): Promise<Character[]> {
	const { data } = await HTTPClient.get<Character[]>(
		`characters?scenarioId=${id}`
	)

	return data
}
