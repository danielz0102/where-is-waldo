import { QueryClient } from '@tanstack/react-query'
import { act, renderHook, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useLevelStore } from '~/stores/levelStore'
import * as isTop10UseCase from '~/useCases/isTop10'
import { Renderer } from '~tests/utils/Renderer'
import WinnerModal from '.'

vi.mock('~/useCases/isTop10', () => ({
	isTop10: vi.fn(() => Promise.resolve(true)),
}))

vi.mock('../ScoreForm', () => ({
	default: () => <div data-testid="score-form">Score Form</div>,
}))

const isTop10Mock = vi.mocked(isTop10UseCase.isTop10)
const fakeScenarioId = crypto.randomUUID()

beforeEach(() => {
	const { result } = renderHook(() => useLevelStore())
	result.current.reset()

	isTop10Mock.mockClear()
	isTop10Mock.mockResolvedValue(true)
})

test('does not render when win is false', () => {
	renderModal()

	const dialog = screen.getByRole('dialog', { hidden: true })
	expect(dialog).not.toBeVisible()
})

test('renders when win is true', () => {
	const { result } = renderHook(() => useLevelStore())

	act(() => {
		result.current.setWin()
	})

	renderModal()

	const dialog = screen.getByRole('dialog')
	expect(dialog).toBeVisible()
})

test('displays the formatted time', async () => {
	const { result } = renderHook(() => useLevelStore())

	act(() => {
		result.current.setWin()
	})

	renderModal()

	await waitFor(() => {
		expect(screen.getByText(/your time:/i)).toBeInTheDocument()
	})

	const timeElement = screen.getByRole('time')
	expect(timeElement).toHaveTextContent(result.current.getTimeFormatted())
})

test('shows loading state while checking if score is top 10', async () => {
	const { result } = renderHook(() => useLevelStore())

	// Make isTop10 pending
	isTop10Mock.mockImplementation(
		() => new Promise((resolve) => setTimeout(() => resolve(true), 1000))
	)

	act(() => {
		result.current.setWin()
	})

	renderModal()

	await waitFor(() => {
		expect(screen.getByText(/loading/i)).toBeInTheDocument()
	})
})

test('displays top 10 badge when score is in top 10', async () => {
	const { result } = renderHook(() => useLevelStore())

	act(() => {
		result.current.setWin()
	})

	renderModal()

	await waitFor(() => {
		expect(screen.getByText(/top 10/i)).toBeInTheDocument()
	})
})

test('does not display top 10 badge when score is not in top 10', async () => {
	const { result } = renderHook(() => useLevelStore())
	isTop10Mock.mockResolvedValueOnce(false)

	act(() => {
		result.current.setWin()
	})

	renderModal()

	await waitFor(() => {
		expect(screen.queryByText(/top 10/i)).not.toBeInTheDocument()
	})
})

test('renders score form when score is top 10', async () => {
	const { result } = renderHook(() => useLevelStore())

	act(() => {
		result.current.setWin()
	})

	renderModal()

	await waitFor(() => {
		expect(screen.getByTestId('score-form')).toBeInTheDocument()
	})
})

test('does not render score form when score is not top 10', async () => {
	const { result } = renderHook(() => useLevelStore())
	isTop10Mock.mockResolvedValue(false)

	act(() => {
		result.current.setWin()
	})

	renderModal()

	await waitFor(() => {
		expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
	})

	expect(screen.queryByTestId('score-form')).not.toBeInTheDocument()
})

test('does not render score form during loading', async () => {
	const { result } = renderHook(() => useLevelStore())

	isTop10Mock.mockImplementation(
		() => new Promise((resolve) => setTimeout(() => resolve(true), 1000))
	)

	act(() => {
		result.current.setWin()
	})

	renderModal()

	await waitFor(() => {
		expect(screen.getByText(/loading/i)).toBeInTheDocument()
	})

	expect(screen.queryByTestId('score-form')).not.toBeInTheDocument()
})

test('resets store and resumes timer when play again is clicked', async () => {
	const user = userEvent.setup()
	const { result } = renderHook(() => useLevelStore())

	act(() => {
		result.current.setWin()
	})

	renderModal()

	await waitFor(() => {
		expect(
			screen.getByRole('button', { name: /play again/i })
		).toBeInTheDocument()
	})

	expect(result.current.win).toBe(true)

	const playAgainButton = screen.getByRole('button', { name: /play again/i })
	await user.click(playAgainButton)

	expect(result.current.win).toBe(false)
})

test('does not show play again button during loading', async () => {
	const { result } = renderHook(() => useLevelStore())

	isTop10Mock.mockImplementation(
		() => new Promise((resolve) => setTimeout(() => resolve(true), 1000))
	)

	act(() => {
		result.current.setWin()
	})

	renderModal()

	await waitFor(() => {
		expect(screen.getByText(/loading/i)).toBeInTheDocument()
	})

	expect(
		screen.queryByRole('button', { name: /play again/i })
	).not.toBeInTheDocument()
})

function renderModal() {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	})

	return new Renderer()
		.withQueryProvider(queryClient)
		.render(<WinnerModal scenarioId={fakeScenarioId} />)
}
