import clsx from 'clsx'
import { Link } from 'react-router'
import ScenarioQueries from '~/querys/ScenarioQueries'
import type { Scenario } from '~/types'
import Alert from '~components/Alert'
import BackLink from '~components/BackLink'
import Overlay from '~components/Overlay'
import Title from '~components/Title'

export default function SelectScenario() {
	const {
		data: scenarios,
		isLoading,
		isError,
	} = ScenarioQueries.useGetAllQuery()

	return (
		<Overlay className="flex flex-col">
			<nav>
				<BackLink />
			</nav>
			<main className="flex flex-1 flex-col items-center justify-center gap-2">
				<Title className="text-center">Select a Scenario</Title>
				<div
					className={clsx(
						'relative flex w-full max-w-2xl flex-1 flex-col gap-4',
						{ 'overflow-hidden': isLoading }
					)}
				>
					{isLoading && (
						<div className="absolute flex w-full flex-col gap-4">
							<ScenarioSkeleton />
							<ScenarioSkeleton />
							<p hidden>Loading scenarios...</p>
						</div>
					)}
					{isError && (
						<Alert>An error has occurred. Please try again later.</Alert>
					)}
					{scenarios?.map((scn) => (
						<ScenarioCard key={scn.id} scenario={scn} />
					))}
				</div>
			</main>
		</Overlay>
	)
}

function ScenarioSkeleton() {
	return (
		<div className="flex h-[453px] animate-pulse items-center justify-center rounded bg-gray-300">
			...
		</div>
	)
}

function ScenarioCard({ scenario }: { scenario: Scenario }) {
	return (
		<div className="relative overflow-hidden rounded shadow">
			<img
				src={scenario.imgUrl}
				alt={scenario.name}
				className="size-full object-cover"
			/>
			<h2 className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 text-6xl text-shadow-md/30">
				{scenario.name}
			</h2>
			<Link
				to={`/leaderboard/${scenario.slug}`}
				className="absolute bottom-4 left-4 rounded bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:bg-blue-700 active:scale-95"
				aria-label={`Leaderboard for ${scenario.name}`}
			>
				Leaderboard
			</Link>
			<Link
				to={`/scenario/${scenario.slug}`}
				className="absolute right-4 bottom-4 rounded bg-red-600 px-6 py-3 font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:bg-red-700 active:scale-95"
				aria-label={`Play ${scenario.name}`}
			>
				Play
			</Link>
		</div>
	)
}
