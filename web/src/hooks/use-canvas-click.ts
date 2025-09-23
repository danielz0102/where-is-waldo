import { create } from 'zustand'

export interface CanvasClick {
	x: number
	y: number
	clickCount: number
	rect: DOMRect | null
	click: (event: React.MouseEvent<HTMLCanvasElement>) => void
}

export const useCanvasClick = create<CanvasClick>((set) => ({
	x: 0,
	y: 0,
	event: null,
	rect: null,
	clickCount: 0,
	click: (e: React.MouseEvent<HTMLCanvasElement>) => {
		set((state) => ({
			x: e.clientX,
			y: e.clientY,
			clickCount: state.clickCount + 1,
			rect: e.currentTarget.getBoundingClientRect(),
		}))
	},
}))
