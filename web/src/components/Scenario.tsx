import { useState } from 'react'
import { useCanvasClick } from '~/hooks/useCanvasClick'
import type { Character, Scenario as ScenarioType } from '~/types'
import CanvasItem from './CanvasItem'
import TargetBox from './TargetBox'
import TargetsMenu from './TargetsMenu'

interface ScenarioProps {
	data: ScenarioType & { characters: Character[] }
}

export default function Scenario({ data }: ScenarioProps) {
	const [clickEvent, setClickEvent] =
		useState<React.MouseEvent<HTMLCanvasElement> | null>(null)

	const { x, y, toggle } = useCanvasClick(clickEvent)

	return (
		<>
			<canvas
				role="img"
				aria-label="Where's Waldo scenario"
				onClick={(e) => setClickEvent(e)}
				className="mx-auto size-full cursor-crosshair bg-cover"
				style={{
					backgroundImage: `url(${data.imgUrl})`,
				}}
			/>
			<CanvasItem x={x} y={y} show={toggle}>
				<TargetBox />
			</CanvasItem>
			<CanvasItem x={x + 100} y={y} show={toggle}>
				<TargetsMenu characters={data.characters} />
			</CanvasItem>
		</>
	)
}
