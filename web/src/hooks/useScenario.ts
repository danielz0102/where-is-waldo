import { useQuery } from '@tanstack/react-query'
import { getByScenario } from '~services/CharactersService'
import { getByName } from '~services/ScenariosService'

export function useScenario(name: string) {
	return useQuery({
		queryKey: ['scenario'],
		queryFn: async () => {
			const scenario = await getByName(name)

			if (!scenario) {
				throw new Error(`${name} scenario not found`)
			}

			const characters = await getByScenario(scenario.id)

			return { ...scenario, characters }
		},
		refetchOnWindowFocus: false,
	})
}
