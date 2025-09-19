import type { Character } from '~/types'

export default function TargetButton({
	character,
	onClick,
}: {
	character: Character
	onClick: () => void
}) {
	const handleClick = () => {
		onClick()
	}

	return (
		<button
			type="button"
			className="flex cursor-pointer items-center gap-2 p-2 font-medium text-neutral-100 hover:bg-neutral-300/70"
			onClick={handleClick}
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
