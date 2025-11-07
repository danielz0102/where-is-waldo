import { renderHook } from '@testing-library/react'
import { act } from 'react'
import { useLevelStore } from '..'

beforeEach(() => {
	vi.useFakeTimers()
	useLevelStore.getState().reset()
})

test('initializes the timer paused at 0 seconds', () => {
	const { result } = renderHook(() => useLevelStore())

	expect(result.current.seconds).toBe(0)

	vi.advanceTimersByTime(5000)

	expect(result.current.seconds).toBe(0)
})

describe('resumeTimer', () => {
	it('inits the timer', () => {
		const { result } = renderHook(() => useLevelStore())
		result.current.resumeTimer()

		act(() => {
			vi.advanceTimersByTime(3000)
		})

		expect(result.current.seconds).toBe(3)
	})
})

describe('pauseTimer', () => {
	it('pauses the timer', () => {
		const { result } = renderHook(() => useLevelStore())
		result.current.resumeTimer()

		act(() => {
			vi.advanceTimersByTime(3000)
			result.current.pauseTimer()
			vi.advanceTimersByTime(5000)
		})

		expect(result.current.seconds).toBe(3)
	})
})

describe('resetTimer', () => {
	it('resets and pause the timer', () => {
		const { result } = renderHook(() => useLevelStore())
		result.current.resumeTimer()

		act(() => {
			vi.advanceTimersByTime(5000)
			result.current.resetTimer()
		})

		expect(result.current.seconds).toBe(0)

		act(() => {
			vi.advanceTimersByTime(3000)
		})

		expect(result.current.seconds).toBe(0)
	})
})

describe('getTimeFormatted', () => {
	it('returns the time in HH:MM:SS format', () => {
		const { result } = renderHook(() => useLevelStore())
		result.current.resumeTimer()

		act(() => {
			vi.advanceTimersByTime(125000) // 2 minutes and 5 seconds
		})

		expect(result.current.getTimeFormatted()).toBe('00:02:05')
	})
})
