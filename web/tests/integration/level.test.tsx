import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Level from '~pages/level'
import characters from '~tests/mocks/characters'
import scenarios from '~tests/mocks/scenarios'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
})
const LevelWrapper = ({ name }: { name: string }) => (
	<QueryClientProvider client={queryClient}>
		<Level name={name} />
	</QueryClientProvider>
)

const scenario = scenarios[0]
const scenarioCharacters = characters.filter(
	(c) => c.scenarioId === scenario.id
)

test('renders an image of the scenario', async () => {
	render(<LevelWrapper name={scenario.name} />)

	const image = await screen.findByRole('img', { name: scenario.name })

	expect(image).toBeInTheDocument()
})

test('displays a menu with buttons of the characters when the user clicks', async () => {
	const user = userEvent.setup()
	render(<LevelWrapper name={scenario.name} />)
	const image = await screen.findByRole('img', { name: scenario.name })

	await user.click(image)

	expect(screen.queryByRole('menu')).toBeInTheDocument()

	scenarioCharacters.forEach((char) => {
		expect(
			screen.queryByRole('button', { name: char.name })
		).toBeInTheDocument()
	})
})

test('hides the menu when the user clicks again', async () => {
	const user = userEvent.setup()
	render(<LevelWrapper name={scenario.name} />)
	const image = await screen.findByRole('img', { name: scenario.name })

	await user.click(image)
	await user.click(image)

	expect(screen.queryByRole('menu')).not.toBeInTheDocument()
})

test.skip('hides the menu when the user clicks a menu option', async () => {
	const user = userEvent.setup()
	render(<LevelWrapper name={scenario.name} />)
	const image = await screen.findByRole('img', { name: scenario.name })

	await user.click(image)

	const btn = screen.getByRole('button', { name: scenarioCharacters[0].name })
	await user.click(btn)

	expect(screen.queryByRole('menu')).not.toBeInTheDocument()
})

test('removes the character button from the menu when the user selects it on the right coordinates', async () => {
	const user = userEvent.setup()
	const character = scenarioCharacters[0]
	const x = (character.minX + character.maxX) / 2
	const y = (character.minY + character.maxY) / 2
	render(<LevelWrapper name={scenario.name} />)
	const image = await screen.findByRole('img', { name: scenario.name })

	await clickOn({ x, y, element: image })
	const btn = screen.getByRole('button', { name: character.name })
	await user.click(btn)

	await waitFor(() => expect(btn).not.toBeInTheDocument())
})

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
