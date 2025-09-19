import axios from 'axios'
import { API_URL } from '~/config'
import type { Scenario } from '~/types'

export async function getAllScenarios(): Promise<Scenario[]> {
	const { data } = await axios.get<Scenario[]>(`${API_URL}/api/scenarios/`)

	return data
}
