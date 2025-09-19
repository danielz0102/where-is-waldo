import { useQuery } from '@tanstack/react-query'
import { getAllScenarios } from '~services/getAllScenarios'
import { getCharactersFromScenario } from '~services/getCharactersFromScenario'

export function useScenario(name: string) {
	return useQuery({
		queryKey: ['scenario'],
		queryFn: async () => {
			const scenarios = await getAllScenarios()
			const mainScenario = scenarios.find((s) => s.name === name)

			if (!mainScenario) {
				throw new Error('Main scenario not found')
			}

			const characters = await getCharactersFromScenario(mainScenario.id)

			return { ...mainScenario, characters }
		},
		refetchOnWindowFocus: false,
	})
}
