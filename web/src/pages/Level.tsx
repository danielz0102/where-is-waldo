import { useParams } from 'react-router'
import { useLevelQuery } from '~/querys/useLevelQuery'
import CharacterMenu from '~components/CharacterMenu'
import Scenario from '~components/scenario'
import TargetBox from '~components/target-box'

export default function Level() {
	const { id } = useParams<{ id: string }>()

	if (!id) {
		throw new Error('No id provided')
	}

	const { data, isLoading } = useLevelQuery(id)

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (data) {
		return (
			<Scenario.Root data={data.scenario}>
				<Scenario.ClickItem hiddenOnToggle>
					<TargetBox />
				</Scenario.ClickItem>
				<Scenario.ClickItem xOffset={100} hiddenOnToggle>
					<CharacterMenu characters={data.characters} />
				</Scenario.ClickItem>
			</Scenario.Root>
		)
	}
}
