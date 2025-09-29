import type { Character } from '~/types'

interface CharacterMenuProps {
	characters: Character[]
	onSelect: (character: Character) => void
}

export default function CharacterMenu({
	characters,
	onSelect,
}: CharacterMenuProps) {
	return (
		<div role="menu" className="flex flex-col rounded bg-neutral-700/70">
			{characters.map((char) => (
				<CharacterButton key={char.id} character={char} onClick={onSelect} />
			))}
		</div>
	)
}

interface CharacterButtonProps {
	character: Character
	onClick: (character: Character) => void
}

function CharacterButton({ character, onClick }: CharacterButtonProps) {
	return (
		<button
			key={character.id}
			type="button"
			onClick={() => onClick(character)}
			className="flex min-w-[100px] cursor-pointer items-center justify-center gap-2 p-2 font-medium text-neutral-100 hover:bg-neutral-300/70"
		>
			<img
				className="size-10 object-cover object-top"
				src={character.imgUrl}
				alt=""
			/>
			<span>{character.name}</span>
		</button>
	)
}
