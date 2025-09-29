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
				{({ x, y, toggle }) => [
					<Scenario.Item key="target" x={x} y={y} hidden={!toggle}>
						<TargetBox />
					</Scenario.Item>,
					<Scenario.Item key="menu" x={x + 100} y={y} hidden={!toggle}>
						<CharacterMenu characters={charactersLeft} onSelect={() => {}} />
					</Scenario.Item>,
				]}
			</Scenario.Root>
		)
	}
}
