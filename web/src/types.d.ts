export interface Scenario {
	id: string
	name: string
	slug: string
	imgUrl: string
}

export interface Character {
	id: string
	name: string
	imgUrl: string
	maxX: number
	minX: number
	maxY: number
	minY: number
	scenarioId: string
}

export interface Score {
	id: string
	scenarioId: string
	time: string
	username: string
}
