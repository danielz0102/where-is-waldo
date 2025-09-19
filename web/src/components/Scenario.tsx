import { useState } from 'react'
import type { Character, Scenario as ScenarioObj } from '~/types'
import TargetBox from './TargetBox'
import TargetsMenu from './TargetsMenu'

export default function Scenario({
	data,
}: {
	data: ScenarioObj & { characters: Character[] }
}) {
	const [clickData, setClickData] = useState({ show: false, x: 0, y: 0 })

	const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
		const canvas = event.currentTarget
		const rect = canvas.getBoundingClientRect()
		const x = ((event.clientX - rect.left) / rect.width) * 100
		const y = ((event.clientY - rect.top) / rect.height) * 100

		console.log({ x, y })

		setClickData(({ show }) => ({
			show: !show,
			x: event.clientX,
			y: event.clientY,
		}))
	}

	return (
		<>
			<canvas
				role="img"
				aria-label="Where's Waldo scenario"
				onClick={handleClick}
				className="mx-auto size-full cursor-crosshair bg-cover"
				style={{
					backgroundImage: `url(${data.imgUrl})`,
				}}
			/>
			{clickData.show && (
				<>
					<CanvasItem x={clickData.x + 100} y={clickData.y}>
						<TargetsMenu characters={data.characters} />
					</CanvasItem>
					<CanvasItem x={clickData.x} y={clickData.y}>
						<TargetBox />
					</CanvasItem>
				</>
			)}
		</>
	)
}

interface CanvasItemProps {
	x: number
	y: number
	children: React.ReactNode
}

function CanvasItem({ x, y, children }: CanvasItemProps) {
	return (
		<div
			style={{ position: 'absolute', top: `${y}px`, left: `${x}px` }}
			className="-translate-x-1/2 -translate-y-1/2 transform"
		>
			{children}
		</div>
	)
}
