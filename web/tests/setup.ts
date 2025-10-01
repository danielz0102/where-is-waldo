import * as matchers from '@testing-library/jest-dom/matchers'
import { cleanup } from '@testing-library/react'
import { afterAll, afterEach, beforeAll, expect } from 'vitest'
import { server } from './mocks/node'

expect.extend(matchers)

afterEach(() => {
	cleanup()
})

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())
