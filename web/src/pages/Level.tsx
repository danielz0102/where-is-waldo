import { useEffect, useState } from 'react'
import { useCanvasClick } from '~/hooks/useCanvasClick'
import { useScenario } from '~/hooks/useScenario'
import type { Character } from '~/types'
import CanvasItem from '~components/CanvasItem'
import Scenario from '~components/Scenario'
import TargetBox from '~components/TargetBox'
import TargetsMenu from '~components/TargetsMenu'

type ClickEvent = React.MouseEvent<HTMLCanvasElement> | null

export default function Level() {
	const [clickEvent, setClickEvent] = useState<ClickEvent>(null)
	const { x, y, toggle } = useCanvasClick(clickEvent)
	const { data, isLoading } = useScenario('Beach')
	const [activeCharacters, setActiveCharacters] = useState<Character[]>([])

	useEffect(() => {
		if (data?.characters) {
			setActiveCharacters(data.characters)
		}
	}, [data])

	const handleCharacterSelection = (character: Character) => {
		console.log({ selected: character })
	}

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (data) {
		return (
			<>
				<Scenario data={data} onClick={(e) => setClickEvent(e)} />
				<CanvasItem x={x} y={y} show={toggle}>
					<TargetBox />
				</CanvasItem>
				<CanvasItem x={x + 100} y={y} show={toggle}>
					<TargetsMenu
						characters={activeCharacters}
						onSelection={handleCharacterSelection}
					/>
				</CanvasItem>
			</>
		)
	}
}
