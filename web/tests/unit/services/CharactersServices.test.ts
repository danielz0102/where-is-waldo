import { HttpResponse, http } from 'msw'
import { API_URL } from '~/config'
import { checkClick, getByScenario } from '~services/CharactersService'
import characters from '~tests/mocks/characters'
import { server } from '~tests/mocks/node'

describe('checkClick', () => {
	it('returns true when the API responds true', async () => {
		const result = await checkClick({ id: 'character-id', x: 100, y: 200 })

		expect(result).toEqual(true)
	})

	it('returns false when the API responds false', async () => {
		server.use(
			http.get(`${API_URL}/api/characters/:id/click`, () => {
				return HttpResponse.json(false)
			})
		)

		const result = await checkClick({ id: 'character-id', x: 100, y: 200 })

		expect(result).toEqual(false)
	})

	it('throws an error when the API responds with an error', async () => {
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
})

describe('getByScenario', () => {
	it('returns an array with characters from the scenario', async () => {
		const res = await getByScenario('1')

		expect(res).toEqual(characters.filter((c) => c.scenarioId === '1'))
	})

	it('throws an error on failure', async () => {
		server.use(
			http.get(`${API_URL}/api/characters`, () => {
				return HttpResponse.json({ message: 'Error' }, { status: 400 })
			})
		)

		await expect(getByScenario('1')).rejects.toThrow()
	})
})
