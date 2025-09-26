import { canvasClickStore } from '~/stores/canvas-click-store'
import { characterStore } from '~/stores/character-store'
import type { Character } from '~/types'

interface CharacterButtonProps {
	character: Character
}

export default function CharacterButton({ character }: CharacterButtonProps) {
	const normX = canvasClickStore((state) => state.normX)
	const normY = canvasClickStore((state) => state.normY)
	const select = characterStore((state) => state.select)

	const handleClick = async () => {
		select({ character, x: normX, y: normY })
	}

	return (
		<button
			key={character.id}
			type="button"
			onClick={handleClick}
			className="flex cursor-pointer items-center gap-2 p-2 font-medium text-neutral-100 hover:bg-neutral-300/70"
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
