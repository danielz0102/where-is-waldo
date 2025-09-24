import { create } from 'zustand'
import type { Character } from '~/types'

interface CharacterSelection {
	success: boolean
	characterSelected: Character | null
	selectionCount: number
	update: UpdateFunction
	reset: () => void
}

type UpdateFunction = ({
	success,
	character,
}: {
	success: boolean
	character: Character
}) => void

export const useCharacterSelectionStore = create<CharacterSelection>(
	(set, get, store) => ({
		success: false,
		characterSelected: null,
		selectionCount: 0,
		update: ({ success, character }) => {
			const { selectionCount } = get()
			set({
				success,
				characterSelected: character,
				selectionCount: selectionCount + 1,
			})
		},
		reset: () => {
			set(store.getInitialState())
		},
	})
)
