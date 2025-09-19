import { HttpResponse, http } from 'msw'
import { API_URL } from '~/config'
import characters from './characters'

export const handlers = [
	http.get(`${API_URL}/api/characters/:id/click`, () => {
		return HttpResponse.json(true)
	}),
	http.get(`${API_URL}/api/scenarios`, () => {
		return HttpResponse.json([])
	}),
	http.get(`${API_URL}/api/characters`, ({ request }) => {
		const url = new URL(request.url)
		const scenarioId = url.searchParams.get('scenarioId')

		if (scenarioId) {
			return HttpResponse.json(
				characters.filter((c) => c.scenarioId === scenarioId)
			)
		}

		return HttpResponse.json(characters)
	}),
]
