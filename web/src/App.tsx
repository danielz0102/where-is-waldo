import '@fontsource/indie-flower'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router'
import Landing from '~pages/Landing'
import Level from '~pages/Level'
import SelectLevel from '~pages/SelectLevel'

const queryClient = new QueryClient()

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Landing />} />
					<Route path="/select-level" element={<SelectLevel />} />
					<Route path="/game" element={<Level name="Beach" />} />
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	)
}

export default App
