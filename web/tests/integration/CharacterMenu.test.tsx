import { render, renderHook, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useLevelStore } from '~/stores/levelStore'
import CharacterMenu from '~components/CharacterMenu'
import { createRandomCharacters } from '~tests/utils/fakeData'

vi.mock('~services/CharacterService', () => ({
	default: {
		checkClick: vi.fn(() => Promise.resolve(true)),
	},
}))

const fakeCharacters = createRandomCharacters()

beforeEach(() => {
	const { result } = renderHook(() => useLevelStore())
	result.current.reset()
})

test('renders character buttons', () => {
	render(<CharacterMenu characters={fakeCharacters} />)

	fakeCharacters.forEach((character) => {
		expect(
			screen.queryByRole('button', { name: character.name })
		).toBeInTheDocument()
	})
})

test('set win when all characters are found', async () => {
	const user = userEvent.setup()

	const { result } = renderHook(() => useLevelStore())

	expect(result.current.win).toBe(false)

	render(<CharacterMenu characters={fakeCharacters} />)
	const clickPromises = fakeCharacters.map((character) => {
		return user.click(
			screen.getByRole('button', {
				name: character.name,
			})
		)
	})

	await Promise.all(clickPromises)

	expect(result.current.win).toBe(true)
})
