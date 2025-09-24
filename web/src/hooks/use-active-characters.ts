import { useEffect, useState } from 'react'
import type { Character } from '~/types'
import { useCharacterSelectionStore } from '../stores/use-character-selection-store'

export function useActiveCharacters(
	characters: Character[] | null | undefined
) {
	const selectionCount = useCharacterSelectionStore(
		(state) => state.selectionCount
	)
	const success = useCharacterSelectionStore((state) => state.success)
	const characterSelected = useCharacterSelectionStore(
		(state) => state.characterSelected
	)
	const [activeCharacters, setActiveCharacters] = useState<Character[]>(
		characters || []
	)

	useEffect(() => {
		if (success && characterSelected) {
			setActiveCharacters((chars) =>
				chars.filter((c) => c.id !== characterSelected.id)
			)
		}
	}, [selectionCount])

	return { activeCharacters, setActiveCharacters }
}
