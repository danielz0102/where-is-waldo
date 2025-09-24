import { create } from 'zustand'

type CharacterSelection = {
	success: boolean
	selectionCount: number
	update: (success: boolean) => void
}

export const useCharacterSelection = create<CharacterSelection>((set, get) => {
	return {
		success: false,
		selectionCount: 0,
		update: (success) => {
			const { selectionCount } = get()
			set({
				success,
				selectionCount: selectionCount + 1,
			})
		},
	}
})
