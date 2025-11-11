import type { Score } from '~/types'
import HTTPClient from './HTTPClient'

export default {
	getTop10ByScenario,
	registerScore,
}

async function getTop10ByScenario(scenarioSlug: string): Promise<Score[]> {
	const { data } = await HTTPClient.get<Score[]>(`scores/${scenarioSlug}`)
	return data
}

async function registerScore(score: Omit<Score, 'id'>): Promise<Score> {
	const { data } = await HTTPClient.post<Score>('scores', score)
	return data
}
