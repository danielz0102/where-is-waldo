import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CharacterService from '~services/CharacterService'
import { createRandomCharacter } from '~tests/utils/fakeData'
import CharacterButton from '.'

const fakeCharacter = createRandomCharacter()

vi.mock('~services/CharacterService', () => ({
	default: {
		checkClick: vi.fn(
			() => new Promise((resolve) => setTimeout(() => resolve(true), 500))
		),
	},
}))

const CheckClickMock = vi.mocked(CharacterService.checkClick)

test('renders a button with character name', () => {
	render(<CharacterButton character={fakeCharacter} onSuccess={() => {}} />)
	expect(
		screen.queryByRole('button', { name: new RegExp(fakeCharacter.name, 'i') })
	).toBeInTheDocument()
})

test('shows loading state when checking click', async () => {
	const user = userEvent.setup()
	const button = renderButton()

	await user.click(button)

	expect(button).toHaveTextContent(/loading/i)
})

test('shows success state when click is correct', async () => {
	CheckClickMock.mockResolvedValueOnce(true)
	const user = userEvent.setup()
	const button = renderButton()

	await user.click(button)

	expect(button).toHaveTextContent(/correct/i)
})

test('shows error state when click is wrong', async () => {
	CheckClickMock.mockResolvedValueOnce(false)
	const user = userEvent.setup()
	const button = renderButton()

	await user.click(button)

	expect(button).toHaveTextContent(/wrong/i)
})

test('calls onSuccess callback when click is correct', async () => {
	CheckClickMock.mockResolvedValueOnce(true)
	const user = userEvent.setup()
	const onSuccessMock = vi.fn()
	const button = renderButton(onSuccessMock)

	await user.click(button)

	expect(onSuccessMock).toHaveBeenCalledWith(fakeCharacter.id)
})

test('disables button during loading state', async () => {
	const user = userEvent.setup()
	const button = renderButton()

	await user.click(button)

	expect(button).toBeDisabled()
})

test('disables button after successful click', async () => {
	CheckClickMock.mockResolvedValueOnce(true)
	const user = userEvent.setup()
	const button = renderButton()

	await user.click(button)

	expect(button).toHaveTextContent(/correct/i)
	expect(button).toBeDisabled()
})

test.skip('resets after showing error', async () => {
	CheckClickMock.mockResolvedValueOnce(false)
	const user = userEvent.setup()
	const button = renderButton()

	await user.click(button)

	expect(button).toHaveTextContent(/wrong/i)

	await waitFor(
		() => {
			expect(button).toHaveTextContent(new RegExp(fakeCharacter.name, 'i'))
		},
		{ timeout: 1500 }
	)
})

function renderButton(onSuccess = () => {}) {
	render(<CharacterButton character={fakeCharacter} onSuccess={onSuccess} />)

	return screen.getByRole('button', {
		name: new RegExp(fakeCharacter.name, 'i'),
	})
}
