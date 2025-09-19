import type { Character } from '~/types'
import TargetButton from './TargetButton'

export default function TargetsMenu({
	characters,
}: {
	characters: Character[]
}) {
	return (
		<div role="menu" className="flex flex-col rounded bg-neutral-700/70">
			{characters.map((character) => (
				<TargetButton
					key={character.id}
					character={character}
					onClick={() => {}}
				/>
			))}
		</div>
	)
}
