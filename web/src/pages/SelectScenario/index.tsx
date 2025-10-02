import { Undo2 } from 'lucide-react'
import { Link } from 'react-router'
import ScenarioQueries from '~/querys/ScenarioQueries'
import Title from '~ui/Title'

export default function SelectScenario() {
	const { data: scenarios } = ScenarioQueries.useGetAllQuery()

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
				<div className="flex flex-col gap-4">
					{scenarios?.map((scn) => (
						<a
							key={scn.id}
							href={`/scenario/${scn.id}`}
							className="relative max-w-2xl overflow-hidden rounded shadow transition-transform hover:scale-105 active:scale-95"
						>
							<img
								src={scn.imgUrl}
								alt={scn.name}
								className="size-full object-cover"
							/>
							<h2 className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 text-6xl text-shadow-md/30">
								{scn.name}
							</h2>
						</a>
					))}
				</div>
			</main>
		</div>
	)
}
