import { Crosshair } from 'lucide-react'
import { useCanvasClickStore } from '~/stores/use-canvas-click-store'
import { useMenuHiding } from '~hooks/use-menu-hiding'
import CanvasItem from './canvas-item'

export default function TargetBox() {
	const x = useCanvasClickStore((state) => state.x)
	const y = useCanvasClickStore((state) => state.y)
	const hidden = useMenuHiding()

	return (
		<CanvasItem x={x} y={y} hidden={hidden}>
			<div className="rounded-full border-2 border-red-500 border-dashed bg-neutral-700/70 p-4">
				<Crosshair size={16} color="#fb2c36" />
			</div>
		</CanvasItem>
	)
}
