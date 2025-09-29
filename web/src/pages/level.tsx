import { useEffect } from 'react'
import Scenario from '~/components/scenario'
import TargetBox from '~/components/target-box'
import { characterStore } from '~/stores/character-store'
import CharacterMenu from '~components/character-menu'
import { useScenarioQuery } from '~hooks/use-scenario-query'

export default function Level({ name }: { name: string }) {
	const { data, isLoading } = useScenarioQuery(name)
	const initializeCharacters = characterStore((state) => state.update)
	const charactersLeft = characterStore((state) => state.characters)

	useEffect(() => {
		if (data?.characters) {
			initializeCharacters(data.characters)
		}
	}, [data?.characters, initializeCharacters])

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (data) {
		return (
			<Scenario.Root data={data}>
				<Scenario.Item hiddenOnToggle>
					<TargetBox />
				</Scenario.Item>
				<Scenario.Item x={100} hiddenOnToggle>
					<CharacterMenu characters={charactersLeft} onSelect={() => {}} />
				</Scenario.Item>
			</Scenario.Root>
		)
	}
}
