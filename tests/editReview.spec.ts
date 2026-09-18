import { APIRequestContext, expect, request, test } from '@playwright/test'
import { v4 as uuid } from 'uuid'
import { PostStaff } from '../src/models/staff'
import { PostReview } from '../src/models/review'
import { ReviewElement } from '../src/models/reviewElement'

let staffRequestContext: APIRequestContext
let reviewRequestContext: APIRequestContext
let staffId
let reviewId
test.beforeAll(async () => {
    staffRequestContext = await request.newContext({
        baseURL: process.env.VITE_BACKEND_API + '/Staff',
        ignoreHTTPSErrors: true,
        extraHTTPHeaders: {
            'content-type': 'application/json',
            authorization: `Bearer ${process.env.TOKEN}`,
        },
    })

    reviewRequestContext = await request.newContext({
        baseURL: process.env.VITE_BACKEND_API + '/Review',
        ignoreHTTPSErrors: true,
        extraHTTPHeaders: {
            'content-type': 'application/json',
            authorization: `Bearer ${process.env.TOKEN}`,
        },
    })
})

test.beforeEach(async () => {
    staffId = uuid()
    reviewId = uuid()
    await staffRequestContext.post('', {
        data: {
            id: staffId,
            firstName: staffId,
            lastName: 'test',
            orNumber: 'OR0233309',
            createdBy: process.env.USER_ID,
            office: 0,
        } as PostStaff,
    })

    await reviewRequestContext.post('', {
        data: {
            id: reviewId,
            reviewDate: new Date(),
            reviewElements: [
                {
                    id: uuid(),
                    reviewId,
                    isReviewed: true,
                    comments: '',
                    program: 0,
                    hasAction: false,
                    reviewedElement: 0,
                    isError: false,
                } as ReviewElement,
            ],
            program: 0,
            otherComments: '',
            reviewedBy: process.env.USER_ID,
            nonMagiSubProgram: 0,
            reportingSystem: 0,
            magiSubProgram: 0,
            staffId,
            caseNumber: 401401401,
            isTargeted: false,
            magiEligibles: null,
            isComplete: true,
        } as PostReview,
    })
})

test('edit a review and see it', async ({ page }) => {
    await page.goto('/reviews')
    await expect(page.getByRole('button', { name: 'Create' })).toBeVisible()
    await expect(await page.getByRole('row', { name: staffId })).toBeVisible()
    await page
        .getByRole('row', { name: staffId })
        .getByRole('button', { name: 'Edit' })
        .click()
    await page.getByLabel('Reviewed Program').click()
    await page.getByRole('option', { name: 'ERDC' }).click()
    await page.getByRole('button', { name: 'Update' }).click()

    await expect(
        page
            .getByRole('row', { name: staffId })
            .getByRole('cell', { name: 'ERDC' }),
    ).toBeVisible()
})

test.afterAll(async () => {
    await staffRequestContext.dispose()
    await reviewRequestContext.dispose()
})
