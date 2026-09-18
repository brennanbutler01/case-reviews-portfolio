import { getVisitorToken, resetVisitorSession } from '@/auth/visitorSession'
import { showNotification } from '@mantine/notifications'
import { isPortfolioDemo } from '@/demo/mode'
import { useAuth0 } from '@auth0/auth0-react'

export const isVisitorDemo = import.meta.env.VITE_VISITOR_DEMO === 'true'
export const isLocalDemo =
    import.meta.env.DEV &&
    import.meta.env.VITE_DEMO_MODE === 'true' &&
    ['127.0.0.1', 'localhost'].includes(window.location.hostname)
const demoUser =
    new URLSearchParams(window.location.search).get('demoUser') === 'bob'
        ? 'bob'
        : 'alice'

export function useAppAuth() {
    const auth = useAuth0()
    if (!isLocalDemo && !isPortfolioDemo && !isVisitorDemo) return auth
    return {
        isAuthenticated: true,
        isLoading: false,
        error: undefined,
        user: {
            sub: isPortfolioDemo ? 'portfolio-visitor' : `demo-${demoUser}`,
            name: isPortfolioDemo ? 'Demo Reviewer' : `Demo ${demoUser}`,
            email: `${demoUser}@example.invalid`,
        },
        getAccessTokenSilently: async () => {
            if (isVisitorDemo) return getVisitorToken()
            if (isPortfolioDemo) return 'portfolio-no-server-token'
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_API}/dev/token/${demoUser}`,
            )
            if (!response.ok)
                throw new Error(
                    'Local demo API is unavailable. Start Docker Compose first.',
                )
            const body: unknown = await response.json()
            if (
                !body ||
                typeof body !== 'object' ||
                !('accessToken' in body) ||
                typeof body.accessToken !== 'string'
            ) {
                throw new Error('Invalid local demo token response')
            }
            return body.accessToken
        },
        loginWithRedirect: async () => {
            window.location.assign('/')
        },
        logout: async () => {
            if (isVisitorDemo) {
                try {
                    await resetVisitorSession()
                } catch (error) {
                    showNotification({
                        color: 'red',
                        title: 'Reset failed',
                        message:
                            error instanceof Error
                                ? error.message
                                : 'Please retry.',
                    })
                }
                return
            }
            if (isPortfolioDemo) {
                window.location.reload()
                return
            }
            window.location.assign(
                `/?demoUser=${demoUser === 'alice' ? 'bob' : 'alice'}`,
            )
        },
    }
}
