import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import ScenarioService from '~services/ScenarioService'
import ScoreService from '~services/ScoreService'

export function useLeaderboardQuery(scenarioSlug: string) {
	return useQuery({
		queryKey: ['leaderboard', scenarioSlug],
		queryFn: async () => {
			const scenario = await ScenarioService.getBySlug(scenarioSlug)
			const scores = await ScoreService.getTop10ByScenario(scenarioSlug)
			return { scenario, scores }
		},
		throwOnError(error) {
			return error instanceof axios.AxiosError && error.status === 404
		},
	})
}
