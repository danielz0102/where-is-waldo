import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Scenario from '~components/Scenario'

const queryClient = new QueryClient()

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Scenario />
		</QueryClientProvider>
	)
}

export default App
