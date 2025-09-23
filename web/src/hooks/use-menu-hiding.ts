import { useEffect, useState } from 'react'
import { useCanvasClick } from './use-canvas-click'
import { useCharacterSelection } from './use-character-selection'

export function useMenuHiding() {
	const { clickCount } = useCanvasClick()
	const { selectionCount } = useCharacterSelection()
	const [hidden, setHidden] = useState(true)

	useEffect(() => {
		setHidden((prev) => !prev)
	}, [clickCount])

	useEffect(() => {
		setHidden(true)
	}, [selectionCount])

	return hidden
}
