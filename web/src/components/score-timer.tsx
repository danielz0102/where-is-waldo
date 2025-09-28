import { timerStore } from '~/stores/timer-store'
import { useTimer } from '~hooks/use-timer'

export interface TimerProps {
	end?: boolean
}

export default function ScoreTimer({ end = false }: TimerProps) {
	const { timeDisplay, seconds } = useTimer(end)
	const save = timerStore((state) => state.setSeconds)

	if (end) {
		save(seconds)
	}

	return (
		<div className="absolute top-4 left-4 rounded bg-red-950 px-4 py-2 font-mono text-2xl text-neutral-50 shadow-lg shadow-red-200">
			{timeDisplay}
		</div>
	)
}
