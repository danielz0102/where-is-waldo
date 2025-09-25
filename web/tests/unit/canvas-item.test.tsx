import { render, screen } from '@testing-library/react'
import CanvasItem from '~/components/canvas-item'

test('does not display children if "hidden" is true', () => {
	render(
		<CanvasItem x={100} y={100} hidden>
			Child Content
		</CanvasItem>
	)

	expect(screen.queryByText('Child Content')).not.toBeVisible()
})

test('displays children by default', () => {
	render(
		<CanvasItem x={100} y={100}>
			Child Content
		</CanvasItem>
	)

	expect(screen.queryByText('Child Content')).toBeVisible()
})

test('positions children in the coordinates passed', async () => {
	render(
		<CanvasItem x={100} y={100}>
			Child Content
		</CanvasItem>
	)

	const canvasItem = screen.getByText('Child Content')
	const styles = getComputedStyle(canvasItem)

	expect(styles.top).toBe('100px')
	expect(styles.left).toBe('100px')
})
