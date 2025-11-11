import axios from 'axios'
import Overlay from '~components/Overlay'

export default function ErrorFallback({ error }: { error: Error }) {
	const errorTitle = (() => {
		if (error instanceof axios.AxiosError) {
			return `Error ${error.status}`
		}

		return 'An unexpected error occurred'
	})()

	const errorMessage = (() => {
		if (error instanceof axios.AxiosError && error.status === 404) {
			return 'The resource you are looking for could not be found.'
		}

		return 'Sorry, something went wrong. Please try again later.'
	})()

	return (
		<Overlay className="flex flex-col items-center justify-center">
			<main className="text-center">
				<h1 className="mb-6 font-bold text-4xl">{errorTitle}</h1>
				<p className="mb-2 text-gray-600">{errorMessage}</p>
				<a
					href="/"
					className="font-semibold text-blue-500 underline hover:underline"
				>
					Go back to home
				</a>
			</main>
		</Overlay>
	)
}
