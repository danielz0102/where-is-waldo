import { useEffect, useLayoutEffect, useState } from 'react'
import { useCanvasClickStore } from '../stores/use-canvas-click-store'
import { useCharacterSelectionStore } from '../stores/use-character-selection-store'

export function useMenuHiding() {
	const clickCount = useCanvasClickStore((state) => state.clickCount)
	const selectionCount = useCharacterSelectionStore(
		(state) => state.selectionCount
	)
	const [hidden, setHidden] = useState(true)

	// Regular useEffect causes a flicker because it runs after paint
	useLayoutEffect(() => {
		setHidden((prev) => !prev)
	}, [clickCount])

	useEffect(() => {
		setHidden(true)
	}, [selectionCount])

	return hidden
}
