import { HttpResponse, http } from 'msw'
import { API_URL } from '~/config'
import { getAllScenarios } from '~/services/getAllScenarios'
import { server } from '../mocks/node'

test('returns an array on success', async () => {
	const result = await getAllScenarios()

	expect(result).toEqual([])
})

test('throws an error when the API fails', async () => {
	server.use(
		http.get(`${API_URL}/api/scenarios/`, () => {
			return HttpResponse.json(
				{ message: 'Internal Server Error' },
				{ status: 500 }
			)
		})
	)

	const result = getAllScenarios()

	await expect(result).rejects.toThrow()
})
