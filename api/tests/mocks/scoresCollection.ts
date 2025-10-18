import type { Score } from '~/db/schema'
import scenariosCollection from './scenariosCollection'

const collection: Score[] = scenariosCollection.flatMap((scenario) => {
	return [
		{
			id: crypto.randomUUID(),
			username: `player1 of ${scenario.name}`,
			time: '00:01:30',
			scenarioId: scenario.id,
		},
		{
			id: crypto.randomUUID(),
			username: `player2 of ${scenario.name}`,
			time: '00:02:00',
			scenarioId: scenario.id,
		},
		{
			id: crypto.randomUUID(),
			username: `player3 of ${scenario.name}`,
			time: '00:01:45',
			scenarioId: scenario.id,
		},
	]
})

export default collection
