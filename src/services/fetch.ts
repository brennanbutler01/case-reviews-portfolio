interface FetchProps {
    url: RequestInfo | URL
    init?: RequestInit | undefined
    token: string
}

export class ApiResponseError extends Error {
    readonly status: number

    constructor(status: number) {
        super(`Request failed with HTTP status ${status}`)
        this.name = 'ApiResponseError'
        this.status = status
    }
}

export const typedFetch = async <Model>({
    url,
    init,
    token,
}: FetchProps): Promise<Model> => {
    const headers = new Headers(init?.headers)
    headers.set('Content-Type', 'application/json')
    headers.set('Authorization', `Bearer ${token}`)

    const response = await fetch(url, { ...init, headers })
    // Reject failures before parsing so callers cannot treat an error body as saved data.
    if (!response.ok) throw new ApiResponseError(response.status)
    return response.json()
}
