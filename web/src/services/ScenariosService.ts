import axios from 'axios'
import { API_URL } from '~/config'
import type { Scenario } from '~/types'

export async function getAll(): Promise<Scenario[]> {
	const { data } = await axios.get<Scenario[]>(`${API_URL}/api/scenarios/`)

	return data
}

export async function getByName(name: string): Promise<Scenario | null> {
	const { data } = await axios.get<Scenario[]>(
		`${API_URL}/api/scenarios?name=${name}`
	)

	return data.length > 0 ? data[0] : null
}
