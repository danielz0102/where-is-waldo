import { QueryClient } from '@tanstack/react-query'
import { act, renderHook, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useLevelStore } from '~/stores/levelStore'
import { isTop10 } from '~/useCases/isTop10'
import { Renderer } from '~tests/utils/Renderer'
import WinnerModal from '.'

vi.mock('~/useCases/isTop10', () => ({
	isTop10: vi.fn(() => Promise.resolve(true)),
}))

vi.mock('../ScoreForm', () => ({
	default: () => <div data-testid="score-form">Score Form</div>,
}))

const isTop10Mock = vi.mocked(isTop10)
const fakeScenarioId = crypto.randomUUID()
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
})
const renderer = new Renderer().withQueryProvider(queryClient)

const renderModal = () => {
	const { result } = renderHook(() => useLevelStore())

	act(() => {
		result.current.setWin()
	})

	const renderResult = renderer.render(
		<WinnerModal scenarioId={fakeScenarioId} />
	)

	return { ...renderResult, store: result }
}

beforeEach(() => {
	const { result } = renderHook(() => useLevelStore())

	act(() => {
		result.current.reset()
	})

	queryClient.clear()
})

test('does not render when win is false', () => {
	renderer.render(<WinnerModal scenarioId={fakeScenarioId} />)
	const dialog = screen.getByRole('dialog', { hidden: true })
	expect(dialog).not.toBeVisible()
})

test('renders when win is true', () => {
	renderModal()
	const dialog = screen.getByRole('dialog')
	expect(dialog).toBeVisible()
})

test('displays the formatted time', async () => {
	const { store } = renderModal()

	const timeElement = screen.getByRole('time')
	expect(timeElement).toBeVisible()
	expect(timeElement).toHaveTextContent(store.current.getTimeFormatted())
})

test('shows loading state while checking if score is top 10', async () => {
	isTop10Mock.mockImplementationOnce(() => new Promise(() => {}))
	renderModal()
	expect(await screen.findByText(/loading/i)).toBeVisible()
})

test('displays top 10 badge when score is in top 10', async () => {
	renderModal()
	expect(await screen.findByText(/top 10/i)).toBeVisible()
})

test('does not render top 10 badge when score is not in top 10', async () => {
	isTop10Mock.mockResolvedValueOnce(false)
	renderModal()
	expect(screen.queryByText(/top 10/i)).not.toBeInTheDocument()
})

test('renders score form when score is top 10', async () => {
	renderModal()
	expect(await screen.findByTestId('score-form')).toBeVisible()
})

test('does not render score form when score is not top 10', async () => {
	isTop10Mock.mockResolvedValue(false)
	renderModal()
	expect(screen.queryByTestId('score-form')).not.toBeInTheDocument()
})

test('does not render score form during loading', async () => {
	isTop10Mock.mockImplementationOnce(() => new Promise(() => {}))
	renderModal()
	expect(await screen.findByText(/loading/i)).toBeVisible()
	expect(screen.queryByTestId('score-form')).not.toBeInTheDocument()
})

test('resets store and resumes timer when play again is clicked', async () => {
	const user = userEvent.setup()
	const { store } = renderModal()

	const playAgainButton = await screen.findByRole('button', {
		name: /play again/i,
	})
	await user.click(playAgainButton)

	expect(store.current.win).toBe(false)
	expect(store.current.seconds).toBe(0)
})
