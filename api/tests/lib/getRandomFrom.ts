export function getRandomFrom<T>(arr: T[]): T {
	const randomIndex = Math.floor(Math.random() * arr.length)
	const randomElement = arr[randomIndex]

	if (!randomElement) {
		throw new Error(
			`Element with index ${randomIndex} was not found in array`,
			{ cause: { arr } }
		)
	}

	return randomElement
}
