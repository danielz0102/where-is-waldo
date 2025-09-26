import { useEffect, useState } from 'react'

export function useTimer(paused: boolean) {
	const [seconds, setSeconds] = useState(0)

	useEffect(() => {
		if (paused) return

		const interval = setInterval(() => {
			setSeconds((s) => s + 1)
		}, 1000)

		return () => clearInterval(interval)
	}, [paused])

	const minutes = Math.floor(seconds / 60)
		.toString()
		.padStart(2, '0')
	const remainingSeconds = (seconds % 60).toString().padStart(2, '0')
	const timeDisplay = `${minutes}:${remainingSeconds}`

	return { seconds, timeDisplay }
}
