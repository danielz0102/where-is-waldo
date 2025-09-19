import { useQuery } from '@tanstack/react-query'
import Scenario from '~components/Scenario'
import { getAllScenarios } from '~services/getAllScenarios'
import { getCharactersFromScenario } from '~services/getCharactersFromScenario'

export default function Level() {
	const { data, isLoading } = useQuery({
		queryKey: ['scenario'],
		queryFn: async () => {
			const scenarios = await getAllScenarios()
			const mainScenario = scenarios.find((s) => s.name === 'main')

			if (!mainScenario) {
				throw new Error('Main scenario not found')
			}

			const characters = await getCharactersFromScenario(mainScenario.id)

			return { ...mainScenario, characters }
		},
		refetchOnWindowFocus: false,
	})

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (data) {
		return <Scenario data={data} />
	}
}
