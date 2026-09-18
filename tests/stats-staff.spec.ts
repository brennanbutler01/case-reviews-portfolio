import { expect, test } from '@playwright/test'

test('can go to staff stats and will see alert for no staff selected', async ({
    page,
}) => {
    await page.goto('/stats')
    await page.getByRole('tab', { name: 'Staff' }).click()
    await expect(
        page.getByRole('alert', { name: 'No Staff Selected' }),
    ).toBeVisible()
    await expect(page.getByPlaceholder('Select a staff member')).toBeVisible()
    await page.getByRole('button', { name: 'View all' }).click()
    await page.getByRole('tab', { name: 'All' }).click()

    await expect(page.getByRole('tabpanel', { name: 'All' })).toBeVisible()
})
