import clsx from 'clsx'
import { OctagonX, Undo2 } from 'lucide-react'
import { Link } from 'react-router'
import ScenarioQueries from '~/querys/ScenarioQueries'
import Title from '~ui/Title'

export default function SelectScenario() {
	const {
		data: scenarios,
		isLoading,
		isError,
	} = ScenarioQueries.useGetAllQuery()

	return (
		<div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-100 to-red-100 p-4">
			<nav>
				<Link
					to="/"
					aria-label="Home"
					className="inline-block transition-transform duration-300 hover:rotate-360"
				>
					<Undo2 strokeWidth={1.5} size={32} color="#fd1c23" />
				</Link>
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
						<p className="flex items-center justify-center gap-2 rounded border border-red-900 bg-red-300 p-4 text-red-900">
							<OctagonX />
							An error has occurred. Please try again later.
						</p>
					)}
					{scenarios?.map((scn) => (
						<Link
							key={scn.id}
							to={`/scenario/${scn.id}`}
							className="relative overflow-hidden rounded shadow transition-transform hover:scale-105 active:scale-95"
						>
							<img
								src={scn.imgUrl}
								alt={scn.name}
								className="size-full object-cover"
							/>
							<h2 className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 text-6xl text-shadow-md/30">
								{scn.name}
							</h2>
						</Link>
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
