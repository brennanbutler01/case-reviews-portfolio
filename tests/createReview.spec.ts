import { APIRequestContext, expect, request, test } from '@playwright/test'
import { v4 as uuid } from 'uuid'
import { PostStaff } from '../src/models/staff'

let requestContext: APIRequestContext
let id
test.beforeAll(async () => {
    requestContext = await request.newContext({
        baseURL: process.env.VITE_BACKEND_API + '/Staff',
        ignoreHTTPSErrors: true,
        extraHTTPHeaders: {
            'content-type': 'application/json',
            authorization: `Bearer ${process.env.TOKEN}`,
        },
    })
})

test.beforeEach(async () => {
    id = uuid()

    await requestContext.post('', {
        data: {
            id,
            firstName: id,
            lastName: 'test',
            orNumber: 'OR0233309',
            createdBy: process.env.USER_ID,
            office: 0,
        } as PostStaff,
    })
})

test('create review and see it', async ({ page }) => {
    await page.goto('/reviews')
    await page.getByRole('button', { name: 'Create' }).click()
    await page.getByLabel('Reviewed Program').click()
    await page.getByRole('option', { name: 'SNAP' }).click()
    await page.getByPlaceholder('Rebecca').click()
    await page.getByRole('option', { name: id }).click()
    await page.getByPlaceholder('4018009901').click()
    await page.getByPlaceholder('4018009901').fill('401401401')
    await page.getByPlaceholder('4018009901').press('Tab')
    await page.getByText('SRS').click()
    await page.getByLabel('Comments').click()
    await page.getByLabel('Comments').fill('test')
    await page.getByRole('button', { name: 'UTILITIES' }).click()
    await page
        .getByRole('group')
        .filter({ hasText: 'Elements to review' })
        .getByRole('button', { name: 'UTILITIES' })
        .click()
    await page.getByLabel('Reviewed?').check()
    await page.getByPlaceholder('any comments to add?').click()
    await page.getByPlaceholder('any comments to add?').fill('test')
    await page
        .getByRole('dialog', { name: 'Review Form' })
        .getByRole('button', { name: 'Create' })
        .click()

    await expect(await page.getByRole('cell', { name: 'SNAP' })).toBeVisible()
})

test.afterAll(async () => await requestContext.dispose())
