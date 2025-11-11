import '@fontsource/indie-flower'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter, Route, Routes } from 'react-router'
import NotFound from '~pages/404'
import ErrorFallback from '~pages/ErrorFallback'
import Landing from '~pages/Landing'
import Leaderboard from '~pages/Leaderboard'
import Level from '~pages/Level'
import SelectScenario from '~pages/SelectScenario'

const queryClient = new QueryClient()

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ErrorBoundary FallbackComponent={ErrorFallback}>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Landing />} />
						<Route path="/select-scenario" element={<SelectScenario />} />
						<Route path="/scenario/:slug" element={<Level />} />
						<Route
							path="/leaderboard/:scenarioSlug"
							element={<Leaderboard />}
						/>
						<Route path="*" element={<NotFound />} />
					</Routes>
				</BrowserRouter>
			</ErrorBoundary>
		</QueryClientProvider>
	)
}

export default App
