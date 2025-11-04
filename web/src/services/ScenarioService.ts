import type { Scenario } from '~/types'
import HTTPClient from './HTTPClient'

export default {
	getAll,
	getByName,
	getBySlug,
}

async function getAll(): Promise<Scenario[]> {
	const { data } = await HTTPClient.get<Scenario[]>('scenarios')
	return data
}

async function getByName(name: string): Promise<Scenario | null> {
	const { data } = await HTTPClient.get<Scenario[]>(`scenarios?name=${name}`)
	return data.length > 0 ? data[0] : null
}

async function getBySlug(slug: string): Promise<Scenario> {
	const { data } = await HTTPClient.get<Scenario>(`scenarios/${slug}`)
	return data
}
