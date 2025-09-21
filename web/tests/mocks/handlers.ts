import { HttpResponse, http } from 'msw'
import { API_URL } from '~/config'
import characters from './characters'
import scenarios from './scenarios'

export const handlers = [
	http.get(`${API_URL}/api/characters/:id/click`, () => {
		return HttpResponse.json(true)
	}),
	http.get(`${API_URL}/api/scenarios`, ({ request }) => {
		const url = new URL(request.url)
		const name = url.searchParams.get('name')

		if (name) {
			const filteredScenarios = scenarios.filter((s) => s.name === name)
			return HttpResponse.json(filteredScenarios)
		}

		return HttpResponse.json(scenarios)
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
