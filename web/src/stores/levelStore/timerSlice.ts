import type { StateCreator } from 'zustand'

export interface TimerSlice {
	seconds: number
	pauseTimer: () => void
	resumeTimer: () => void
	getTimeFormatted: () => string
	resetTimer: () => void
}

export const createTimerSlice: StateCreator<TimerSlice> = (set, get, slice) => {
	let interval: ReturnType<typeof setInterval> | null = null

	return {
		seconds: 0,
		resumeTimer: () => {
			if (interval) {
				clearInterval(interval)
			}

			interval = setInterval(() => {
				set((state) => ({ seconds: state.seconds + 1 }))
			}, 1000)
		},
		pauseTimer: () => {
			if (interval) {
				clearInterval(interval)
			}
		},
		getTimeFormatted: () => {
			const { seconds } = get()
			const hours = Math.floor(seconds / 3600)
				.toString()
				.padStart(2, '0')
			const minutes = Math.floor((seconds % 3600) / 60)
				.toString()
				.padStart(2, '0')
			const remainingSeconds = (seconds % 60).toString().padStart(2, '0')

			return `${hours}:${minutes}:${remainingSeconds}`
		},
		resetTimer: () => {
			if (interval) {
				clearInterval(interval)
			}

			set(slice.getInitialState())
		},
	}
}
