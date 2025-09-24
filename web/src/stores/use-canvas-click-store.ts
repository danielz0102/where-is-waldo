import { create } from 'zustand'
import { normalizeCoordinates } from '~/lib/normalize-coordinates'

export interface CanvasClick {
	x: number
	y: number
	normX: number
	normY: number
	clickCount: number
	click: (event: React.MouseEvent<HTMLCanvasElement>) => void
	reset: () => void
}

export const useCanvasClickStore = create<CanvasClick>((set, _, store) => ({
	x: 0,
	y: 0,
	normX: 0,
	normY: 0,
	event: null,
	clickCount: 0,
	click: (e: React.MouseEvent<HTMLCanvasElement>) => {
		const rect = e.currentTarget.getBoundingClientRect()
		const { normX, normY } = normalizeCoordinates({
			x: e.clientX,
			y: e.clientY,
			width: rect.width,
			height: rect.height,
		})
		set(({ clickCount }) => ({
			x: e.clientX,
			y: e.clientY,
			normX,
			normY,
			clickCount: clickCount + 1,
		}))
	},
	reset: () => {
		set(store.getInitialState())
	},
}))
