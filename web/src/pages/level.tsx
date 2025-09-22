import { useEffect, useState } from 'react'
import { normalizeCoordinates } from '~/lib/normalize-coordinates'
import type { Character } from '~/types'
import CanvasItem from '~components/canvas-item'
import Scenario from '~components/scenario'
import TargetBox from '~components/target-box'
import TargetsMenu from '~components/targets-menu'
import { useCanvasClick } from '~hooks/use-canvas-click'
import { useScenario } from '~hooks/use-scenario'
import { checkClick } from '~services/characters-service'

export default function Level({ name }: { name: string }) {
	const { x, y, toggle, canvasRect, handleCanvasClick } = useCanvasClick()
	const { data, isLoading } = useScenario(name)
	const [activeCharacters, setActiveCharacters] = useState<Character[]>([])

	useEffect(() => {
		if (data?.characters) {
			setActiveCharacters(data.characters)
		}
	}, [data])

	const handleCharacterSelection = async ({ id }: Character) => {
		if (!canvasRect) {
			throw new Error('There is no canvas rect')
		}

		const { x: normX, y: normY } = normalizeCoordinates({
			x,
			y,
			width: canvasRect.width,
			height: canvasRect.height,
		})
		const hasBeenClicked = await checkClick({ id, x: normX, y: normY })

		if (hasBeenClicked) {
			setActiveCharacters((prev) => prev.filter((char) => char.id !== id))
		}
	}

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (data) {
		return (
			<>
				<Scenario data={data} onClick={handleCanvasClick} />
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
