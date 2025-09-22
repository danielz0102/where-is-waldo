import type { Scenario as ScenarioType } from '~/types'

interface ScenarioProps {
	data: ScenarioType
	onClick: (e: React.MouseEvent<HTMLCanvasElement>) => void
}

export default function Scenario({ data, onClick }: ScenarioProps) {
	return (
		<canvas
			role="img"
			aria-label={data.name}
			className="mx-auto size-full cursor-crosshair bg-cover"
			onClick={onClick}
			style={{
				backgroundImage: `url(${data.imgUrl})`,
			}}
		/>
	)
}
