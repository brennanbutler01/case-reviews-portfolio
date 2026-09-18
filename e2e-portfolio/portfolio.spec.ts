import { test, expect } from '@playwright/test'

test('portfolio review workflow, isolation, reset and direct routes', async ({
    page,
    context,
}) => {
    const errors: string[] = []
    const dataRequests: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('request', request => {
        if (['fetch', 'xhr'].includes(request.resourceType()))
            dataRequests.push(request.url())
    })
    await page.goto('/reviews')
    await expect(
        page.getByRole('status').filter({ hasText: 'Portfolio demo' }),
    ).toBeVisible()
    const bannerBox = await page
        .getByRole('status')
        .filter({ hasText: 'Portfolio demo' })
        .boundingBox()
    const headerBox = await page.getByRole('banner').boundingBox()
    expect(bannerBox).not.toBeNull()
    expect(headerBox).not.toBeNull()
    if (bannerBox && headerBox)
        expect(bannerBox.y).toBeGreaterThanOrEqual(
            headerBox.y + headerBox.height,
        )
    const reviewRows = page
        .getByRole('row')
        .filter({ has: page.getByTitle('View', { exact: true }) })
    await expect(reviewRows).toHaveCount(2)
    await reviewRows.first().getByTitle('Edit', { exact: true }).click()
    await page
        .getByRole('dialog')
        .locator('textarea[name=otherComments]')
        .fill('Edited in this tab')
    await page.getByRole('button', { name: 'Update', exact: true }).click()
    await expect(page.getByText('Successfully Edited Review')).toBeVisible()
    await reviewRows.first().getByTitle('View', { exact: true }).click()
    await expect(
        page.getByRole('dialog').getByText('Edited in this tab'),
    ).toBeVisible()
    await page.getByLabel('Close modal', { exact: true }).click()
    const downloadPromise = page.waitForEvent('download')
    await reviewRows
        .first()
        .getByRole('button', { name: 'Generate pdf' })
        .click()
    expect(await (await downloadPromise).failure()).toBeNull()
    await reviewRows.first().getByTitle('Delete', { exact: true }).click()
    await page.getByRole('button', { name: 'confirm', exact: true }).click()
    await expect(reviewRows).toHaveCount(1)
    const anotherVisitor = await context.newPage()
    try {
        await anotherVisitor.goto('/reviews')
        await expect(
            anotherVisitor.getByRole('row').filter({
                has: anotherVisitor.getByTitle('View', { exact: true }),
            }),
        ).toHaveCount(2)
    } finally {
        await anotherVisitor.close()
    }
    await page.getByRole('button', { name: 'Create', exact: true }).click()
    await page
        .getByRole('dialog')
        .getByLabel(/Case Number/)
        .fill('999999999')
    await page
        .getByRole('dialog')
        .getByRole('button', { name: 'HOUSEHOLD_COMPOSITION', exact: true })
        .click()
    await page
        .getByRole('dialog')
        .getByRole('button', { name: 'Create', exact: true })
        .click()
    await expect(page.getByText('Successfully Created Review')).toBeVisible()
    await expect(reviewRows).toHaveCount(2)
    await page.getByRole('link', { name: 'Stats', exact: true }).click()
    await expect(
        page.getByRole('heading', { name: 'Stats', exact: true }),
    ).toBeVisible()
    await page.getByRole('link', { name: 'Staff', exact: true }).click()
    await page.getByRole('button', { name: 'Create', exact: true }).click()
    const dialog = page.getByRole('dialog')
    await dialog.getByLabel(/First Name/).fill('Demo')
    await dialog.getByLabel(/Last Name/).fill('Visitor')
    await dialog.getByLabel(/OR Number/).fill('OR0000003')
    await dialog.getByRole('button', { name: 'Submit', exact: true }).click()
    await expect(
        page.getByRole('cell', { name: 'Demo Visitor', exact: true }),
    ).toBeVisible()
    await page.getByRole('button', { name: 'Reset demo', exact: true }).click()
    await expect(
        page.getByRole('cell', { name: 'Demo Visitor', exact: true }),
    ).toHaveCount(0)
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/reviews')
    await expect(
        page.getByRole('heading', { name: 'Reviews', exact: true }),
    ).toBeVisible()
    expect(errors).toEqual([])
    expect(dataRequests).toEqual([])
})

for (const [program, element] of [
    ['SNAP', 'HOUSEHOLD_COMPOSITION'],
    ['ERDC', 'HOUSEHOLD_COMPOSITION'],
    ['TANF', 'HOUSEHOLD_COMPOSITION'],
    ['NON_MAGI', 'INCOME'],
    ['MAGI', 'CLIENT_DATA'],
]) {
    test(`create and export a ${program} review`, async ({ page }) => {
        const errors: string[] = []
        page.on('pageerror', error => errors.push(error.message))
        await page.goto('/reviews')
        await page.getByRole('button', { name: 'Create', exact: true }).click()
        const dialog = page.getByRole('dialog')
        await dialog.getByLabel('Reviewed Program', { exact: true }).click()
        await page.getByRole('option', { name: program, exact: true }).click()
        await dialog.getByLabel(/Case Number/).fill('999999999')
        await dialog.getByRole('button', { name: element, exact: true }).click()
        await dialog
            .locator('textarea[name=otherComments]')
            .fill(`Sample ${program} review`)
        if (program === 'MAGI') {
            await dialog
                .getByRole('button', { name: 'Eligibles', exact: true })
                .click()
            await dialog
                .getByLabel('Adults Eligible Actual', { exact: true })
                .fill('2')
        }
        await dialog
            .getByRole('button', { name: 'Create', exact: true })
            .click()
        await expect(
            page.getByText('Successfully Created Review'),
        ).toBeVisible()
        const rows = page
            .getByRole('row')
            .filter({ has: page.getByTitle('View', { exact: true }) })
        await expect(rows).toHaveCount(3)
        const created = rows.last()
        await created.getByTitle('View', { exact: true }).click()
        await expect(
            page.getByRole('dialog').getByText(`Sample ${program} review`),
        ).toBeVisible()
        if (program === 'MAGI') {
            await page
                .getByRole('dialog')
                .getByRole('button', { name: 'Eligibles', exact: true })
                .click()
            await expect(
                page.getByLabel('Adults Eligible Actual', { exact: true }),
            ).toHaveValue('2')
        }
        await page.getByLabel('Close modal', { exact: true }).click()
        const download = page.waitForEvent('download')
        await created.getByRole('button', { name: 'Generate pdf' }).click()
        expect(await (await download).failure()).toBeNull()
        expect(errors).toEqual([])
    })
}
