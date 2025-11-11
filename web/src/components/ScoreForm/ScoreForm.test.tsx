import { QueryClient } from '@tanstack/react-query'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ScoreService from '~services/ScoreService'
import { createRandomScore } from '~tests/utils/fakeData'
import { Renderer } from '~tests/utils/Renderer'
import ScoreForm from '.'

vi.mock('~services/ScoreService', () => ({
	default: {
		registerScore: vi.fn(),
	},
}))

const registerScoreMock = vi.mocked(ScoreService.registerScore)
const fakeScenarioId = crypto.randomUUID()
const fakeTime = '00:05:23'
const fakeScore = createRandomScore()

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
		mutations: {
			retry: false,
		},
	},
})
const renderer = new Renderer().withQueryProvider(queryClient)

const renderScoreForm = () => {
	return renderer.render(
		<ScoreForm scenarioId={fakeScenarioId} time={fakeTime} />
	)
}

beforeEach(() => {
	registerScoreMock.mockResolvedValue(fakeScore)
	queryClient.clear()
})

test('renders form with all required elements', () => {
	renderScoreForm()

	expect(
		screen.getByRole('heading', { name: /submit your score/i })
	).toBeInTheDocument()

	const usernameInput = screen.getByPlaceholderText(/username/i)
	expect(usernameInput).toBeVisible()
	expect(usernameInput).toHaveAttribute('type', 'text')
	expect(usernameInput).toHaveAttribute('name', 'username')
	expect(usernameInput).toHaveAttribute('required')
	expect(usernameInput).not.toBeDisabled()

	const submitButton = screen.getByRole('button', { name: /submit/i })
	expect(submitButton).toBeVisible()
	expect(submitButton).toHaveAttribute('type', 'submit')
})

test('calls mutation with correct data when form is submitted', async () => {
	const user = userEvent.setup()
	renderScoreForm()

	const usernameInput = screen.getByPlaceholderText(/username/i)
	const submitButton = screen.getByRole('button', { name: /submit/i })

	await user.type(usernameInput, 'TestUser123')
	await user.click(submitButton)

	expect(registerScoreMock).toHaveBeenCalledWith({
		scenarioId: fakeScenarioId,
		time: fakeTime,
		username: 'TestUser123',
	})
	expect(registerScoreMock).toHaveBeenCalledTimes(1)
})

test('shows loading state during mutation', async () => {
	registerScoreMock.mockImplementationOnce(() => new Promise(() => {}))
	const user = userEvent.setup()
	renderScoreForm()

	const usernameInput = screen.getByPlaceholderText(/username/i)
	const submitButton = screen.getByRole('button', { name: /submit/i })
	await user.type(usernameInput, 'TestUser123')
	await user.click(submitButton)

	expect(submitButton).toHaveTextContent(/loading/i)
	expect(submitButton).toBeDisabled()
})

test('shows success state after successful submission', async () => {
	const user = userEvent.setup()
	renderScoreForm()

	const usernameInput = screen.getByPlaceholderText(/username/i)
	const submitButton = screen.getByRole('button', { name: /submit/i })
	await user.type(usernameInput, 'TestUser123')
	await user.click(submitButton)

	expect(screen.getByText(/score.*submitted|submitted.*score/i)).toBeVisible()
	expect(usernameInput).toBeDisabled()
	expect(
		screen.queryByRole('button', { name: /submit/i })
	).not.toBeInTheDocument()
})
