import { useCanvasClickStore } from '~/stores/use-canvas-click-store'
import type { Scenario as ScenarioType } from '~/types'

interface ScenarioProps {
	data: ScenarioType
	children: React.ReactNode
}

export default function Scenario({ data, children }: ScenarioProps) {
	const click = useCanvasClickStore((state) => state.click)

	const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
		click(e)
	}

	return (
		<div className="relative size-full">
			<canvas
				role="img"
				aria-label={data.name}
				className="mx-auto size-full cursor-crosshair bg-cover"
				onClick={handleClick}
				style={{
					backgroundImage: `url(${data.imgUrl})`,
				}}
			/>
			{children}
		</div>
	)
}
