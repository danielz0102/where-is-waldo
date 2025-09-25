import { useEffect, useState } from 'react'
import { useCanvasClickStore } from '~/stores/use-canvas-click-store'
import { useCharacterSelectionStore } from '~/stores/use-character-selection-store'

interface MarkerState {
	x: number
	y: number
	ok: boolean
}

export function useMarkers() {
	const [markers, setMarkers] = useState<MarkerState[]>([])
	const selectionCount = useCharacterSelectionStore(
		(state) => state.selectionCount
	)
	const success = useCharacterSelectionStore((state) => state.success)
	const x = useCanvasClickStore((state) => state.x)
	const y = useCanvasClickStore((state) => state.y)

	useEffect(() => {
		if (selectionCount === 0) return

		setMarkers((prev) => [...prev, { x, y, ok: success }])
	}, [selectionCount])

	return markers
}
