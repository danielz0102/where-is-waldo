import { expect, type Locator, test } from '@playwright/test'

test('navigates to beach level', async ({ page }) => {
	await page.goto('/')
	const link = page.getByRole('link', { name: 'Start Playing' })

	await link.click()
	const scenarioLink = page.getByRole('link', { name: /Beach/ })
	await scenarioLink.click()

	expect(page.url()).toContain('/scenario/beach')
})

test('displays an image of the scenario', async ({ page }) => {
	await page.goto('/scenario/beach')
	const scenarioImage = page.getByRole('img', { name: /Beach/ })
	await expect(scenarioImage).toBeVisible()
})

test('has a timer', async ({ page }) => {
	await page.goto('/scenario/beach')
	const timer = page.getByRole('timer')
	await expect(timer).toBeVisible()
})

test('displays a menu with all characters when the image is clicked', async ({
	page,
}) => {
	await page.goto('/scenario/beach')
	const scenarioImage = page.getByRole('img', { name: /Beach/ })
	await scenarioImage.click()

	const menu = page.getByRole('menu')
	await expect(menu).toBeVisible()

	const characterButtons = menu.getByRole('button')
	await expect(characterButtons).toHaveCount(3)

	const characterNames = await characterButtons.allTextContents()
	expect(characterNames).toContain('Waldo')
	expect(characterNames).toContain('Odlaw')
	expect(characterNames).toContain('Wizard')
})

test('shows feedback when click is not on a character', async ({ page }) => {
	await page.goto('/scenario/beach')
	const scenario = page.getByRole('img', { name: /Beach/ })
	await scenario.waitFor({ state: 'visible' })
	await scenario.click({ position: { x: 150, y: 150 } })

	const menu = page.getByRole('menu')
	const waldoBtn = menu.getByRole('button', { name: 'Waldo' })
	await waldoBtn.click()

	await expect(menu.getByText(/wrong/i)).toBeVisible()
})

test('shows feedback when click is on a character', async ({ page }) => {
	await page.goto('/scenario/beach')
	const scenario = page.getByRole('img', { name: /Beach/ })
	await scenario.waitFor({ state: 'visible' })

	await createCharacterFinder(scenario).then((fn) => {
		fn({
			characterName: 'Waldo',
			normalizedCoords: { x: 61.5, y: 38.5 },
		})
	})

	const menu = page.getByRole('menu')
	await expect(menu.getByText(/correct/i)).toBeVisible()
})

test('displays a modal when all characters are found', async ({ page }) => {
	await page.goto('/scenario/beach')
	const scenario = page.getByRole('img', { name: /Beach/ })
	await scenario.waitFor({ state: 'visible' })

	const findCharacter = await createCharacterFinder(scenario)
	await findCharacter({
		characterName: 'Waldo',
		normalizedCoords: { x: 61.5, y: 38.5 },
	})
	scenario.click() // Close menu
	await findCharacter({
		characterName: 'Odlaw',
		normalizedCoords: { x: 10.0, y: 37.5 },
	})
	scenario.click()
	await findCharacter({
		characterName: 'Wizard',
		normalizedCoords: { x: 27.5, y: 35.5 },
	})

	const modal = page.getByRole('dialog')
	await expect(modal.getByText(/you won/i)).toBeVisible()

	const time = modal.getByRole('time')
	await expect(time).toHaveText(/^\d{2}:\d{2}$/)
})

async function createCharacterFinder(scenario: Locator) {
	const boundingBox = await scenario.boundingBox()

	if (!boundingBox) {
		throw new Error('Could not get bounding box of scenario image')
	}

	return async ({
		characterName,
		normalizedCoords,
	}: {
		characterName: string
		normalizedCoords: { x: number; y: number }
	}) => {
		const { x, y } = getRealCoordinates({
			normX: normalizedCoords.x,
			normY: normalizedCoords.y,
			boundingBox,
		})

		await scenario.click({ position: { x, y } })

		const menu = scenario.page().getByRole('menu')
		const button = menu.getByRole('button', { name: characterName })
		await button.click()
	}
}

function getRealCoordinates({
	normX,
	normY,
	boundingBox,
}: {
	normX: number
	normY: number
	boundingBox: {
		x: number
		y: number
		width: number
		height: number
	}
}) {
	const x = (normX / 100) * boundingBox.width
	const y = (normY / 100) * boundingBox.height
	return { x, y }
}
