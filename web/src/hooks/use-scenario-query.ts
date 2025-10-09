import { useQuery } from '@tanstack/react-query'
import { getByScenario } from '~services/characters-service'
import ScenarioService from '~services/ScenarioService'

export function useScenarioQuery(name: string) {
	return useQuery({
		queryKey: ['scenario', name],
		queryFn: async () => {
			const scenario = await ScenarioService.getByName(name)

			if (!scenario) {
				throw new Error(`${name} scenario not found`)
			}

			const characters = await getByScenario(scenario.id)

			return { ...scenario, characters }
		},
		refetchOnWindowFocus: false,
	})
}
