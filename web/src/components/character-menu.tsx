import type { Character } from '~/types'
import { useCanvasClick } from '~hooks/use-canvas-click'
import CanvasItem from './canvas-item'
import CharacterButton from './character-button'

export default function CharacterMenu({
	characters,
}: {
	characters: Character[]
}) {
	const { x, y, toggle } = useCanvasClick()

	return (
		<CanvasItem x={x + 100} y={y} hidden={!toggle}>
			<div role="menu" className="flex flex-col rounded bg-neutral-700/70">
				{characters.map((char) => (
					<CharacterButton key={char.id} character={char} />
				))}
			</div>
		</CanvasItem>
	)
}
