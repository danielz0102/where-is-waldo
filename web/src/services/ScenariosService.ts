import { apiClient } from '~/api/apiClient'
import type { Scenario } from '~/types'

export async function getAll(): Promise<Scenario[]> {
	const { data } = await apiClient.get<Scenario[]>('scenarios')

	return data
}

export async function getByName(name: string): Promise<Scenario | null> {
	const { data } = await apiClient.get<Scenario[]>(`scenarios?name=${name}`)

	return data.length > 0 ? data[0] : null
}
