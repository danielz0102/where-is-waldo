import type { StateCreator } from 'zustand'

export interface ClickSlice {
	x: number
	y: number
	normX: number
	normY: number
	toggle: boolean
	handleClick: (e: React.MouseEvent<HTMLImageElement>) => void
}

export const createClickSlice: StateCreator<ClickSlice> = (set) => ({
	x: 0,
	y: 0,
	normX: 0,
	normY: 0,
	toggle: false,
	handleClick: (e) => {
		const rect = e.currentTarget.getBoundingClientRect()
		const x = e.clientX - rect.left
		const y = e.clientY - rect.top

		const normX = (x / rect.width) * 100
		const normY = (y / rect.height) * 100

		set((prev) => ({ x, y, normX, normY, toggle: !prev.toggle }))
	},
})
