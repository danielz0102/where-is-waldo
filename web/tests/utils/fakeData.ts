import { faker } from '@faker-js/faker'
import type { Character, Scenario, Score } from '~/types'

export const createRandomCharacter = (): Character => ({
	id: faker.string.uuid(),
	name: faker.lorem.words({ min: 1, max: 5 }),
	imgUrl: faker.image.url(),
	scenarioId: faker.string.uuid(),
	minX: faker.number.int({ min: 0, max: 199 }),
	maxX: faker.number.int({ min: 200, max: 400 }),
	minY: faker.number.int({ min: 0, max: 199 }),
	maxY: faker.number.int({ min: 200, max: 400 }),
})

export const createRandomScenario = (): Scenario => ({
	id: faker.string.uuid(),
	name: faker.lorem.words({ min: 1, max: 5 }),
	imgUrl: faker.image.url(),
})

export const createRandomScore = (): Score => ({
	id: faker.string.uuid(),
	username: faker.internet.username(),
	time: faker.helpers.replaceSymbols('00:0#:##'),
	scenarioId: faker.string.uuid(),
})

export const createRandomCharacters = () =>
	createMultiple(createRandomCharacter)
export const createRandomScenarios = () => createMultiple(createRandomScenario)
export const createRandomScores = () => createMultiple(createRandomScore)

type Count =
	| number
	| {
			min: number
			max: number
	  }
	| undefined

const createMultiple = <T>(
	creator: () => T,
	count: Count = { min: 10, max: 30 }
): T[] => {
	return faker.helpers.multiple(creator, {
		count,
	})
}
