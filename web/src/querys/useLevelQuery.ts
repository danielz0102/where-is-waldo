import { useQuery } from '@tanstack/react-query'
import CharacterService from '~services/CharacterService'
import ScenarioService from '~services/ScenarioService'

export function useLevelQuery(id: string) {
	return useQuery({
		queryKey: ['level', id],
		queryFn: async () => {
			const scenario = await ScenarioService.getById(id)
			const characters = await CharacterService.getByScenario(scenario.id)
			return { scenario, characters }
		},
		refetchOnWindowFocus: false,
	})
}
