import { expect, test } from '@playwright/test'

test('navigates to a level', async ({ page }) => {
	await page.goto('/')
	const link = page.getByRole('link', { name: 'Start Playing' })

	await link.click()
	const scenarioLink = page.getByRole('link', { name: /Beach/ })
	await scenarioLink.click()

	expect(page.url()).toContain('/scenario/')
})
