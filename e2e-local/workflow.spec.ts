import { test, expect } from '@playwright/test'

test('create, view, edit, report and delete a synthetic review', async ({
    page,
    request,
}) => {
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    const staffName = `Browser${Date.now()
        .toString()
        .replace(/\d/g, digit => String.fromCharCode(97 + Number(digit)))}`
    let staffId: string | undefined
    let reviewId: string | undefined
    const response = await request.get('http://127.0.0.1:5190/dev/token/alice')
    const { accessToken } = await response.json()
    const headers = { Authorization: `Bearer ${accessToken}` }
    try {
        await page.goto('/staff')
        await page.getByRole('button', { name: 'Create', exact: true }).click()
        await page.getByLabel(/First Name/).fill('Synthetic')
        await page.getByLabel(/Last Name/).fill(staffName)
        await page
            .getByRole('dialog')
            .getByLabel(/OR Number/)
            .fill('OR1234567')
        const staffResponse = page.waitForResponse(
            r => r.url().endsWith('/Staff') && r.request().method() === 'POST',
        )
        await page.getByRole('button', { name: 'Submit', exact: true }).click()
        const createdStaff = await staffResponse
        expect(createdStaff.status()).toBe(201)
        staffId = (await createdStaff.json()).id
        await expect(page.getByText('Successfully created staff')).toBeVisible()
        await page.goto('/reviews')
        await page.getByRole('button', { name: 'Create', exact: true }).click()
        const dialog = page.getByRole('dialog')
        await dialog.getByLabel(/Staff Reviewed/).click()
        await page
            .getByRole('option', {
                name: `Synthetic ${staffName}`,
                exact: true,
            })
            .click()
        await dialog.getByLabel(/Case Number/).fill('123456789')
        await dialog
            .getByRole('button', { name: 'HOUSEHOLD_COMPOSITION', exact: true })
            .click()
        const reviewResponse = page.waitForResponse(
            r => r.url().endsWith('/Review') && r.request().method() === 'POST',
        )
        await dialog
            .getByRole('button', { name: 'Create', exact: true })
            .click()
        const createdReview = await reviewResponse
        expect(createdReview.status()).toBe(201)
        reviewId = (await createdReview.json()).id
        await expect(
            page.getByText('Successfully Created Review'),
        ).toBeVisible()
        const row = page
            .getByRole('row')
            .filter({ has: page.getByTitle('View', { exact: true }) })
            .first()
        await row.getByTitle('View', { exact: true }).click()
        await expect(
            page.getByRole('dialog', { name: 'Review Details' }),
        ).toBeVisible()
        await page.getByLabel('Close modal', { exact: true }).click()
        await row.getByTitle('Edit', { exact: true }).click()
        await page
            .getByRole('dialog')
            .locator('textarea[name=otherComments]')
            .fill('Verified browser edit')
        await page.getByRole('button', { name: 'Update', exact: true }).click()
        await expect(page.getByText('Successfully Edited Review')).toBeVisible()
        const saved = await request.get(
            `http://127.0.0.1:5190/Review/${reviewId}`,
            { headers },
        )
        expect((await saved.json()).otherComments).toBe('Verified browser edit')
        const downloadPromise = page.waitForEvent('download')
        await row.getByRole('button', { name: 'Generate pdf' }).click()
        const download = await downloadPromise
        expect(await download.failure()).toBeNull()
        await page.goto('/stats')
        await expect(
            page.getByRole('heading', { name: 'Stats', exact: true }),
        ).toBeVisible()
        await page.goto('/reviews?demoUser=bob')
        await expect(
            page.getByText('You need to create staff', { exact: false }),
        ).toBeVisible()
        await expect(
            page.getByRole('row').filter({ hasText: '123456789' }),
        ).toHaveCount(0)
        await page.goto('/reviews?demoUser=alice')
        await page.getByTitle('Delete', { exact: true }).first().click()
        await page.getByRole('button', { name: 'confirm', exact: true }).click()
        await expect(
            page.getByText('Successfully deleted review record'),
        ).toBeVisible()
        expect(
            (
                await request.get(`http://127.0.0.1:5190/Review/${reviewId}`, {
                    headers,
                })
            ).status(),
        ).toBe(404)
        reviewId = undefined
        expect(errors).toEqual([])
    } finally {
        if (reviewId)
            expect(
                (
                    await request.delete(
                        `http://127.0.0.1:5190/Review/${reviewId}`,
                        { headers },
                    )
                ).status(),
            ).toBe(200)
        if (staffId)
            expect(
                (
                    await request.delete(
                        `http://127.0.0.1:5190/Staff/${staffId}`,
                        { headers },
                    )
                ).status(),
            ).toBe(200)
    }
})
