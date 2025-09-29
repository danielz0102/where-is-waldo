import { useState } from 'react'
import type { Scenario as ScenarioType } from '~/types'

interface ScenarioProps {
	data: ScenarioType
	children: (click: ClickState) => React.ReactNode
}

interface ClickState {
	x: number
	y: number
	normX: number
	normY: number
	toggle: boolean
}

function Scenario({ data, children }: ScenarioProps) {
	const [click, setClick] = useState<ClickState>({
		x: 0,
		y: 0,
		normX: 0,
		normY: 0,
		toggle: false,
	})

	const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
		const rect = e.currentTarget.getBoundingClientRect()
		const x = e.clientX - rect.left
		const y = e.clientY - rect.top

		const normX = (x / rect.width) * 100
		const normY = (y / rect.height) * 100

		setClick({ x, y, normX, normY, toggle: !click.toggle })
	}

	return (
		<main className="relative cursor-crosshair select-none overflow-auto md:overflow-visible">
			{/** biome-ignore lint/a11y/useKeyWithClickEvents: Precise mouse coordinates are needed */}
			<img
				src={data.imgUrl}
				alt={data.name}
				onClick={handleClick}
				className="max-w-none lg:max-w-full"
			/>
			{children(click)}
		</main>
	)
}

interface ScenarioItemProps {
	x: number
	y: number
	hidden?: boolean
	children: React.ReactNode
}

function ScenarioItem(props: ScenarioItemProps) {
	return (
		<div
			className="-translate-x-1/2 -translate-y-1/2 transform"
			hidden={props.hidden}
			style={{
				position: 'absolute',
				top: `${props.y}px`,
				left: `${props.x}px`,
			}}
		>
			{props.children}
		</div>
	)
}

export default {
	Root: Scenario,
	Item: ScenarioItem,
}
