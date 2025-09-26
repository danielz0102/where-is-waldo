import CharacterMenu from '~/components/character-menu'
import Scenario from '~/components/scenario'
import TargetBox from '~/components/target-box'
import MarkerStack from '~components/marker-stack'
import ScoreTimer from '~components/score-timer'
import WinnerModal from '~components/winner-modal'
import { useScenarioQuery } from '~hooks/use-scenario-query'

export default function Level({ name }: { name: string }) {
	const { data, isLoading } = useScenarioQuery(name)

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (data) {
		return (
			<Scenario data={data}>
				<TargetBox />
				<CharacterMenu characters={data.characters} />
				<MarkerStack />
				<ScoreTimer />
			</Scenario>
		)
	}
}
