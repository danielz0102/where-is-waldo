import { CircleStar } from 'lucide-react'
import { useEffect } from 'react'
import ScoreQueries from '~/querys/ScoreQueries'
import { useLevelStore } from '~/stores/levelStore'
import ScoreForm from '../ScoreForm'
import type { Scenario } from '~/types'

export default function WinnerModal({ scenario }: { scenario: Scenario }) {
	const time = useLevelStore((state) => state.getTimeFormatted())
	const win = useLevelStore((state) => state.win)
	const seconds = useLevelStore((state) => state.seconds)
	const reset = useLevelStore((state) => state.reset)
	const startTime = useLevelStore((state) => state.resumeTimer)
	const isTop10 = ScoreQueries.useIsTop10Query(scenario.slug, seconds)

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
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-2">
					<h2 className="bg-gradient-to-r from-red-700 to-red-400 bg-clip-text font-bold text-3xl text-transparent">
						You won!
					</h2>
					<div className="flex items-center gap-2">
						<p>
							Your time: <time className="font-bold font-mono">{time}</time>
						</p>
						{isTop10.data === true && (
							<span className="flex gap-1 rounded px-2 py-1 font-semibold text-yellow-600">
								Top 10
								<CircleStar strokeWidth={1} />
							</span>
						)}
					</div>
				</div>
				{isTop10.isFetching ? (
					<p className="animate-pulse text-gray-600">Loading...</p>
				) : (
					<>
						{isTop10.data === true && (
							<ScoreForm scenarioId={scenario.id} time={time} />
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
			</div>
		</dialog>
	)
}
