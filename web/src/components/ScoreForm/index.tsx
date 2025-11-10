import { useId } from 'react'
import ScoreQueries from '~/querys/ScoreQueries'

interface ScoreFormProps {
	scenarioId: string
	time: string
}

export default function ScoreForm({ scenarioId, time }: ScoreFormProps) {
	const usernameId = useId()
	const registerScore = ScoreQueries.useRegisterScoreMutation()

	const buttonText = (() => {
		if (registerScore.isPending) {
			return (
				<span className="flex items-center gap-2">
					Loading...
					<Spinner />
				</span>
			)
		}

		if (registerScore.isSuccess) {
			return 'Score Submitted!'
		}

		return 'Submit'
	})()

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const formData = new FormData(event.currentTarget)
		const username = formData.get('username')

		if (!username) {
			throw new Error('Username is required')
		}

		registerScore.mutate({ scenarioId, time, username: username.toString() })
	}

	return (
		<form className="flex flex-col gap-2" action="" onSubmit={handleSubmit}>
			<h3 className="text-2xl">Submit your score</h3>
			<div className="flex flex-col gap-2">
				<input
					className="flex-1 rounded border border-neutral-500 px-2 py-1 disabled:opacity-50"
					id={usernameId}
					type="text"
					name="username"
					placeholder="Username"
					disabled={registerScore.isSuccess}
					required
				/>
				{registerScore.isSuccess ? (
					<p className="text-green-700">Your score has been submitted!</p>
				) : (
					<button
						type="submit"
						disabled={registerScore.isPending}
						className="flex cursor-pointer items-center justify-center rounded border border-neutral-500 bg-neutral-800 px-2 py-1 text-white hover:bg-neutral-50 hover:text-neutral-900 focus:bg-neutral-50 focus:text-neutral-900 focus:outline-none disabled:cursor-not-allowed disabled::opacity-50"
					>
						{buttonText}
					</button>
				)}
			</div>
		</form>
	)
}

function Spinner() {
	return (
		<span className="inline-block h-4 w-4 animate-iteration-count-infinite animate-spin-clockwise rounded-full border-4 border-neutral-200 border-t-neutral-800" />
	)
}
