import { create } from 'zustand'
import { type ClickSlice, createClickSlice } from './clickSlice'

type LevelStore = ClickSlice

export const useLevelStore = create<LevelStore>()((...a) => ({
	...createClickSlice(...a),
}))
