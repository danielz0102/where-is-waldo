import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'

export function renderWithRouter(component: React.ReactElement) {
	return render(<MemoryRouter>{component}</MemoryRouter>)
}
