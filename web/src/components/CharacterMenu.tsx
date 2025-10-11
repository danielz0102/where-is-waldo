import clsx from 'clsx'
import { Check, CircleOff, LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import CharacterQueries from '~/querys/CharacterQueries'
import { useLevelStore } from '~/stores/levelStore'
import type { Character } from '~/types'

interface CharacterMenuProps {
	characters: Character[]
}

export default function CharacterMenu({ characters }: CharacterMenuProps) {
	return (
		<div
			role="menu"
			className="flex min-w-32 flex-col rounded bg-neutral-700/70"
		>
			{characters.map((char) => (
				<CharacterButton key={char.id} character={char} />
			))}
		</div>
	)
}

interface CharacterButtonProps {
	character: Character
}

type FeedbackState = 'idle' | 'loading' | 'success' | 'error'

function CharacterButton({ character }: CharacterButtonProps) {
	const x = useLevelStore((state) => state.normX)
	const y = useLevelStore((state) => state.normY)
	const [feedback, setFeedback] = useState<FeedbackState>('idle')
	const click = CharacterQueries.useClickCallback()

	if (click.error) {
		throw new Error('An unexpected error occurred')
	}

	const text = (() => {
		if (click.loading) return 'Loading...'
		if (click.result === false) return 'Wrong'
		if (click.result === true) return 'Success!'
		return character.name
	})()

	const handleClick = async () => {
		setFeedback('loading')
		const result = await click.execute({ x, y, id: character.id })

		if (!result) {
			setFeedback('error')
			return setTimeout(() => setFeedback('idle'), 1000)
		}

		return setFeedback('success')
	}

	return (
		<button
			key={character.id}
			type="button"
			onClick={handleClick}
			className={clsx(
				'flex min-h-16 cursor-pointer select-none items-center gap-2 p-2 font-medium text-neutral-100 transition-colors hover:bg-neutral-300/70 disabled:cursor-not-allowed',
				{
					'bg-red-900/70': feedback === 'error',
					'bg-green-500/70': feedback === 'success',
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
