import { expect, request, test as teardown } from '@playwright/test'

teardown('Cleanup db', async () => {
    const context = await request.newContext({
        baseURL: `${process.env.VITE_BACKEND_API}/Cleanup`,
        extraHTTPHeaders: {
            'content-type': 'application/json',
            authorization: `Bearer ${process.env.TOKEN}`,
        },
    })

    const cleanupResponse = await context.post('')
    await expect(cleanupResponse).toBeOK()
    await context.dispose()
})
