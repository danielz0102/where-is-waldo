import { useLevelStore } from '~/stores/levelStore'

export default function ScoreTimer() {
	const time = useLevelStore((state) => state.getTimeFormatted())
	return (
		<div className="rounded bg-red-950 px-2 py-1 font-mono text-neutral-50 shadow-lg shadow-red-200">
			<time role="timer">{time}</time>
		</div>
	)
}
