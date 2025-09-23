import { Crosshair } from 'lucide-react'
import { useCanvasClick } from '~hooks/use-canvas-click'
import CanvasItem from './canvas-item'

export default function TargetBox() {
	const { x, y, toggle } = useCanvasClick()

	return (
		<CanvasItem x={x} y={y} hidden={!toggle}>
			<div className="rounded-full border-2 border-red-500 border-dashed bg-neutral-700/70 p-4">
				<Crosshair size={16} color="#fb2c36" />
			</div>
		</CanvasItem>
	)
}
