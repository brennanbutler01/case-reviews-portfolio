import { expect, test } from '@playwright/test'
import { v4 as uuid } from 'uuid'

let id
test.beforeEach(() => {
    id = uuid()
})
test('Create Staff', async ({ page }) => {
    await page.goto('/staff')

    await page.getByRole('button', { name: 'Create' }).click()
    await page.getByPlaceholder('Brennan').fill(id)
    await page.getByPlaceholder('Butler').fill('test')
    await page.getByPlaceholder('OR0123458').fill('or0233009')

    await page.getByPlaceholder('OR0123458').press('Tab')
    await page.getByRole('option', { name: 'ESTACADA' }).click()

    await page.getByRole('button', { name: 'Submit' }).click()

    await expect(page.getByRole('cell', { name: id })).toBeVisible()
})
