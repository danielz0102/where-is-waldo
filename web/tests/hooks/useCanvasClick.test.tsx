import { renderHook } from '@testing-library/react'
import { useCanvasClick } from '~/hooks/useCanvasClick'

test('should return the initial state when clickEvent is null', () => {
	const { result } = renderHook(() => useCanvasClick(null))

	expect(result.current).toEqual({ x: 0, y: 0, toggle: false })
})

test('should update correctly when a new clickEvent is provided', () => {
	const mockEvent = {
		clientX: 100,
		clientY: 150,
	} as React.MouseEvent<HTMLCanvasElement>

	const { result, rerender } = renderHook(
		({ event }) => useCanvasClick(event),
		{
			initialProps: {
				event: null as React.MouseEvent<HTMLCanvasElement> | null,
			},
		}
	)

	expect(result.current).toEqual({ x: 0, y: 0, toggle: false })

	rerender({ event: mockEvent })

	expect(result.current).toEqual({ x: 100, y: 150, toggle: true })
})
