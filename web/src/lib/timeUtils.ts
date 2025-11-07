export function timeToSeconds(time: string) {
	const [hours, minutes, seconds] = time.split(':').map(Number)

	if (hours === undefined || minutes === undefined || seconds === undefined) {
		throw new Error(`Invalid time format: ${time}`)
	}

	return hours * 3600 + minutes * 60 + seconds
}

export function secondsToTime(s: number) {
	const hours = Math.floor(s / 3600)
	const minutes = Math.floor((s % 3600) / 60)
	const seconds = s % 60

	return [hours, minutes, seconds]
		.map((v) => v.toString().padStart(2, '0'))
		.join(':')
}
