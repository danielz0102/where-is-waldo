import { timeToSeconds } from '~/lib/timeUtils'
import ScoreService from '~/services/ScoreService'

export async function isTop10(
	scenarioId: string,
	seconds: number
): Promise<boolean> {
	const top10Scores = await ScoreService.getTop10ByScenario(scenarioId)

	if (top10Scores.length < 10) return true

	return top10Scores.some((score) => timeToSeconds(score.time) > seconds)
}
