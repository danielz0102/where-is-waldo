import type { Character } from '~/types'

export default function TargetsMenu({
	characters,
	onCharacterSelected,
}: {
	characters: Character[]
	onCharacterSelected: (character: Character) => void
}) {
	return (
		<div role="menu" className="flex flex-col rounded bg-neutral-700/70">
			{characters.map((character) => (
				<TargetButton
					key={character.id}
					character={character}
					onClick={() => onCharacterSelected(character)}
				/>
			))}
		</div>
	)
}

function TargetButton({
	character,
	onClick,
}: {
	character: Character
	onClick: () => void
}) {
	const handleClick = () => {
		onClick()
	}

	return (
		<button
			type="button"
			className="flex cursor-pointer items-center gap-2 p-2 font-medium text-neutral-100 hover:bg-neutral-300/70"
			onClick={handleClick}
		>
			<img
				className="size-10 object-cover object-top"
				src={character.imgUrl}
				alt=""
			/>
			{character.name}
		</button>
	)
}
