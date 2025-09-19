import type { Character } from '~/types'

export default [
	{
		id: crypto.randomUUID(),
		name: 'Waldo',
		imgUrl: 'https://waldo.com/waldo.png',
		maxX: 100,
		maxY: 200,
		minX: 50,
		minY: 100,
		scenarioId: '1',
	},
	{
		id: crypto.randomUUID(),
		name: 'Wenda',
		imgUrl: 'https://waldo.com/wenda.png',
		maxX: 150,
		maxY: 250,
		minX: 100,
		minY: 150,
		scenarioId: '1',
	},
	{
		id: crypto.randomUUID(),
		name: 'Wizard',
		imgUrl: 'https://waldo.com/wizard.png',
		maxX: 100,
		maxY: 200,
		minX: 50,
		minY: 100,
		scenarioId: '2',
	},
	{
		id: crypto.randomUUID(),
		name: 'Odlaw',
		imgUrl: 'https://waldo.com/odlaw.png',
		maxX: 150,
		maxY: 250,
		minX: 100,
		minY: 150,
		scenarioId: '2',
	},
] satisfies Character[]
