import { create } from 'zustand'
import { formatSeconds } from '~/lib/format-seconds'

interface TimerState {
	seconds: number
	secondsFormatted: string
	setSeconds: (seconds: number) => void
}

export const timerStore = create<TimerState>((set) => ({
	seconds: 0,
	secondsFormatted: '00:00',
	setSeconds: (seconds) => {
		set({ seconds, secondsFormatted: formatSeconds(seconds) })
	},
}))
