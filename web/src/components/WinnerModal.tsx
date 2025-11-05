import { useEffect } from 'react'
import ScoreQueries from '~/querys/ScoreQueries'
import { useLevelStore } from '~/stores/levelStore'

export default function WinnerModal({ scenarioId }: { scenarioId: string }) {
	const time = useLevelStore((state) => state.getTimeFormatted())
	const win = useLevelStore((state) => state.win)
	const seconds = useLevelStore((state) => state.seconds)
	const reset = useLevelStore((state) => state.reset)
	const startTime = useLevelStore((state) => state.resumeTimer)
	const isTop10 = ScoreQueries.useIsTop10Query(scenarioId, seconds)

	useEffect(() => {
		if (win) {
			isTop10.refetch()
		}
	}, [win])

	return (
		<dialog
			open={win}
			className="-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2 animate-duration-150 animate-fade-in rounded bg-gradient-to-br from-blue-100 to-red-100 px-8 py-4 text-center shadow shadow-red-200 md:px-16 md:py-8"
		>
			<h2 className="mb-4 font-bold text-3xl">You won!</h2>
			<p>
				Your time: <time className="font-bold font-mono">{time}</time>
			</p>
			{isTop10.isFetching ? (
				<p className="mt-4 animate-pulse text-gray-600">Loading...</p>
			) : (
				<>
					{isTop10.data && (
						<p className="mt-4 font-semibold text-green-700">
							Congratulations! You made it to the Top 10!
						</p>
					)}
					<button
						onClick={() => {
							reset()
							startTime()
						}}
						type="button"
						className="mt-4 cursor-pointer font-semibold text-blue-900 transition-opacity hover:opacity-50"
					>
						Play Again
					</button>
				</>
			)}
		</dialog>
	)
}
