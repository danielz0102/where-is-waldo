import { useQuery } from '@tanstack/react-query'
import ScenarioService from '~services/ScenarioService'

export default { useGetAllQuery, useGetByIdQuery, useGetByNameQuery }

function useGetAllQuery() {
	return useQuery({
		queryKey: ['scenarios'],
		queryFn: ScenarioService.getAll,
		refetchOnWindowFocus: false,
	})
}

function useGetByIdQuery(id: string) {
	return useQuery({
		queryKey: ['scenario', id],
		queryFn: () => ScenarioService.getById(id),
		refetchOnWindowFocus: false,
	})
}

function useGetByNameQuery(name: string) {
	return useQuery({
		queryKey: ['scenario', name],
		queryFn: () => ScenarioService.getByName(name),
		refetchOnWindowFocus: false,
	})
}
