import type { Character } from '~/db/schema'

const collection: Character[] = [
	{
		id: '1',
		name: 'Waldo',
		maxX: 100,
		maxY: 200,
		minX: 50,
		minY: 100,
		scenarioId: '1',
	},
	{
		id: '2',
		name: 'Wenda',
		maxX: 150,
		maxY: 250,
		minX: 100,
		minY: 150,
		scenarioId: '1',
	},
	{
		id: '3',
		name: 'Waldo',
		maxX: 100,
		maxY: 200,
		minX: 50,
		minY: 100,
		scenarioId: '2',
	},
	{
		id: '4',
		name: 'Wenda',
		maxX: 150,
		maxY: 250,
		minX: 100,
		minY: 150,
		scenarioId: '2',
	},
]

export default collection
