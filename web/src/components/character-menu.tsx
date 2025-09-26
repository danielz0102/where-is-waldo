import { characterStore } from '~/stores/character-store'
import { useCanvasClickStore } from '~/stores/use-canvas-click-store'
import { useMenuHiding } from '~hooks/use-menu-hiding'
import CanvasItem from './canvas-item'
import CharacterButton from './character-button'

export default function CharacterMenu() {
	const characters = characterStore((state) => state.characters)
	const hidden = useMenuHiding()
	const x = useCanvasClickStore((state) => state.x)
	const y = useCanvasClickStore((state) => state.y)

	return (
		<CanvasItem x={x + 100} y={y} hidden={hidden} className="z-10">
			<div role="menu" className="flex flex-col rounded bg-neutral-700/70">
				{characters.map((char) => (
					<CharacterButton key={char.id} character={char} />
				))}
			</div>
		</CanvasItem>
	)
}
