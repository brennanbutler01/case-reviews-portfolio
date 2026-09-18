const storageKey = 'case-reviews-visitor-session'
const endpoint = `${import.meta.env.VITE_BACKEND_API}/demo/session`
interface VisitorSession {
    accessToken: string
    subject: string
    expiresAt: string
}
function parseSession(value: unknown): VisitorSession {
    if (
        !value ||
        typeof value !== 'object' ||
        !('accessToken' in value) ||
        typeof value.accessToken !== 'string' ||
        !('subject' in value) ||
        typeof value.subject !== 'string' ||
        !('expiresAt' in value) ||
        typeof value.expiresAt !== 'string' ||
        !Number.isFinite(Date.parse(value.expiresAt))
    ) {
        throw new Error('The demo server returned an invalid session.')
    }
    return {
        accessToken: value.accessToken,
        subject: value.subject,
        expiresAt: value.expiresAt,
    }
}
let pending: Promise<string> | undefined
async function loadToken() {
    const stored = sessionStorage.getItem(storageKey)
    if (stored) {
        let session: VisitorSession | undefined
        try {
            session = parseSession(JSON.parse(stored))
        } catch {
            sessionStorage.removeItem(storageKey)
        }
        if (session && Date.parse(session.expiresAt) > Date.now()) {
            const response = await fetch(endpoint, {
                headers: { Authorization: `Bearer ${session.accessToken}` },
            })
            if (response.ok) return session.accessToken
            if (response.status !== 401)
                throw new Error('The demo server is unavailable. Please retry.')
        }
        sessionStorage.removeItem(storageKey)
    }
    const response = await fetch(endpoint, { method: 'POST' })
    if (!response.ok)
        throw new Error(
            response.status === 429
                ? 'The demo is busy. Please try again in a minute.'
                : 'The demo server is unavailable. Please retry.',
        )
    const session = parseSession(await response.json())
    sessionStorage.setItem(storageKey, JSON.stringify(session))
    return session.accessToken
}
export function getVisitorToken(): Promise<string> {
    if (!pending)
        pending = loadToken().finally(() => {
            pending = undefined
        })
    return pending
}
export async function resetVisitorSession() {
    const token = await getVisitorToken()
    const response = await fetch(endpoint, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
    })
    if (!response.ok && response.status !== 401)
        throw new Error('Unable to reset the demo. Please retry.')
    sessionStorage.removeItem(storageKey)
    window.location.assign('/staff')
}
