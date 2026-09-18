import { expect, Page, request, test as setup } from '@playwright/test'

const authFile = 'playwright/.auth/user.json'

const userName = process.env.E2E_EMAIL || ''
const password = process.env.E2E_PASSWORD || ''

if (!userName || !password)
    throw new Error(
        'Archived hosted tests require E2E_EMAIL and E2E_PASSWORD. Use test:e2e for the local demo.',
    )

const signIn = async (page: Page) => {
    console.log(`\x1b[2m\tSign in as '${userName}'\x1b[0m`)

    await page.getByRole('button', { name: 'Login' }).click()
    await page.getByLabel('Email address').fill(userName)
    await page.getByLabel('Password').fill(password)
    console.log(`\x1b[2m\tSign in processing\x1b[0m`)

    const responsePromise = page.waitForResponse(
        `https://${process.env.VITE_AUTH0_DOMAIN}/oauth/token`,
    )
    await page.getByRole('button', { name: 'Continue', exact: true }).click()
    const response = await responsePromise
    const responseBody = await response.json()
    process.env.TOKEN = responseBody['access_token']

    console.log(`\x1b[2m\tSign in processed\x1b[0m`)
    await expect(page.getByRole('link', { name: 'Staff' })).toBeVisible()
}

const signOut = async (page: Page) => {
    await expect(page.getByRole('button', { name: /logout/i })).toBeVisible()
    await page.getByRole('button', { name: /logout/i }).click()
    await page.waitForURL('/')
    await expect(page.getByRole('button', { name: /login/i })).toBeVisible()
}

setup('authenticate', async ({ page }) => {
    await page.goto('/')

    // sign in twice so that we can test sign out flow

    await signIn(page)

    await signOut(page)

    await signIn(page)

    const requestContext = await request.newContext({
        baseURL: `https://${process.env.VITE_AUTH0_DOMAIN}/userinfo`,
        extraHTTPHeaders: {
            'content-type': 'application/json',
            authorization: `Bearer ${process.env.TOKEN}`,
        },
    })

    const userInfoResponse = await requestContext.get('', {})
    const userInfoBody = await userInfoResponse.json()
    process.env.USER_ID = userInfoBody['sub']

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

    await requestContext.dispose()

    await page.context().storageState({ path: authFile })
})
