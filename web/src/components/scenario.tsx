import { createContext, use, useState } from 'react'
import type { Scenario as ScenarioType } from '~/types'

interface ScenarioProps {
	data: ScenarioType
	children: React.ReactNode[]
}

interface ClickState {
	x: number
	y: number
	normX: number
	normY: number
	toggle: boolean
}

const ClickContext = createContext<ClickState>({
	x: 0,
	y: 0,
	normX: 0,
	normY: 0,
	toggle: false,
})

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
		<main className="overflow-auto">
			<div className="relative size-fit overflow-hidden">
				{/** biome-ignore lint/a11y/useKeyWithClickEvents: Precise mouse coordinates are needed */}
				<img
					src={data.imgUrl}
					alt={data.name}
					onClick={handleClick}
					className="max-w-none cursor-crosshair select-none md:max-w-full"
				/>
				<ClickContext value={click}>{children}</ClickContext>
			</div>
		</main>
	)
}

interface ScenarioItemProps {
	x?: number
	y?: number
	hiddenOnToggle?: boolean
	children: React.ReactNode
}

function ScenarioItem({
	x = 0,
	y = 0,
	hiddenOnToggle = false,
	children,
}: ScenarioItemProps) {
	const click = use(ClickContext)

	return (
		<div
			className="-translate-x-1/2 -translate-y-1/2 transform"
			hidden={hiddenOnToggle && !click.toggle}
			style={{
				position: 'absolute',
				top: `${click.y + y}px`,
				left: `${click.x + x}px`,
			}}
		>
			{children}
		</div>
	)
}

export default {
	Root: Scenario,
	Item: ScenarioItem,
}
