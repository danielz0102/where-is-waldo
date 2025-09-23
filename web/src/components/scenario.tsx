import { useCanvasClick } from '~hooks/use-canvas-click'
import type { Scenario as ScenarioType } from '~/types'

interface ScenarioProps {
	data: ScenarioType
}

export default function Scenario({ data }: ScenarioProps) {
	const click = useCanvasClick((state) => state.click)

	const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
		click(e)
	}

	return (
		<canvas
			role="img"
			aria-label={data.name}
			className="mx-auto size-full cursor-crosshair bg-cover"
			onClick={handleClick}
			style={{
				backgroundImage: `url(${data.imgUrl})`,
			}}
		/>
	)
}
