import type { Character } from '~/db/schema'
import scenariosCollection from '~tests/mocks/scenariosCollection'

const firstScenario = scenariosCollection[0]
const secondScenario = scenariosCollection[1]

if (!firstScenario || !secondScenario) {
	throw new Error('Scenarios collection must have at least two scenarios')
}

const collection: Character[] = [
	{
		id: crypto.randomUUID(),
		name: 'Waldo',
		imgUrl: 'https://waldo.com/waldo.png',
		maxX: 100,
		maxY: 200,
		minX: 50,
		minY: 100,
		scenarioId: firstScenario.id,
	},
	{
		id: crypto.randomUUID(),
		name: 'Wenda',
		imgUrl: 'https://waldo.com/wenda.png',
		maxX: 150,
		maxY: 250,
		minX: 100,
		minY: 150,
		scenarioId: firstScenario.id,
	},
	{
		id: crypto.randomUUID(),
		name: 'Waldo',
		imgUrl: 'https://waldo.com/waldo.png',
		maxX: 100,
		maxY: 200,
		minX: 50,
		minY: 100,
		scenarioId: secondScenario.id,
	},
	{
		id: crypto.randomUUID(),
		name: 'Wenda',
		imgUrl: 'https://waldo.com/wenda.png',
		maxX: 150,
		maxY: 250,
		minX: 100,
		minY: 150,
		scenarioId: secondScenario.id,
	},
]

export default collection
