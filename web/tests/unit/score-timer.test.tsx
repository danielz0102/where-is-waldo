import { act, render, screen } from '@testing-library/react'
import ScoreTimer from '~/components/score-timer'

beforeEach(() => {
	vi.useFakeTimers()
})

afterEach(() => {
	vi.resetAllMocks()
})

test('starts at 00:00', () => {
	render(<ScoreTimer />)
	expect(screen.getByText('00:00')).toBeInTheDocument()
})

test('increases by default', () => {
	render(<ScoreTimer />)
	expect(screen.getByText('00:00')).toBeInTheDocument()

	act(() => {
		vi.advanceTimersByTime(1000)
	})

	expect(screen.getByText('00:01')).toBeInTheDocument()

	act(() => {
		vi.advanceTimersByTime(59000)
	})

	expect(screen.getByText('01:00')).toBeInTheDocument()
})

test('stop increasing when ended', () => {
	render(<ScoreTimer end />)
	expect(screen.getByText('00:00')).toBeInTheDocument()

	act(() => {
		vi.advanceTimersByTime(10000)
	})

	expect(screen.getByText('00:00')).toBeInTheDocument()
})
