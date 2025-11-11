import { useMutation, useQuery } from '@tanstack/react-query'
import type { Score } from '~/types'
import { isTop10 } from '~/useCases/isTop10'
import ScoreService from '~services/ScoreService'

export default {
	useGetTop10ScoresQuery,
	useRegisterScoreMutation,
	useIsTop10Query,
}

function useGetTop10ScoresQuery(scenarioSlug: string) {
	return useQuery({
		queryKey: ['top10Scores', scenarioSlug],
		queryFn: () => ScoreService.getTop10ByScenario(scenarioSlug),
	})
}

function useIsTop10Query(scenarioId: string, seconds: number) {
	return useQuery({
		queryKey: ['isTop10', scenarioId, seconds],
		queryFn: () => isTop10(scenarioId, seconds),
		refetchOnWindowFocus: false,
		enabled: false,
	})
}

function useRegisterScoreMutation() {
	return useMutation({
		mutationFn: (data: Omit<Score, 'id'>) => ScoreService.registerScore(data),
	})
}
