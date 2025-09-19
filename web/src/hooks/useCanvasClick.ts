import { useEffect, useState } from 'react'

export function useCanvasClick(
	clickEvent: React.MouseEvent<HTMLCanvasElement> | null
) {
	const [click, setClick] = useState({ x: 0, y: 0, toggle: false })

	useEffect(() => {
		if (!clickEvent) return

		setClick(({ toggle }) => ({
			toggle: !toggle,
			x: clickEvent.clientX,
			y: clickEvent.clientY,
		}))
	}, [clickEvent])

	return click
}
