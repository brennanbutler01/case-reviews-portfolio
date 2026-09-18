import { expect, test } from '@playwright/test'

test('can go to office stats tab and see alert if no office selected w/ button to go back home', async ({
    page,
}) => {
    await page.goto('/stats')
    await page.getByRole('tab', { name: 'Office' }).click()
    await expect(
        page.getByRole('alert', { name: 'No Office Selected' }),
    ).toBeVisible()
    await page.getByRole('button', { name: 'View all' }).click()
    await expect(
        page.getByRole('alert', { name: 'No Office Selected' }),
    ).toBeVisible()
})
