import { useLevelStore } from '~/stores/levelStore'
import type { Scenario as ScenarioType } from '~/types'

interface ScenarioProps {
	data: ScenarioType
	children: React.ReactNode[]
}

function Scenario({ data, children }: ScenarioProps) {
	const handleClick = useLevelStore((state) => state.handleClick)

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
				{children}
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
	const x = useLevelStore((state) => state.x)
	const y = useLevelStore((state) => state.y)
	const toggle = useLevelStore((state) => state.toggle)

	return (
		<div
			className="-translate-x-1/2 -translate-y-1/2 transform"
			hidden={hiddenOnToggle && !toggle}
			style={{
				position: 'absolute',
				top: `${y + yOffset}px`,
				left: `${x + xOffset}px`,
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
