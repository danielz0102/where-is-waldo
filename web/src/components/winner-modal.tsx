import { useTimerStore } from '~/stores/use-timer-store'

export default function WinnerModal() {
	const time = useTimerStore((state) => state.secondsFormatted)

	return (
		<dialog>
			<h2>You won!</h2>
			<p>Your time: {time}</p>
		</dialog>
	)
}
