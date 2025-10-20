import type { StateCreator } from 'zustand'

export interface TimerSlice {
	seconds: number
	pause: () => void
	resume: () => void
	getTimeFormatted: () => string
	reset: () => void
}

export const createTimerSlice: StateCreator<TimerSlice> = (set, get, store) => {
	let paused = true
	setInterval(() => {
		if (!paused) {
			set((state) => ({ seconds: state.seconds + 1 }))
		}
	}, 1000)

	return {
		seconds: 0,
		resume: () => {
			paused = false
		},
		pause: () => {
			paused = true
		},
		getTimeFormatted: () => {
			const { seconds } = get()
			const minutes = Math.floor(seconds / 60)
				.toString()
				.padStart(2, '0')
			const remainingSeconds = (seconds % 60).toString().padStart(2, '0')
			return `${minutes}:${remainingSeconds}`
		},
		reset: () => {
			get().pause()
			set(store.getInitialState())
		},
	}
}
