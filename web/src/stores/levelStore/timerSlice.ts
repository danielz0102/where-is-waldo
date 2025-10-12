import type { StateCreator } from 'zustand'

export interface TimerSlice {
	seconds: number
	paused: boolean
	init: () => void
	pause: () => void
	resume: () => void
	getTimeFormatted: () => string
	reset: () => void
}

export const createTimerSlice: StateCreator<TimerSlice> = (
	set,
	get,
	store
) => ({
	seconds: 0,
	paused: false,
	init: () => {
		setInterval(() => {
			if (get().paused) return

			set((state) => ({ seconds: state.seconds + 1 }))
		}, 1000)
	},
	resume: () => set({ paused: false }),
	pause: () => set({ paused: true }),
	getTimeFormatted: () => {
		const { seconds } = get()
		const minutes = Math.floor(seconds / 60)
			.toString()
			.padStart(2, '0')
		const remainingSeconds = (seconds % 60).toString().padStart(2, '0')
		return `${minutes}:${remainingSeconds}`
	},
	reset: () => set(store.getInitialState()),
})
