import { APIRequestContext, expect, test } from '@playwright/test'
import { v4 as uuid } from 'uuid'

let requestContext: APIRequestContext
let id
let data

test.beforeAll(async ({ playwright }) => {
    requestContext = await playwright.request.newContext({
        baseURL: `${process.env.VITE_BACKEND_API}/Staff/`,
        ignoreHTTPSErrors: true,
        extraHTTPHeaders: {
            authorization: `Bearer ${process.env.TOKEN}`,
            'content-type': 'application/json',
        },
    })
})

test.beforeEach(async () => {
    id = uuid()
    data = {
        id,
        office: 0,
        lastName: 'butler',
        firstName: 'brennan',
        orNumber: 'OR0233300',
        createdBy: process.env.USER_ID,
        reviews: null,
    }
})

//we are going to create one, get it, update it, delete it
test('can post/put a new one and see on server', async () => {
    //create new staff
    const postResponse = await requestContext.post('', {
        data,
    })
    await expect(postResponse).toBeOK()
    await expect(await postResponse.json()).toStrictEqual(data)

    //get all our staff and see if it is included
    const getManyResponse = await requestContext.get('')
    await expect(getManyResponse).toBeOK()
    const staffFromGet = await getManyResponse.json()

    let hasMatch = false
    for (const staff of staffFromGet) {
        if (!hasMatch) {
            hasMatch = staff.id === id
        }
    }

    await expect(hasMatch).toBeTruthy()

    const updateResponse = await requestContext.put(id, {
        data: {
            ...data,
            office: 1,
            lastName: 'new last name',
            firstName: 'new first name',
        },
    })

    await expect(updateResponse).toBeOK()
    const updatedRecord = await updateResponse.json()
    await expect(updatedRecord).toEqual({
        ...data,
        office: 1,
        lastName: 'new last name',
        firstName: 'new first name',
    })
})

test.afterEach(async () => {
    const deleteResponse = await requestContext.delete(id)
    await expect(deleteResponse).toBeOK()
    await expect(await deleteResponse.json()).toStrictEqual({
        ...data,
        office: 1,
        lastName: 'new last name',
        firstName: 'new first name',
    })
})

test.afterAll(async () => {
    await requestContext.dispose()
})
