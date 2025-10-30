import type { StateCreator } from 'zustand'

export interface TimerSlice {
	seconds: number
	paused: boolean
	pauseTimer: () => void
	resumeTimer: () => void
	getTimeFormatted: () => string
	resetTimer: () => void
}

export const createTimerSlice: StateCreator<TimerSlice> = (set, get, store) => {
	setInterval(() => {
		if (!get().paused) {
			set((state) => ({ seconds: state.seconds + 1 }))
		}
	}, 1000)

	return {
		paused: true,
		seconds: 0,
		resumeTimer: () => {
			set({ paused: false })
		},
		pauseTimer: () => {
			set({ paused: true })
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
			set(store.getInitialState())
		},
	}
}
