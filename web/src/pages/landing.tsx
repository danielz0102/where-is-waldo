import { Link } from 'react-router'

function LandingPage() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-red-100">
			<main className="mx-auto max-w-2xl px-6 py-2 text-center">
				<img
					className="mx-auto mb-6 size-75 object-contain"
					src="https://2cqqce459i.ufs.sh/f/AJOvo5K2Lyhx8fAhsCgdy2TGrODLX3m54PatAcsHqZfvBjRW"
					alt="Waldo Illustration"
				/>
				<h1 className="mb-6 font-bold text-6xl text-gray-800">
					Where is Waldo?
				</h1>
				<p className="mb-8 text-gray-600 text-xl">
					Find the hidden characters in the scene and test your observation
					skills. Do it in record time to <strong>top the leaderboard</strong>!
				</p>
				<div className="space-y-4">
					<Link
						to="/game"
						className="inline-block rounded-lg bg-red-600 px-8 py-4 font-bold text-lg text-white shadow-lg transition-colors duration-200 hover:bg-red-700 hover:shadow-xl"
					>
						Start Playing
					</Link>
					<div className="text-gray-500 text-sm">
						Click to begin the challenge
					</div>
				</div>
			</main>
		</div>
	)
}

export default LandingPage
