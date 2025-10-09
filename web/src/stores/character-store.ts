import { create } from 'zustand'
import type { Character } from '~/types'
import CharacterService from '~services/CharacterService'

interface CharacterState {
	characters: Character[]
	lastOne: {
		successful: boolean
		character: Character | null
	}
	update: (characters: Character[]) => void
	select: (params: { character: Character; x: number; y: number }) => void
	reset: () => void
}

export const characterStore = create<CharacterState>((set, _, store) => ({
	characters: [],
	lastOne: {
		successful: false,
		character: null,
	},
	selections: 0,
	update: (characters) => set({ characters }),
	select: async ({ character, x, y }) => {
		const isCorrect = await CharacterService.checkClick({
			id: character.id,
			x,
			y,
		})

		set(() => ({
			lastOne: { successful: isCorrect, character },
		}))

		if (isCorrect) {
			set((state) => ({
				characters: state.characters.filter((c) => c.id !== character.id),
			}))
		}
	},
	reset: () => {
		set(store.getInitialState())
	},
}))
