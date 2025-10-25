import { type QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type RenderResult, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'

type Wrapper = ({
	children,
}: {
	children: React.ReactNode
}) => React.ReactElement

export class Renderer {
	private Wrapper: Wrapper | null = null

	withRouter(): Renderer {
		this.setNewWrapper(({ children }) => (
			<MemoryRouter>{children}</MemoryRouter>
		))
		return this
	}

	withQueryProvider(queryClient: QueryClient): Renderer {
		this.setNewWrapper(({ children }) => (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		))
		return this
	}

	render(component: React.ReactElement): RenderResult {
		if (!this.Wrapper) {
			return render(component)
		}

		return render(<this.Wrapper>{component}</this.Wrapper>)
	}

	private setNewWrapper(NewWrapper: Wrapper): void {
		if (!this.Wrapper) {
			this.Wrapper = NewWrapper
			return
		}

		const PreviousWrapper = this.Wrapper

		this.Wrapper = ({ children }) => (
			<NewWrapper>
				<PreviousWrapper>{children}</PreviousWrapper>
			</NewWrapper>
		)
	}
}
