import { createContext, type MouseEvent } from 'react'
import type { Character, Scenario } from '~/types'

interface ScenarioContextValue {
	clickEvent: MouseEvent<HTMLCanvasElement> | null
	data: (Scenario & { characters: Character[] }) | null
}

export const ScenarioContext = createContext<ScenarioContextValue>({
	clickEvent: null,
	data: null,
})
