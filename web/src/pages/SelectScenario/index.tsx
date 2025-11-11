import clsx from 'clsx'
import { Link } from 'react-router'
import ScenarioQueries from '~/querys/ScenarioQueries'
import type { Scenario } from '~/types'
import HomeLink from '~components/HomeLink'
import Alert from '~components/Alert'
import Title from '~components/Title'

export default function SelectScenario() {
	const {
		data: scenarios,
		isLoading,
		isError,
	} = ScenarioQueries.useGetAllQuery()

	return (
		<div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-100 to-red-100 p-4">
			<nav>
				<HomeLink />
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
		</div>
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
		<Link
			key={scenario.id}
			to={`/scenario/${scenario.slug}`}
			className="relative overflow-hidden rounded shadow transition-transform hover:scale-105 active:scale-95"
		>
			<img
				src={scenario.imgUrl}
				alt={scenario.name}
				className="size-full object-cover"
			/>
			<h2 className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 text-6xl text-shadow-md/30">
				{scenario.name}
			</h2>
		</Link>
	)
}
