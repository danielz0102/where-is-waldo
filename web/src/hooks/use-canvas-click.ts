import { create } from 'zustand'

export interface CanvasClick {
	x: number
	y: number
	toggle: boolean
	rect: DOMRect | null
	click: (event: React.MouseEvent<HTMLCanvasElement>) => void
}

export const useCanvasClick = create<CanvasClick>((set) => ({
	x: 0,
	y: 0,
	toggle: false,
	event: null,
	rect: null,
	click: (e: React.MouseEvent<HTMLCanvasElement>) => {
		set((state) => ({
			x: e.clientX,
			y: e.clientY,
			toggle: !state.toggle,
			rect: e.currentTarget.getBoundingClientRect(),
		}))
	},
}))
