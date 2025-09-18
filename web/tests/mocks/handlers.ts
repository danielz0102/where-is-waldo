import { HttpResponse, http } from 'msw'
import { API_URL } from '~/config'

export const handlers = [
	http.get(`${API_URL}/api/characters/:id/click`, () => {
		return HttpResponse.json(true)
	}),
]
