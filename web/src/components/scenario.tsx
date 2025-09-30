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

const ClickContext = createContext<ClickState | null>(null)

function useClick() {
	const context = use(ClickContext)

	if (!context) {
		throw new Error('ClickContext value has not been provided')
	}

	return context
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

		setClick((prev) => ({ x, y, normX, normY, toggle: !prev.toggle }))
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

interface ScenarioClickItemProps {
	xOffset?: number
	yOffset?: number
	hiddenOnToggle?: boolean
	children: React.ReactNode
}

function ScenarioClickItem({
	xOffset = 0,
	yOffset = 0,
	hiddenOnToggle = false,
	children,
}: ScenarioClickItemProps) {
	const click = useClick()

	return (
		<div
			className="-translate-x-1/2 -translate-y-1/2 transform"
			hidden={hiddenOnToggle && !click.toggle}
			style={{
				position: 'absolute',
				top: `${click.y + yOffset}px`,
				left: `${click.x + xOffset}px`,
			}}
		>
			{children}
		</div>
	)
}

export default {
	Root: Scenario,
	ClickItem: ScenarioClickItem,
}
