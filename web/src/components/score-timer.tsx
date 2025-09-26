import { useTimerStore } from '~/stores/use-timer-store'
import { useTimer } from '~hooks/use-timer'

export interface TimerProps {
	end?: boolean
}

export default function ScoreTimer({ end = false }: TimerProps) {
	const { timeDisplay, seconds } = useTimer(end)
	const save = useTimerStore((state) => state.setSeconds)

	if (end) {
		save(seconds)
	}

	return (
		<div className="absolute top-4 left-4 rounded bg-neutral-600 px-4 py-2 text-neutral-50">
			{timeDisplay}
		</div>
	)
}
