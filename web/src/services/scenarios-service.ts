import type { Scenario } from '~/types'
import { httpClient } from './http-client'

export async function getAll(): Promise<Scenario[]> {
	const { data } = await httpClient.get<Scenario[]>('scenarios')

	return data
}

export async function getByName(name: string): Promise<Scenario | null> {
	const { data } = await httpClient.get<Scenario[]>(`scenarios?name=${name}`)

	return data.length > 0 ? data[0] : null
}
