import { render, screen } from '@testing-library/react'
import type { Character } from '~/types'
import TargetButton from '~components/TargetButton'

const character: Character = {
	id: '1',
	name: 'Waldo',
	imgUrl: 'http://example.com/waldo.png',
	maxX: 100,
	maxY: 100,
	minX: 0,
	minY: 0,
	scenarioId: 'scenario1',
}

test('renders the character name', () => {
	render(<TargetButton character={character} />)

	expect(screen.queryByText('Waldo')).toBeVisible()
})

test('renders the character image', () => {
	render(<TargetButton character={character} />)

	expect(screen.getByRole('img')).toHaveAttribute('src', character.imgUrl)
})
