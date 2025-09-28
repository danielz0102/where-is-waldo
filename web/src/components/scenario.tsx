import type { Scenario as ScenarioType } from '~/types'

interface ScenarioProps {
	data: ScenarioType
	children: React.ReactNode
}

export default function Scenario({ data, children }: ScenarioProps) {
	const handleClick = () => {}

	return (
		/* biome-ignore lint/a11y/useKeyWithClickEvents: This is a game canvas where precise mouse coordinates are needed */
		/* biome-ignore lint/a11y/noStaticElementInteractions: Game area requires click interaction at specific coordinates */
		<div
			className="relative cursor-crosshair overflow-auto"
			onClick={handleClick}
		>
			<img
				src={data.imgUrl}
				alt={data.name}
				className="min-h-screen min-w-screen max-w-none"
			/>
			{children}
		</div>
	)
}
