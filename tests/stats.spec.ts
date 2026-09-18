import { expect, test } from '@playwright/test'

test('stats page', async ({ page }) => {
    await page.goto('/stats')
    await expect(page.getByRole('heading', { name: 'Stats' })).toBeVisible()
})
