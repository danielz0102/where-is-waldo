import { useQuery } from '@tanstack/react-query'
import CharacterService from '~services/CharacterService'
import ScenarioService from '~services/ScenarioService'

export function useLevelQuery(slug: string) {
	return useQuery({
		queryKey: ['level', slug],
		queryFn: async () => {
			const scenario = await ScenarioService.getBySlug(slug)
			const characters = await CharacterService.getByScenario(scenario.id)

			await new Promise((resolve) => setTimeout(resolve, 2000))

			return { scenario, characters }
		},
		refetchOnWindowFocus: false,
	})
}
