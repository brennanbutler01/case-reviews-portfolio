import { APIRequestContext, expect, test } from '@playwright/test'
import { v4 as uuid } from 'uuid'
import { PostReview } from '../src/models/review'
import { PostStaff } from '../src/models/staff'
import { ReviewElement } from '../src/models/reviewElement'

let requestContext: APIRequestContext
let id
let data
let staffData

test.beforeAll(async ({ playwright }) => {
    requestContext = await playwright.request.newContext({
        baseURL: `${process.env.VITE_BACKEND_API}/Review/`,
        ignoreHTTPSErrors: true,
        extraHTTPHeaders: {
            authorization: `Bearer ${process.env.TOKEN}`,
            'content-type': 'application/json',
        },
    })

    staffData = {
        id: uuid(),
        lastName: 'tester',
        firstName: 'tester',
        office: 0,
        orNumber: 'OR0233311',
        createdBy: process.env.USER_ID,
        reviews: null,
    } as PostStaff

    const createStaffRequest = await requestContext.post(
        process.env.VITE_BACKEND_API + '/Staff',
        {
            data: staffData,
        },
    )
    await expect(createStaffRequest).toBeOK()
})

test.beforeEach(async () => {
    id = uuid()
    data = {
        id,
        program: 0,
        reviewDate: new Date(),
        reviewElements: [
            {
                reviewedElement: 0,
                isReviewed: true,
                id: uuid(),
                reviewId: id,
                program: 0,
                hasAction: true,
                isError: true,
                comments: 'test',
            } as ReviewElement,
        ],
        isComplete: false,
        reviewedBy: process.env.USER_ID,
        nonMagiSubProgram: 0,
        magiSubProgram: 0,
        reportingSystem: 0,
        otherComments: 'test',
        caseNumber: 401401401,
        staffId: staffData.id,
        isTargeted: false,
        magiEligibles: null,
    } as PostReview
})

//we are going to create one, get it, update it, delete it
test('can post/put a new review and see on server', async () => {
    //create new staff
    const postResponse = await requestContext.post('', {
        data,
    })
    await expect(postResponse).toBeOK()
    await expect(await postResponse.json()).toStrictEqual({
        ...data,
        reviewDate: data.reviewDate.toISOString(),
    })

    //get all our staff and see if it is included
    const getManyResponse = await requestContext.get('')
    await expect(getManyResponse).toBeOK()
    const reviewsFromGet = await getManyResponse.json()

    let hasMatch = false
    for (const review of reviewsFromGet) {
        if (!hasMatch) {
            hasMatch = review.id === id
        }
    }

    await expect(hasMatch).toBeTruthy()

    const updateResponse = await requestContext.put(id, {
        data: {
            ...data,
            program: 1,
            caseNumber: 1,
            reviewDate: data.reviewDate.toISOString(),
        },
    })

    await expect(updateResponse).toBeOK()
    const updatedRecord = await updateResponse.json()
    await expect(updatedRecord).toEqual({
        ...data,
        program: 1,
        caseNumber: 1,
        reviewDate: data.reviewDate.toISOString(),
    })
})

test.afterEach(async () => {
    const deleteResponse = await requestContext.delete(id)
    await expect(deleteResponse).toBeOK()
    await expect(await deleteResponse.json()).toStrictEqual({
        ...data,
        caseNumber: 1,
        program: 1,
        reviewDate: data.reviewDate.toISOString(),
    })
})

test.afterAll(async () => {
    const deleteStaffResponse = await requestContext.delete(
        process.env.VITE_BACKEND_API + '/Staff/' + staffData.id,
    )
    await expect(await deleteStaffResponse.json()).toStrictEqual({
        ...staffData,
        // reviews: [],
    })
    await requestContext.dispose()
})
