import type { Character } from '~/db/schema'

const collection: Character[] = [
	{
		id: crypto.randomUUID(),
		name: 'Waldo',
		maxX: 100,
		maxY: 200,
		minX: 50,
		minY: 100,
		scenarioId: '1',
	},
	{
		id: crypto.randomUUID(),
		name: 'Wenda',
		maxX: 150,
		maxY: 250,
		minX: 100,
		minY: 150,
		scenarioId: '1',
	},
	{
		id: crypto.randomUUID(),
		name: 'Waldo',
		maxX: 100,
		maxY: 200,
		minX: 50,
		minY: 100,
		scenarioId: '2',
	},
	{
		id: crypto.randomUUID(),
		name: 'Wenda',
		maxX: 150,
		maxY: 250,
		minX: 100,
		minY: 150,
		scenarioId: '2',
	},
]

export default collection
