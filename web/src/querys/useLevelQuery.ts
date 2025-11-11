import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import CharacterService from '~services/CharacterService'
import ScenarioService from '~services/ScenarioService'

export function useLevelQuery(slug: string) {
	return useQuery({
		queryKey: ['level', slug],
		queryFn: async () => {
			const scenario = await ScenarioService.getBySlug(slug)
			const characters = await CharacterService.getByScenario(scenario.id)

			return { scenario, characters }
		},
		refetchOnWindowFocus: false,
		throwOnError(error) {
			return error instanceof axios.AxiosError && error.status === 404
		},
	})
}
