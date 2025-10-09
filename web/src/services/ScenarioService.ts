import type { Scenario } from '~/types'
import HTTPClient from './HTTPClient'

export default {
	getAll,
	getById,
	getByName,
}

async function getAll(): Promise<Scenario[]> {
	const { data } = await HTTPClient.get<Scenario[]>('scenarios')
	return data
}

async function getById(id: number): Promise<Scenario> {
	const { data } = await HTTPClient.get<Scenario>(`scenarios/${id}`)
	return data
}

async function getByName(name: string): Promise<Scenario | null> {
	const { data } = await HTTPClient.get<Scenario[]>(`scenarios?name=${name}`)
	return data.length > 0 ? data[0] : null
}
