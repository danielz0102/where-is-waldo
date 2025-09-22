import { useRef, useState } from 'react'

export function useCanvasClick() {
	const [data, setData] = useState({ x: 0, y: 0, toggle: false })
	const canvasRect = useRef<DOMRect | null>(null)

	const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
		canvasRect.current = event.currentTarget.getBoundingClientRect()
		const clientX = event.clientX
		const clientY = event.clientY

		setData(({ toggle }) => ({
			toggle: !toggle,
			x: clientX,
			y: clientY,
		}))
	}

	return { ...data, canvasRect: canvasRect.current, handleCanvasClick }
}
