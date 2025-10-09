import { useEffect } from 'react'
import { useParams } from 'react-router'
import { useLevelQuery } from '~/querys/useLevelQuery'
import { characterStore } from '~/stores/character-store'
import CharacterMenu from '~components/character-menu'
import Scenario from '~components/scenario'
import TargetBox from '~components/target-box'

export default function Level() {
	const { id } = useParams<{ id: string }>()

	if (!id) {
		throw new Error('No id provided')
	}

	const { data, isLoading } = useLevelQuery(id)
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
			<Scenario.Root data={data.scenario}>
				<Scenario.ClickItem hiddenOnToggle>
					<TargetBox />
				</Scenario.ClickItem>
				<Scenario.ClickItem xOffset={100} hiddenOnToggle>
					<CharacterMenu characters={charactersLeft} onSelect={() => {}} />
				</Scenario.ClickItem>
			</Scenario.Root>
		)
	}
}
