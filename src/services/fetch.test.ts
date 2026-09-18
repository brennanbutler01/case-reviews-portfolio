import { createServer } from 'node:http'
import { once } from 'node:events'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { typedFetch } from '@/services/fetch'

const server = createServer((request, response) => {
    if (request.url === '/forbidden') {
        response.writeHead(403, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify({ message: 'Not permitted' }))
        return
    }
    if (request.url === '/unavailable') {
        response.writeHead(503, { 'Content-Type': 'text/html' })
        response.end('<h1>Unavailable</h1>')
        return
    }
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(
        JSON.stringify({
            requestId: request.headers['x-request-id'],
            authorization: request.headers.authorization,
        }),
    )
})
let baseUrl = ''

beforeAll(async () => {
    server.listen(0, '127.0.0.1')
    await once(server, 'listening')
    const address = server.address()
    if (!address || typeof address === 'string')
        throw new Error('Missing test server port')
    baseUrl = `http://127.0.0.1:${address.port}`
})

afterAll(async () => {
    await new Promise<void>((resolve, reject) => {
        server.close(error => (error ? reject(error) : resolve()))
        server.closeAllConnections()
    })
})

describe('typedFetch over HTTP', () => {
    it('preserves Headers objects and supplies the current bearer token', async () => {
        const result = await typedFetch({
            url: baseUrl,
            token: 'synthetic-test-token',
            init: { headers: new Headers({ 'X-Request-Id': 'test-request' }) },
        })
        expect(result).toEqual({
            requestId: 'test-request',
            authorization: 'Bearer synthetic-test-token',
        })
    })

    it('rejects a JSON permission error instead of returning it as model data', async () => {
        await expect(
            typedFetch({ url: `${baseUrl}/forbidden`, token: 'test' }),
        ).rejects.toMatchObject({ name: 'ApiResponseError', status: 403 })
    })

    it('preserves the HTTP failure when the server returns an HTML error page', async () => {
        await expect(
            typedFetch({ url: `${baseUrl}/unavailable`, token: 'test' }),
        ).rejects.toMatchObject({ name: 'ApiResponseError', status: 503 })
    })
})
