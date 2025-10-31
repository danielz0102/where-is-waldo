import { render, renderHook, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useLevelStore } from '..'

const Image = ({ width, height }: { width: number; height: number }) => {
	const handleClick = useLevelStore((state) => state.handleClick)

	return (
		// biome-ignore lint/a11y/useAltText: This is a test component
		// biome-ignore lint/a11y/useKeyWithClickEvents: This is a test component
		<img
			src="https://placehold.co/400"
			data-testid="test-image"
			width={width}
			height={height}
			onClick={handleClick}
		/>
	)
}

beforeEach(() => {
	useLevelStore.getState().reset()
})

test('initializes coordinates at (0,0)', () => {
	const { result } = renderHook(() => useLevelStore())

	const { x, y, normX, normY } = result.current

	expect(x).toBe(0)
	expect(y).toBe(0)
	expect(normX).toBe(0)
	expect(normY).toBe(0)
})

test('initializes toggle as false', () => {
	const { result } = renderHook(() => useLevelStore())
	const { toggle } = result.current
	expect(toggle).toBe(false)
})

test('updates coordinates on click', async () => {
	const { result } = renderHook(() => useLevelStore())
	render(<Image width={200} height={100} />)
	const image = screen.getByTestId('test-image')
	mockGetBoundingClientRect({ image, width: 200, height: 100 })

	await clickAt({ x: 150, y: 50, target: image })
	const { x, y, normX, normY } = result.current

	expect(x).toBe(150)
	expect(y).toBe(50)
	expect(normX).toBe(75)
	expect(normY).toBe(50)
})

test('toggles the boolean on each click', async () => {
	const user = userEvent.setup()
	const { result } = renderHook(() => useLevelStore())

	render(<Image width={200} height={100} />)

	expect(result.current.toggle).toBe(false)

	const image = screen.getByTestId('test-image')
	await user.click(image)

	expect(result.current.toggle).toBe(true)

	await user.click(image)

	expect(result.current.toggle).toBe(false)
})

interface ClickAtParams {
	x: number
	y: number
	target: HTMLElement
}
async function clickAt({ x, y, target }: ClickAtParams) {
	const user = userEvent.setup()
	await user.pointer([
		{ target, coords: { x, y }, keys: '[MouseLeft]' },
		{ keys: '[/MouseLeft]' },
	])
}

/**Mock clientRect to return consistent dimensions, overriding the default implementation*/
function mockGetBoundingClientRect({
	image,
	width,
	height,
}: {
	image: HTMLElement
	width: number
	height: number
}) {
	const actualRect = image.getBoundingClientRect()
	vi.spyOn(image, 'getBoundingClientRect').mockReturnValueOnce({
		...actualRect,
		width,
		height,
		top: 0,
		right: width,
		bottom: height,
		left: 0,
	})
}
