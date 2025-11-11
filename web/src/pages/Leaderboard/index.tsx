import { Trophy } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { useLeaderboardQuery } from '~/querys/useLeaderboardQuery'
import type { Score } from '~/types'
import HomeLink from '~components/HomeLink'
import MainLayout from '~components/layouts/MainLayout'

export default function Leaderboard() {
	const { scenarioSlug } = useParams<{ scenarioSlug: string }>()

	if (!scenarioSlug) {
		throw new Error('scenarioSlug is required')
	}

	const { data } = useLeaderboardQuery(scenarioSlug)

	if (!data) {
		return (
			<MainLayout>
				<p>Loading...</p>
			</MainLayout>
		)
	}

	return (
		<div className="flex min-h-screen flex-col gap-4 bg-gradient-to-br from-blue-100 to-red-100 p-4">
			<nav>
				<HomeLink />
			</nav>
			<main className="flex flex-col items-center justify-center gap-4">
				<h1 className="font-semibold text-4xl">
					{data.scenario.name} Leaderboard
				</h1>
				{data.scores.length === 0 ? (
					<p className="text-center text-gray-600">
						There are no scores yet.{' '}
						<Link
							className="text-blue-600 underline"
							to={`/scenario/${data.scenario.slug}`}
						>
							Be the first one!
						</Link>
					</p>
				) : (
					<ScoresTable scores={data.scores} />
				)}
			</main>
		</div>
	)
}

function ScoresTable({ scores }: { scores: Score[] }) {
	return (
		<table className="w-full max-w-2xl table-fixed border-collapse border border-slate-400 text-center font-sans [&_th,_td]:p-1">
			<thead>
				<tr className="bg-gray-300 *:font-medium *:text-2xl">
					<th scope="col">Rank</th>
					<th scope="col">User</th>
					<th scope="col">Time</th>
				</tr>
			</thead>
			<tbody>
				{scores.map((score, index) => {
					const trophy = (() => {
						if (index === 0) return <Trophy strokeWidth={1} fill="#FFD700" />
						if (index === 1) return <Trophy strokeWidth={1} fill="#C0C0C0" />
						if (index === 2) return <Trophy strokeWidth={1} fill="#CD7F32" />
						return null
					})()

					return (
						<tr key={score.id}>
							<td className="flex items-center justify-center gap-2">
								{trophy} {index + 1}
							</td>
							<td>{score.username}</td>
							<td>{score.time}</td>
						</tr>
					)
				})}
			</tbody>
		</table>
	)
}
