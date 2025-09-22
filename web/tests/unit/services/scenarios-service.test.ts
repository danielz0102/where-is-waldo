import { HttpResponse, http } from 'msw'
import { API_URL } from '~/config'
import { getAll, getByName } from '~services/scenarios-service'
import { server } from '~tests/mocks/node'
import scenarios from '~tests/mocks/scenarios'

describe('getAll', () => {
	it('returns an array on success', async () => {
		const result = await getAll()

		expect(result).toEqual(scenarios)
	})

	it('throws an error when the API fails', async () => {
		server.use(
			http.get(`${API_URL}/api/scenarios`, () => {
				return HttpResponse.json(
					{ message: 'Internal Server Error' },
					{ status: 500 }
				)
			})
		)

		const result = getAll()

		await expect(result).rejects.toThrow()
	})
})

describe('getByName', () => {
	it('returns a scenario when found', async () => {
		const result = await getByName(scenarios[0].name)

		expect(result).toEqual(scenarios[0])
	})

	it('returns null when not found', async () => {
		const result = await getByName('Nonexistent Scenario')

		expect(result).toBeNull()
	})

	it('throws an error when the API fails', async () => {
		server.use(
			http.get(`${API_URL}/api/scenarios`, () => {
				return HttpResponse.json(
					{ message: 'Internal Server Error' },
					{ status: 500 }
				)
			})
		)

		const result = getByName('Any Name')

		await expect(result).rejects.toThrow()
	})
})
