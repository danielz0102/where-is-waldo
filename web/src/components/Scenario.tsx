import { useEffect, useRef } from 'react'
import { useLevelStore } from '~/stores/levelStore'
import type { Scenario as ScenarioType } from '~/types'

export default {
	Root: Scenario,
	ClickItem: ScenarioClickItem,
	Header: ScenarioHeader,
}

interface ScenarioProps {
	data: ScenarioType
	children: React.ReactNode[]
}

function Scenario({ data, children }: ScenarioProps) {
	const handleClick = useLevelStore((state) => state.handleClick)
	const startTimer = useLevelStore((state) => state.resume)
	const imgRef = useRef<HTMLImageElement>(null)

	useEffect(() => {
		if (imgRef.current?.complete) {
			startTimer()
		}
	}, [imgRef.current?.complete])

	return (
		<main className="overflow-auto">
			<div className="relative size-fit overflow-hidden">
				{/* * biome-ignore lint/a11y/useKeyWithClickEvents: Precise mouse coordinates are needed */}
				<img
					ref={imgRef}
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

function ScenarioHeader({ children }: { children: React.ReactNode }) {
	return (
		<div className="fixed top-4 left-4 flex items-center gap-4">{children}</div>
	)
}
