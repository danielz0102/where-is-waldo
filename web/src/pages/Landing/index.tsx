import { Link } from 'react-router'
import Overlay from '~components/Overlay'
import Title from '~components/Title'

export default function Landing() {
	return (
		<Overlay className="flex items-center justify-center">
			<main className="mx-auto max-w-2xl text-center">
				<img
					className="mx-auto mb-6 size-75 object-contain"
					src="https://2cqqce459i.ufs.sh/f/AJOvo5K2Lyhx8fAhsCgdy2TGrODLX3m54PatAcsHqZfvBjRW"
					alt="Waldo Illustration"
				/>
				<Title>Where is Waldo?</Title>
				<p className="mb-8 text-gray-600 text-xl">
					Find the hidden characters in the scene and test your observation
					skills. Do it in record time to <strong>top the leaderboard</strong>!
				</p>
				<div className="space-y-4">
					<Link
						to="/select-scenario"
						className="inline-block rounded-lg bg-red-600 px-8 py-4 font-bold text-lg text-white shadow-lg transition-colors duration-200 hover:bg-red-700 hover:shadow-xl"
					>
						Start Playing
					</Link>
					<div className="text-gray-500 text-sm">
						Click to begin the challenge
					</div>
				</div>
			</main>
		</Overlay>
	)
}
