import { useEffect, useState } from 'react'
import { characterStore } from '~/stores/character-store'
import type { Character } from '~/types'

export function useActiveCharacters(
	characters: Character[] | null | undefined
) {
	const selections = characterStore((state) => state.selections)
	const success = characterStore((state) => state.lastOne.successful)
	const characterSelected = characterStore((state) => state.lastOne.character)
	const [activeCharacters, setActiveCharacters] = useState<Character[]>(
		characters || []
	)

	useEffect(() => {
		if (success && characterSelected) {
			setActiveCharacters((chars) =>
				chars.filter((c) => c.id !== characterSelected.id)
			)
		}
	}, [selections])

	return { activeCharacters, setActiveCharacters }
}
