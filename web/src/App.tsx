import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Level from '~/pages/Level'

const queryClient = new QueryClient()

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Level />
		</QueryClientProvider>
	)
}

export default App
