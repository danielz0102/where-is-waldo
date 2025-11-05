import clsx from 'clsx'
import { Check, CircleOff, LoaderCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLevelStore } from '~/stores/levelStore'
import type { Character } from '~/types'
import CharacterService from '~services/CharacterService'

interface CharacterButtonProps {
	character: Character
	onSuccess: (id: string) => void
}

type Feedback = 'idle' | 'loading' | 'success' | 'error'

export default function CharacterButton({
	character,
	onSuccess,
}: CharacterButtonProps) {
	const x = useLevelStore((state) => state.normX)
	const y = useLevelStore((state) => state.normY)
	const onReset = useLevelStore((state) => state.onReset)
	const [feedback, setFeedback] = useState<Feedback>('idle')

	const text = (() => {
		if (feedback === 'loading') return 'Loading...'
		if (feedback === 'error') return 'Wrong'
		if (feedback === 'success') return 'Correct!'
		return character.name
	})()

	const handleClick = async () => {
		setFeedback('loading')
		const result = await CharacterService.checkClick({ x, y, id: character.id })

		if (!result) {
			setFeedback('error')
			return setTimeout(() => setFeedback('idle'), 1000)
		}

		setFeedback('success')
		onSuccess(character.id)
	}

	useEffect(() => {
		onReset(() => {
			setFeedback('idle')
		})
	}, [])

	return (
		<button
			key={character.id}
			type="button"
			onClick={handleClick}
			className={clsx(
				'flex min-h-16 cursor-pointer select-none items-center gap-2 p-2 font-medium text-neutral-100 transition-colors hover:bg-neutral-300/70 disabled:cursor-not-allowed',
				{
					'bg-red-900/70': feedback === 'error',
					'bg-green-900/70': feedback === 'success',
					'animate-pulse bg-neutral-400/70': feedback === 'loading',
				}
			)}
			disabled={feedback === 'loading' || feedback === 'success'}
		>
			<div className="flex basis-10 items-center justify-center">
				{feedback === 'error' && <CircleOff className="text-red-400" />}
				{feedback === 'loading' && <LoaderCircle className="animate-spin" />}
				{feedback === 'success' && <Check className="text-green-300" />}
				{feedback === 'idle' && (
					<img
						className="size-10 object-cover object-top"
						src={character.imgUrl}
						alt=""
					/>
				)}
			</div>
			<span className="flex-1">{text}</span>
		</button>
	)
}
