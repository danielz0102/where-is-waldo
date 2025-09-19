import { HttpResponse, http } from 'msw'
import { API_URL } from '~/config'
import { getCharactersFromScenario } from '~services/getCharactersFromScenario'
import characters from '../mocks/characters'
import { server } from '../mocks/node'

test('returns an array with characters from the scenario', async () => {
	const res = await getCharactersFromScenario('1')

	expect(res).toEqual(characters.filter((c) => c.scenarioId === '1'))
})

test('throws an error on failure', async () => {
	server.use(
		http.get(`${API_URL}/api/characters`, () => {
			return HttpResponse.json({ message: 'Error' }, { status: 400 })
		})
	)

	await expect(getCharactersFromScenario('1')).rejects.toThrow()
})
