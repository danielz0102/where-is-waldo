import { create } from 'zustand'
import { type ClickSlice, createClickSlice } from './clickSlice'
import { createTimerSlice, type TimerSlice } from './timerSlice'

interface LevelStore extends ClickSlice, TimerSlice {
	win: boolean
	setWin: () => void
	reset: () => void
}

export const useLevelStore = create<LevelStore>()((...args) => {
	const [set, get, store] = args

	return {
		...createClickSlice(...args),
		...createTimerSlice(...args),
		win: false,
		setWin: () => {
			get().pauseTimer()
			set({ win: true })
		},
		reset: () => {
			set(store.getInitialState())
		},
	}
})
