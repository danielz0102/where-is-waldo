import { useMutation, useQuery } from '@tanstack/react-query'
import type { Score } from '~/types'
import ScoreService from '~services/ScoreService'

export default { useGetTop10ScoresQuery, useRegisterScoreMutation }

function useGetTop10ScoresQuery(scenarioId: string) {
	return useQuery({
		queryKey: ['top10Scores', scenarioId],
		queryFn: () => ScoreService.getTop10ByScenario(scenarioId),
		refetchOnWindowFocus: false,
	})
}

function useRegisterScoreMutation() {
	return useMutation({
		mutationFn: (data: Omit<Score, 'id'>) => ScoreService.registerScore(data),
	})
}
