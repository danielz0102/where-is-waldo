import { Crosshair } from 'lucide-react'
import { canvasClickStore } from '~/stores/canvas-click-store'
import { useMenuHiding } from '~hooks/use-menu-hiding'
import CanvasItem from './canvas-item'

export default function TargetBox() {
	const x = canvasClickStore((state) => state.x)
	const y = canvasClickStore((state) => state.y)
	const hidden = useMenuHiding()

	return (
		<CanvasItem x={x} y={y} hidden={hidden} className="z-10">
			<div className="rounded-full border-2 border-red-500 border-dashed bg-neutral-700/70 p-4">
				<Crosshair size={16} color="#fb2c36" />
			</div>
		</CanvasItem>
	)
}
