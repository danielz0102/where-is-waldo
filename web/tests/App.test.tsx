import { render } from '@testing-library/react'
import App from '@/App'

describe('App', () => {
	it('should render correctly', () => {
		const { queryByText } = render(<App />)
		expect(queryByText('Hello World')).toBeInTheDocument()
	})
})
