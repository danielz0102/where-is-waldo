import { useEffect, useLayoutEffect, useState } from 'react'
import { useCanvasClick } from './use-canvas-click'
import { useCharacterSelection } from './use-character-selection'

export function useMenuHiding() {
	const clickCount = useCanvasClick((state) => state.clickCount)
	const selectionCount = useCharacterSelection((state) => state.selectionCount)
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
