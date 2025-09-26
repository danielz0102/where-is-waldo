import { useEffect, useState } from 'react'
import { characterStore } from '~/stores/character-store'
import { useCanvasClickStore } from '~/stores/use-canvas-click-store'

interface MarkerState {
	x: number
	y: number
	ok: boolean
}

export function useMarkers() {
	const [markers, setMarkers] = useState<MarkerState[]>([])
	const lastOne = characterStore((state) => state.lastOne)
	const success = characterStore((state) => state.lastOne.successful)
	const x = useCanvasClickStore((state) => state.x)
	const y = useCanvasClickStore((state) => state.y)

	useEffect(() => {
		if (!lastOne.character) return

		setMarkers((prev) => [...prev, { x, y, ok: success }])
	}, [lastOne])

	return markers
}
