import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useCanvasClick } from '~hooks/use-canvas-click'
import Level from '~pages/level'
import characters from '~tests/mocks/characters'
import scenarios from '~tests/mocks/scenarios'

const scenario = scenarios[0]
const scenarioCharacters = characters.filter(
	(c) => c.scenarioId === scenario.id
)

beforeEach(() => {
	useCanvasClick.setState({ x: 0, y: 0, toggle: false, rect: null })
})

test('renders an image of the scenario', async () => {
	renderLevel()

	const image = await screen.findByRole('img', { name: scenario.name })

	expect(image).toBeInTheDocument()
})

test('displays a menu with buttons of the characters when the user clicks', async () => {
	const user = userEvent.setup()
	renderLevel()
	const image = await screen.findByRole('img', { name: scenario.name })

	expect(screen.queryByRole('menu')).not.toBeInTheDocument()

	await user.click(image)

	expect(screen.queryByRole('menu')).toBeInTheDocument()

	scenarioCharacters.forEach((char) => {
		expect(screen.getByRole('button', { name: char.name })).toBeVisible()
	})
})

test('hides the menu when the user clicks again', async () => {
	const user = userEvent.setup()
	renderLevel()
	const image = await screen.findByRole('img', { name: scenario.name })

	expect(screen.queryByRole('menu')).not.toBeInTheDocument()

	await user.click(image)

	expect(screen.queryByRole('menu')).toBeInTheDocument()

	await user.click(image)

	expect(screen.queryByRole('menu')).not.toBeInTheDocument()
})

test.todo('hides the menu when the user clicks a menu option', async () => {})

test.todo(
	'removes the character button from the menu when the user selects it on the right coordinates',
	async () => {
		const user = userEvent.setup()
		const character = scenarioCharacters[0]
		const x = (character.minX + character.maxX) / 2
		const y = (character.minY + character.maxY) / 2
		renderLevel(scenario.name)
		const image = await screen.findByRole('img', { name: scenario.name })

		await clickOn({ x, y, element: image })
		const btn = screen.getByRole('button', { name: character.name })
		await user.click(btn)

		await waitFor(() => expect(btn).not.toBeInTheDocument())
	}
)

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
})

function renderLevel(name = scenario.name) {
	return render(
		<QueryClientProvider client={queryClient}>
			<Level name={name} />
		</QueryClientProvider>
	)
}

async function clickOn({
	x,
	y,
	element,
}: {
	x: number
	y: number
	element: HTMLElement
}) {
	const user = userEvent.setup()

	await user.pointer({ keys: '[MouseLeft]', target: element, coords: { x, y } })
	await user.pointer({ keys: '[/MouseLeft]' })
}
