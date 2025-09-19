import type { Character } from '~/types'

export default function TargetsMenu({
	characters,
}: {
	characters: Character[]
}) {
	return (
		<div role="menu" className="flex flex-col rounded bg-neutral-700/70">
			{characters.map((character) => (
				<TargetButton key={character.id} character={character} />
			))}
		</div>
	)
}

function TargetButton({ character }: { character: Character }) {
	return (
		<button
			type="button"
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
