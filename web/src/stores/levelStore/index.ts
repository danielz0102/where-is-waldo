import { create } from 'zustand'
import { type ClickSlice, createClickSlice } from './clickSlice'
import { createTimerSlice, type TimerSlice } from './timerSlice'

interface LevelStore extends ClickSlice, TimerSlice {
	win: boolean
	onResetListeners: (() => void)[]
	setWin: () => void
	reset: () => void
	onReset: (cb: () => void) => void
}

export const useLevelStore = create<LevelStore>()((...args) => {
	const [set, get, store] = args

	return {
		...createClickSlice(...args),
		...createTimerSlice(...args),
		win: false,
		onResetListeners: [],
		setWin: () => {
			get().pauseTimer()
			set({ win: true })
		},
		reset: () => {
			get().onResetListeners.forEach((cb) => cb())
			set(store.getInitialState())
		},
		onReset: (cb) => {
			get().onResetListeners.push(cb)
		},
	}
})
