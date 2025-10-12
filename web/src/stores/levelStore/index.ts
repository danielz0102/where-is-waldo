import { create } from 'zustand'
import { type ClickSlice, createClickSlice } from './clickSlice'
import { createTimerSlice, type TimerSlice } from './timerSlice'

type LevelStore = ClickSlice & TimerSlice

export const useLevelStore = create<LevelStore>()((...a) => ({
	...createClickSlice(...a),
	...createTimerSlice(...a),
}))
