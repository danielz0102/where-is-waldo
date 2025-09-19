import { useState } from 'react'
import type { Character, Scenario as ScenarioObj } from '~/types'
import { checkClick } from '~services/checkClick'
import TargetBox from './TargetBox'
import TargetsMenu from './TargetsMenu'

export default function Scenario({
	data,
}: {
	data: ScenarioObj & { characters: Character[] }
}) {
	const [activeCharacters, setActiveCharacters] = useState<Character[]>(
		data.characters
	)
	const [clickData, setClickData] = useState({
		show: false,
		x: 0,
		y: 0,
		normalizedX: 0,
		normalizedY: 0,
	})

	const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
		const canvas = event.currentTarget
		const rect = canvas.getBoundingClientRect()
		const normalizedX = ((event.clientX - rect.left) / rect.width) * 100
		const normalizedY = ((event.clientY - rect.top) / rect.height) * 100

		setClickData(({ show }) => ({
			show: !show,
			x: event.clientX,
			y: event.clientY,
			normalizedX,
			normalizedY,
		}))
	}

	const handleSelection = async (character: Character) => {
		setClickData((data) => ({ ...data, show: false }))

		const isCorrect = await checkClick({
			id: character.id,
			x: clickData.normalizedX,
			y: clickData.normalizedY,
		})

		if (isCorrect) {
			setActiveCharacters((chars) => {
				return chars.filter((c) => c.id !== character.id)
			})
		}
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
						<TargetsMenu
							characters={activeCharacters}
							onCharacterSelected={handleSelection}
						/>
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
