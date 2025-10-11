import { Link } from 'react-router'
import MainLayout from '~components/layouts/MainLayout'

export default function NotFound() {
	return (
		<MainLayout>
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
		</MainLayout>
	)
}
