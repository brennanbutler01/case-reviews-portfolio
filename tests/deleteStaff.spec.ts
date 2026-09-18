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

test('should have staff and be able to delete', async ({ page }) => {
    await page.goto('/staff')
    await expect(page.getByRole('cell', { name: id })).toBeVisible()
    await page
        .getByRole('row', { name: id })
        .getByRole('button', { name: 'Delete' })
        .click()
    await page.getByRole('button', { name: 'Confirm' }).click()
    await expect(page.getByRole('cell', { name: id })).not.toBeVisible()
})
