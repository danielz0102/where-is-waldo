import { useEffect, useLayoutEffect, useState } from 'react'
import { characterStore } from '~/stores/character-store'
import { canvasClickStore } from '../stores/canvas-click-store'

export function useMenuHiding() {
	const clickCount = canvasClickStore((state) => state.clickCount)
	const lastOne = characterStore((state) => state.lastOne)
	const [hidden, setHidden] = useState(true)

	// Regular useEffect causes a flicker because it runs after paint
	useLayoutEffect(() => {
		setHidden((prev) => !prev)
	}, [clickCount])

	useEffect(() => {
		setHidden(true)
	}, [lastOne])

	return hidden
}
