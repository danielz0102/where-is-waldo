import clsx from 'clsx'
import { CircleOff } from 'lucide-react'
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

function CharacterButton({ character }: CharacterButtonProps) {
	const x = useLevelStore((state) => state.normX)
	const y = useLevelStore((state) => state.normY)
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

	const handleClick = () => {
		click.execute({ x, y, id: character.id })
	}

	return (
		<button
			key={character.id}
			type="button"
			onClick={handleClick}
			className={clsx(
				'flex min-h-16 cursor-pointer select-none items-center gap-2 p-2 font-medium text-neutral-100 transition-colors hover:bg-neutral-300/70',
				{ 'bg-red-900/70': click.result === false },
				{ 'bg-green-500/70': click.result }
			)}
			disabled={click.loading || click.result}
			onTransitionEnd={() => {
				click.reset()
			}}
		>
			<div className="flex basis-10 items-center justify-center">
				{click.result === false && <CircleOff className="text-red-400" />}
				{click.status === 'not-requested' && (
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
