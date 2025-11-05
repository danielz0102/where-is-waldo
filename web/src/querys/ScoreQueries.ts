import { useMutation, useQuery } from '@tanstack/react-query'
import type { Score } from '~/types'
import ScoreService from '~services/ScoreService'

export default {
	useGetTop10ScoresQuery,
	useRegisterScoreMutation,
	useIsTop10Query,
}

function useGetTop10ScoresQuery(scenarioId: string) {
	return useQuery({
		queryKey: ['top10Scores', scenarioId],
		queryFn: () => ScoreService.getTop10ByScenario(scenarioId),
	})
}

function useIsTop10Query(scenarioId: string, seconds: number) {
	return useQuery({
		queryKey: ['isTop10', scenarioId, seconds],
		queryFn: () => ScoreService.isTop10(scenarioId, seconds),
		refetchOnWindowFocus: false,
		enabled: false,
	})
}

function useRegisterScoreMutation() {
	return useMutation({
		mutationFn: (data: Omit<Score, 'id'>) => ScoreService.registerScore(data),
	})
}
