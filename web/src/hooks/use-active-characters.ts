import { useEffect, useState } from 'react'
import type { Character } from '~/types'

export function useActiveCharacters(
	characters: Character[] | null | undefined
) {
	const [activeCharacters, setActiveCharacters] = useState<Character[]>(
		characters || []
	)

	useEffect(() => {
		if (characters) {
			setActiveCharacters(characters)
		}
	}, [characters])

	return { activeCharacters, setActiveCharacters }
}
