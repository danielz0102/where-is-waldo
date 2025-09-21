import { render, screen } from '@testing-library/react'
import CanvasItem from '~components/CanvasItem'

test('does not display children if "show" is false', () => {
	render(
		<CanvasItem x={100} y={100}>
			Child Content
		</CanvasItem>
	)

	expect(screen.queryByText('Child Content')).not.toBeInTheDocument()
})

test('displays children if "show" is true', () => {
	render(
		<CanvasItem x={100} y={100} show>
			Child Content
		</CanvasItem>
	)

	expect(screen.queryByText('Child Content')).toBeVisible()
})

test('positions children in the coordinates passed', async () => {
	render(
		<CanvasItem x={100} y={100} show>
			Child Content
		</CanvasItem>
	)

	const canvasItem = screen.getByText('Child Content')
	const styles = getComputedStyle(canvasItem)

	expect(styles.top).toBe('100px')
	expect(styles.left).toBe('100px')
})
