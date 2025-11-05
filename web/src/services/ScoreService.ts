import { timeToMs } from '~/lib/timeUtils'
import type { Score } from '~/types'
import HTTPClient from './HTTPClient'

export default {
	getTop10ByScenario,
	registerScore,
	isTop10,
}

async function getTop10ByScenario(scenarioId: string): Promise<Score[]> {
	const { data } = await HTTPClient.get<Score[]>(`scores/${scenarioId}`)
	return data
}

async function registerScore(score: Omit<Score, 'id'>): Promise<Score> {
	const { data } = await HTTPClient.post<Score>('scores', score)
	return data
}

async function isTop10(scenarioId: string, seconds: number): Promise<boolean> {
	const top10Scores = await getTop10ByScenario(scenarioId)

	if (top10Scores.length < 10) return true

	return top10Scores.some((score) => timeToMs(score.time) > seconds * 1000)
}
