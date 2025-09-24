import type { Character } from '~/types'
import { useCanvasClick } from '~hooks/use-canvas-click'
import { useCharacterSelection } from '~hooks/use-character-selection'
import { checkClick } from '~services/characters-service'

interface CharacterButtonProps {
	character: Character
}

export default function CharacterButton({ character }: CharacterButtonProps) {
	const { normX, normY } = useCanvasClick()
	const { update } = useCharacterSelection()

	const handleClick = async () => {
		const isCorrect = await checkClick({
			id: character.id,
			x: normX,
			y: normY,
		})

		update(isCorrect)
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
