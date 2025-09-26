import { useTimer } from '~hooks/useTimer'

export interface TimerProps {
	paused?: boolean
}

export default function ScoreTimer({ paused = false }: TimerProps) {
	const { timeDisplay } = useTimer(paused)

	return (
		<div className="absolute top-4 left-4 rounded bg-neutral-600 px-4 py-2 text-neutral-50">
			{timeDisplay}
		</div>
	)
}
