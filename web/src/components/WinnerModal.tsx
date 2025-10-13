import { useLevelStore } from '~/stores/levelStore'

export default function WinnerModal() {
	const time = useLevelStore((state) => state.getTimeFormatted())
	const win = useLevelStore((state) => state.win)

	return (
		<dialog
			open={win}
			className="-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2 animate-duration-150 animate-fade-in rounded bg-gradient-to-br from-blue-100 to-red-100 px-8 py-4 text-center shadow shadow-red-200 md:px-16 md:py-8"
		>
			<h2 className="mb-4 font-bold text-3xl">You won!</h2>
			<p>
				Your time: <span className="font-bold font-mono">{time}</span>
			</p>
		</dialog>
	)
}
