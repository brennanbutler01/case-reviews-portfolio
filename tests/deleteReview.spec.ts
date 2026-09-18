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

test('delete reviews', async ({ page }) => {
    await page.goto('/reviews')
    await expect(await page.getByRole('row', { name: staffId })).toBeVisible()
    await page.screenshot({ path: 'delete-review.png' })
    await page
        .getByRole('row', { name: staffId })
        .getByRole('button', { name: 'Delete' })
        .click()
    await page.getByRole('button', { name: 'Confirm' }).click()

    await expect(
        page
            .getByRole('row', { name: staffId })
            .getByRole('cell', { name: 'SNAP' }),
    ).not.toBeVisible()
})

test.afterAll(async () => {
    await staffRequestContext.dispose()
    await reviewRequestContext.dispose()
})
