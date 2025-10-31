import { act, renderHook } from '@testing-library/react'
import { useLevelStore } from '..'

beforeEach(() => {
	vi.useFakeTimers()
	useLevelStore.getState().reset()
})

test('initializes win to false', () => {
	const { result } = renderHook(() => useLevelStore())
	expect(result.current.win).toBe(false)
})

describe('setWin', () => {
	it('sets win to true', () => {
		const { result } = renderHook(() => useLevelStore())

		act(() => {
			result.current.setWin()
		})

		expect(result.current.win).toBe(true)
	})

	it('pauses the timer', () => {
		const { result } = renderHook(() => useLevelStore())

		act(() => {
			result.current.resumeTimer()
			vi.advanceTimersByTime(3000)
			result.current.setWin()
			vi.advanceTimersByTime(5000)
		})

		expect(result.current.seconds).toBe(3)
	})
})

describe('reset', () => {
	it('resets the store to its initial state', () => {
		const { result } = renderHook(() => useLevelStore())

		act(() => {
			result.current.resumeTimer()
			result.current.setWin()
			vi.advanceTimersByTime(5000)
			result.current.reset()
		})

		expect(result.current.win).toBe(false)
		expect(result.current.seconds).toBe(0)
	})
})
