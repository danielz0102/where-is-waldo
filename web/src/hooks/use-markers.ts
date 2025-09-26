import { useEffect, useState } from 'react'
import { canvasClickStore } from '~/stores/canvas-click-store'
import { characterStore } from '~/stores/character-store'

interface MarkerState {
	x: number
	y: number
	ok: boolean
}

export function useMarkers() {
	const [markers, setMarkers] = useState<MarkerState[]>([])
	const lastOne = characterStore((state) => state.lastOne)
	const success = characterStore((state) => state.lastOne.successful)
	const x = canvasClickStore((state) => state.x)
	const y = canvasClickStore((state) => state.y)

	useEffect(() => {
		if (!lastOne.character) return

		setMarkers((prev) => [...prev, { x, y, ok: success }])
	}, [lastOne])

	return markers
}
