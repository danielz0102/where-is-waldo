interface NormalizeCoordinatesParams {
	x: number
	y: number
	width: number
	height: number
}

export function normalizeCoordinates(params: NormalizeCoordinatesParams) {
	const normX = (params.x / params.width) * 100
	const normY = (params.y / params.height) * 100
	return { normX, normY }
}
