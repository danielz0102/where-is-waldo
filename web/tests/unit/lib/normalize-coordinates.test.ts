import { normalizeCoordinates } from '~/lib/normalize-coordinates'

test('returns the normalized coordinates to a range of 0 to 100', () => {
	const { x, y } = normalizeCoordinates({
		x: 50,
		y: 100,
		width: 200,
		height: 400,
	})

	expect(x).toBe(25)
	expect(y).toBe(25)
})
