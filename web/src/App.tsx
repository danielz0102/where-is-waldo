import '@fontsource/indie-flower'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router'
import NotFound from '~pages/404'
import Landing from '~pages/Landing'
import Level from '~pages/Level'
import SelectScenario from '~pages/SelectScenario'

const queryClient = new QueryClient()

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Landing />} />
					<Route path="/select-scenario" element={<SelectScenario />} />
					<Route path="/scenario/:slug" element={<Level />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	)
}

export default App
