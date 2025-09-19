export interface Scenario {
	id: string
	name: string
	imgUrl: string
}

export interface Character {
	name: string
	id: string
	imgUrl: string
	maxX: number
	minX: number
	maxY: number
	minY: number
	scenarioId: string
}
