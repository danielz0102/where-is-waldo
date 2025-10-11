import { useQuery } from '@tanstack/react-query'
import CharacterService from '~services/CharacterService'

export default { useGetByScenarioQuery }

function useGetByScenarioQuery(scenarioId: string) {
	return useQuery({
		queryKey: ['characters', 'scenario', scenarioId],
		queryFn: () => CharacterService.getByScenario(scenarioId),
		refetchOnWindowFocus: false,
	})
}
