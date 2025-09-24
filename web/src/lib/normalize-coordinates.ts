interface NormalizeCoordinatesParams {
	x: number
	y: number
	width: number
	height: number
}

export function normalizeCoordinates(params: NormalizeCoordinatesParams) {
	const normalizedX = (params.x / params.width) * 100
	const normalizedY = (params.y / params.height) * 100
	return { x: normalizedX, y: normalizedY }
}
