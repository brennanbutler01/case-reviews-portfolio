import { test, expect } from '@playwright/test'

test.use({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
})

test('mobile visitor can create staff and reset from navigation', async ({
    page,
    request,
}) => {
    const api = process.env.VISITOR_API_URL || 'http://127.0.0.1:5210'
    await page.goto('/staff')
    await expect
        .poll(() =>
            page.evaluate(() =>
                sessionStorage.getItem('case-reviews-visitor-session'),
            ),
        )
        .not.toBeNull()
    const session = await page.evaluate(() =>
        JSON.parse(
            sessionStorage.getItem('case-reviews-visitor-session') || '{}',
        ),
    )
    const headers = { Authorization: `Bearer ${session.accessToken}` }
    try {
        await page.getByRole('button', { name: 'Create', exact: true }).click()
        const dialog = page.getByRole('dialog')
        await dialog.getByLabel(/First Name/).fill('Mobile')
        await dialog.getByLabel(/Last Name/).fill('Synthetic')
        await dialog.getByLabel(/OR Number/).fill('OR1234567')
        await dialog
            .getByRole('button', { name: 'Submit', exact: true })
            .click()
        await expect(
            page.getByRole('row').filter({ hasText: 'Mobile Synthetic' }),
        ).toHaveCount(1)
        await page.reload()
        await expect(
            page.getByRole('row').filter({ hasText: 'Mobile Synthetic' }),
        ).toHaveCount(1)
        expect(
            await page.evaluate(
                () => document.documentElement.scrollWidth <= innerWidth,
            ),
        ).toBe(true)
        await page.getByRole('button', { name: 'Toggle navigation' }).click()
        await page.getByRole('menuitem', { name: 'Reset demo' }).click()
        await expect
            .poll(async () =>
                (await request.get(`${api}/Staff`, { headers })).status(),
            )
            .toBe(401)
        await expect(
            page.getByRole('row').filter({ hasText: 'Mobile Synthetic' }),
        ).toHaveCount(0)
    } finally {
        await request.delete(`${api}/demo/session`, { headers })
    }
})
