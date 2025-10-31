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
				return
			}

			interval = setInterval(() => {
				set((state) => ({ seconds: state.seconds + 1 }))
			}, 1000)
		},
		pauseTimer: () => {
			if (interval) {
				clearInterval(interval)
				interval = null
			}
		},
		getTimeFormatted: () => {
			const { seconds } = get()
			const minutes = Math.floor(seconds / 60)
				.toString()
				.padStart(2, '0')
			const remainingSeconds = (seconds % 60).toString().padStart(2, '0')
			return `${minutes}:${remainingSeconds}`
		},
		resetTimer: () => {
			get().pauseTimer()
			set(slice.getInitialState())
		},
	}
}
