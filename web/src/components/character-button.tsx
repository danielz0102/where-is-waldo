import { normalizeCoordinates } from '~/lib/normalize-coordinates'
import type { Character } from '~/types'
import { useCanvasClick } from '~hooks/use-canvas-click'
import { checkClick } from '~services/characters-service'

export default function CharacterButton({
	character,
}: {
	character: Character
}) {
	const { x, y, rect } = useCanvasClick()

	const handleClick = async () => {
		if (!rect) {
			throw new Error('No rect found')
		}

		const { x: normX, y: normY } = normalizeCoordinates({
			x,
			y,
			width: rect.width,
			height: rect.height,
		})

		const isCorrect = await checkClick({
			id: character.id,
			x: normX,
			y: normY,
		})
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
