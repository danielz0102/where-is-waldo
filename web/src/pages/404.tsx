import { Link } from 'react-router'
import Overlay from '~components/Overlay'

export default function NotFound() {
	return (
		<Overlay className="flex flex-col items-center justify-center">
			<main className="text-center">
				<h1 className="mb-6 font-bold text-4xl">404 - Not Found</h1>
				<p className="mb-2 text-gray-600">
					The page you are looking for does not exist.
				</p>
				<Link
					to="/"
					className="font-semibold text-blue-500 underline hover:underline"
				>
					Go back to home
				</Link>
			</main>
		</Overlay>
	)
}
