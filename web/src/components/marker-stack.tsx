import { useMarkers } from '~hooks/use-markers'
import CanvasItem from './canvas-item'
import Marker from './marker'

export default function MarkerStack() {
	const markers = useMarkers()

	return (
		<>
			{markers.map(({ ok, x, y }) => (
				<CanvasItem key={`${x}-${y}-${ok}`} x={x} y={y}>
					<Marker ok={ok} />
				</CanvasItem>
			))}
		</>
	)
}
