import { useCanvasClickStore } from '~/stores/use-canvas-click-store'
import { useCharacterSelectionStore } from '~/stores/use-character-selection-store'
import type { Character } from '~/types'
import { checkClick } from '~services/characters-service'

interface CharacterButtonProps {
	character: Character
}

export default function CharacterButton({ character }: CharacterButtonProps) {
	const normX = useCanvasClickStore((state) => state.normX)
	const normY = useCanvasClickStore((state) => state.normY)
	const update = useCharacterSelectionStore((state) => state.update)

	const handleClick = async () => {
		const isCorrect = await checkClick({
			id: character.id,
			x: normX,
			y: normY,
		})

		update({ success: isCorrect, character })
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
