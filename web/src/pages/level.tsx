import { useEffect } from 'react'
import Scenario from '~/components/scenario'
import TargetBox from '~/components/target-box'
import { characterStore } from '~/stores/character-store'
import { useScenarioQuery } from '~hooks/use-scenario-query'

export default function Level({ name }: { name: string }) {
	const { data, isLoading } = useScenarioQuery(name)
	const initializeCharacters = characterStore((state) => state.update)
	const charactersLeft = characterStore((state) => state.characters)
	const win = charactersLeft.length === 0

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
				{({ x, y, toggle }) => (
					<Scenario.Item x={x} y={y} hidden={!toggle}>
						<TargetBox />
					</Scenario.Item>
				)}
			</Scenario.Root>
		)
	}
}
