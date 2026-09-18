import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('HomePage', async ({ page }) => {
    await test.step('Has homepage', async () => {
        await page.goto('/')
        await expect(page).toHaveTitle('Home | Tofu.Reviews')
        const accessibilityScanResults = await new AxeBuilder({
            page,
        }).analyze() // 4
        expect(accessibilityScanResults.violations).toEqual([]) // 5
    })

    await test.step('Link to staff page', async () => {
        await page.getByRole('link', { name: 'Staff' }).click()
        await expect(page).toHaveURL('/staff')
        const accessibilityScanResults = await new AxeBuilder({
            page,
        }).analyze() // 4
        expect(accessibilityScanResults.violations).toEqual([]) // 5
    })

    await test.step('Link to the reviews page', async () => {
        await page.getByRole('link', { name: 'Reviews', exact: true }).click()
        await expect(page).toHaveURL('/reviews')
        const accessibilityScanResults = await new AxeBuilder({
            page,
        }).analyze() // 4
        expect(accessibilityScanResults.violations).toEqual([]) // 5
    })

    await test.step('Link to stats page', async () => {
        await page.getByRole('link', { name: 'Stats' }).click()
        await expect(page).toHaveURL('/stats')
        const accessibilityScanResults = await new AxeBuilder({
            page,
        }).analyze() // 4
        expect(accessibilityScanResults.violations).toEqual([]) // 5
    })

    await test.step('Link home', async () => {
        await page.getByRole('link', { name: 'Tofu.Reviews' }).click()
        await expect(page).toHaveURL('/')
    })
})
