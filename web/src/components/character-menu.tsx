import { useCanvasClickStore } from '~/stores/use-canvas-click-store'
import type { Character } from '~/types'
import { useActiveCharacters } from '~hooks/use-active-characters'
import { useMenuHiding } from '~hooks/use-menu-hiding'
import CanvasItem from './canvas-item'
import CharacterButton from './character-button'

interface CharacterMenuProps {
	characters: Character[]
}

export default function CharacterMenu({ characters }: CharacterMenuProps) {
	const { activeCharacters } = useActiveCharacters(characters)
	const hidden = useMenuHiding()
	const x = useCanvasClickStore((state) => state.x)
	const y = useCanvasClickStore((state) => state.y)

	return (
		<CanvasItem x={x + 100} y={y} hidden={hidden} className="z-10">
			<div role="menu" className="flex flex-col rounded bg-neutral-700/70">
				{activeCharacters.map((char) => (
					<CharacterButton key={char.id} character={char} />
				))}
			</div>
		</CanvasItem>
	)
}
