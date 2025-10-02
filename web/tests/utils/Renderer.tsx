import { type QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type RenderResult, render } from '@testing-library/react'
import type { ReactElement } from 'react'
import { MemoryRouter } from 'react-router'

export class Renderer {
	private useRouter = false
	private queryClient: QueryClient | undefined

	withRouter(): Renderer {
		this.useRouter = true
		return this
	}

	withQueryProvider(queryClient: QueryClient): Renderer {
		this.queryClient = queryClient
		return this
	}

	render(component: ReactElement): RenderResult {
		let wrappedComponent = component

		if (this.useRouter) {
			wrappedComponent = <MemoryRouter>{wrappedComponent}</MemoryRouter>
		}

		if (this.queryClient) {
			wrappedComponent = (
				<QueryClientProvider client={this.queryClient}>
					{wrappedComponent}
				</QueryClientProvider>
			)
		}

		return render(wrappedComponent)
	}
}
