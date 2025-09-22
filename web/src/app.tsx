import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Level from '~/pages/level'

const queryClient = new QueryClient()

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Level name="Beach" />
		</QueryClientProvider>
	)
}

export default App
