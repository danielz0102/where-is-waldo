import { create } from 'zustand'
import { type ClickSlice, createClickSlice } from './clickSlice'
import { createTimerSlice, type TimerSlice } from './timerSlice'

interface LevelStore extends ClickSlice, TimerSlice {
	win: boolean
	setWin: (win: boolean) => void
}

export const useLevelStore = create<LevelStore>()((...a) => ({
	...createClickSlice(...a),
	...createTimerSlice(...a),
	win: false,
	setWin: () => {
		a[1]().resetTimer()
		a[0]({ win: true })
	},
}))
