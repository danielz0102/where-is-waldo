import { timerStore } from '~/stores/timer-store'

export default function WinnerModal() {
	const time = timerStore((state) => state.secondsFormatted)

	return (
		<dialog
			open
			className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 rounded bg-neutral-500 px-8 py-4 text-center text-neutral-50"
		>
			<h2 className="mb-4 font-bold text-2xl">You won!</h2>
			<p>Your time: {time}</p>
		</dialog>
	)
}
