import CharacterMenu from '~/components/character-menu'
import Scenario from '~/components/scenario'
import TargetBox from '~/components/target-box'
import { characterStore } from '~/stores/character-store'
import MarkerStack from '~components/marker-stack'
import ScoreTimer from '~components/score-timer'
import { useScenarioQuery } from '~hooks/use-scenario-query'

export default function Level({ name }: { name: string }) {
	const { data, isLoading } = useScenarioQuery(name)
	const initializeCharacters = characterStore((state) => state.update)

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (data) {
		initializeCharacters(data.characters)

		return (
			<Scenario data={data}>
				<TargetBox />
				<CharacterMenu />
				<MarkerStack />
				<ScoreTimer />
			</Scenario>
		)
	}
}
