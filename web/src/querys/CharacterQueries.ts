import { useQuery } from '@tanstack/react-query'
import { useAsyncCallback } from 'react-async-hook'
import CharacterService from '~services/CharacterService'

export default { useGetByScenarioQuery, useClickCallback }

function useGetByScenarioQuery(scenarioId: string) {
	return useQuery({
		queryKey: ['characters', 'scenario', scenarioId],
		queryFn: () => CharacterService.getByScenario(scenarioId),
		refetchOnWindowFocus: false,
	})
}

function useClickCallback() {
	return useAsyncCallback(CharacterService.checkClick)
}
