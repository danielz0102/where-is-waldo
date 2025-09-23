import type { Character } from '~/types'
import { useCanvasClick } from '~hooks/use-canvas-click'
import { useMenuHiding } from '~hooks/use-menu-hiding'
import CanvasItem from './canvas-item'
import CharacterButton from './character-button'

interface CharacterMenuProps {
	characters: Character[]
}

export default function CharacterMenu({ characters }: CharacterMenuProps) {
	const { x, y } = useCanvasClick()
	const hidden = useMenuHiding()

	return (
		<CanvasItem x={x + 100} y={y} hidden={hidden}>
			<div role="menu" className="flex flex-col rounded bg-neutral-700/70">
				{characters.map((char) => (
					<CharacterButton key={char.id} character={char} />
				))}
			</div>
		</CanvasItem>
	)
}
