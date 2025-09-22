export function normalizeCoordinates({
	x,
	y,
	width,
	height,
}: {
	x: number
	y: number
	width: number
	height: number
}) {
	const normalizedX = (x / width) * 100
	const normalizedY = (y / height) * 100
	return { x: normalizedX, y: normalizedY }
}
