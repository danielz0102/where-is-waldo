import { useState } from 'react'
import { normalizeCoordinates } from '~/lib/normalize-coordinates'
import type { Character } from '~/types'
import CanvasItem from '~components/canvas-item'
import Marker from '~components/marker'
import Scenario from '~components/scenario'
import TargetBox from '~components/target-box'
import TargetMenu from '~components/target-menu'
import { useActiveCharacters } from '~hooks/use-active-characters'
import { useCanvasClick } from '~hooks/use-canvas-click'
import { useScenarioQuery } from '~hooks/use-scenario-query'
import { checkClick } from '~services/characters-service'

export default function Level({ name }: { name: string }) {
	const { data, isLoading } = useScenarioQuery(name)
	const { x, y, toggle, canvasRect, handleCanvasClick } = useCanvasClick()
	const [showMenu, setShowMenu] = useState(toggle)
	const { activeCharacters, setActiveCharacters } = useActiveCharacters(
		data?.characters
	)
	const [markers, setMarkers] = useState<
		{ x: number; y: number; ok: boolean }[]
	>([])

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
			setShowMenu(false)
		}

		setMarkers((prev) => [...prev, { x, y, ok: hasBeenClicked }])
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
					<TargetMenu
						characters={activeCharacters}
						onSelection={handleCharacterSelection}
					/>
				</CanvasItem>

				{markers.map(({ ok, x, y }) => (
					//TODO: Fix key
					<CanvasItem key={`${x}-${y}-${ok}`} x={x} y={y} show={true}>
						<Marker ok={ok} />
					</CanvasItem>
				))}
			</>
		)
	}
}
