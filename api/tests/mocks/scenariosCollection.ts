import type { Scenario } from '~/db/schema'

const scenariosCollection: Scenario[] = [
	{
		id: crypto.randomUUID(),
		name: 'Find Waldo in the Park',
		imgUrl: 'https://example.com/scenario1.jpg',
	},
	{
		id: crypto.randomUUID(),
		name: 'Locate Waldo at the Beach',
		imgUrl: 'https://example.com/scenario2.jpg',
	},
	{
		id: crypto.randomUUID(),
		name: 'Spot Waldo in the City',
		imgUrl: 'https://example.com/scenario3.jpg',
	},
]

export default scenariosCollection
