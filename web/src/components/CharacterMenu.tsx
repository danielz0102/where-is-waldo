import { useRef } from 'react'
import { useLevelStore } from '~/stores/levelStore'
import type { Character } from '~/types'
import CharacterButton from './CharacterButton'

interface CharacterMenuProps {
	characters: Character[]
}

export default function CharacterMenu({ characters }: CharacterMenuProps) {
	const setWin = useLevelStore((state) => state.setWin)
	const charactersRef = useRef(
		characters.map((c) => ({ id: c.id, found: false }))
	)

	const handleSuccess = (id: string) => {
		const char = charactersRef.current.find((c) => c.id === id)
		if (char) char.found = true

		const allFound = charactersRef.current.every((c) => c.found)

		if (allFound) {
			setWin(true)
		}
	}

	return (
		<div
			role="menu"
			className="flex min-w-32 flex-col rounded bg-neutral-700/70"
		>
			{characters.map((char) => (
				<CharacterButton
					key={char.id}
					character={char}
					onSuccess={handleSuccess}
				/>
			))}
		</div>
	)
}
