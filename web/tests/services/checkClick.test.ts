import { HttpResponse, http } from 'msw'
import { API_URL } from '~/config'
import { checkClick } from '~services/checkClick'
import { server } from '../mocks/node'

test('returns true when the API responds true', async () => {
	const result = await checkClick({ id: 'character-id', x: 100, y: 200 })

	expect(result).toEqual(true)
})

test('returns false when the API responds false', async () => {
	server.use(
		http.get(`${API_URL}/api/characters/:id/click`, () => {
			return HttpResponse.json(false)
		})
	)

	const result = await checkClick({ id: 'character-id', x: 100, y: 200 })

	expect(result).toEqual(false)
})

test('throws an error when the API responds with an error', async () => {
	server.use(
		http.get(`${API_URL}/api/characters/:id/click`, () => {
			return HttpResponse.json(
				{ message: 'Internal Server Error' },
				{ status: 500 }
			)
		})
	)

	const result = checkClick({ id: 'character-id', x: 100, y: 200 })

	await expect(result).rejects.toThrow()
})
