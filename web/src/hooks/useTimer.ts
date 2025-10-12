import { useEffect, useState } from 'react'
import { formatSeconds } from '~/lib/format-seconds'

export function useTimer(paused: boolean) {
	const [seconds, setSeconds] = useState(0)

	useEffect(() => {
		if (paused) return

		const interval = setInterval(() => {
			setSeconds((s) => s + 1)
		}, 1000)

		return () => clearInterval(interval)
	}, [paused])

	return { seconds, timeDisplay: formatSeconds(seconds) }
}
