import { renderHook } from '@testing-library/react'
import { act } from 'react'
import { useLevelStore } from '..'

beforeEach(() => {
	vi.useFakeTimers()
	useLevelStore.getState().reset()
})

test('initializes timer paused at 0 seconds', () => {
	const { result } = renderHook(() => useLevelStore())

	expect(result.current.seconds).toBe(0)

	vi.advanceTimersByTime(5000)

	expect(result.current.seconds).toBe(0)
})

test('inits the timer with resumeTimer', () => {
	const { result } = renderHook(() => useLevelStore())
	result.current.resumeTimer()

	act(() => {
		vi.advanceTimersByTime(3000)
	})

	expect(result.current.seconds).toBe(3)
})

test('pauses the timer with pauseTimer', () => {
	const { result } = renderHook(() => useLevelStore())
	result.current.resumeTimer()

	act(() => {
		vi.advanceTimersByTime(3000)
		result.current.pauseTimer()
		vi.advanceTimersByTime(5000)
	})

	expect(result.current.seconds).toBe(3)
})

test('resets and pause the timer with resetTimer', () => {
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
