import '@fontsource/indie-flower'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router'
import LandingPage from '~/pages/landing'
import Level from '~/pages/level'

const queryClient = new QueryClient()

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/game" element={<Level name="Beach" />} />
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	)
}

export default App
