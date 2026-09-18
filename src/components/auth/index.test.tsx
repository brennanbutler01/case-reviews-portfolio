import { render, screen } from '@testing-library/react'
import Auth from '@/components/auth/index'
import userEvent from '@testing-library/user-event'
import * as auth0 from '@auth0/auth0-react'

vi.mock('@auth0/auth0-react')

describe('Authenticated', () => {
    it('should render a button', () => {
        const loginWithRedirect = vi.fn()
        vi.mocked(auth0.useAuth0, { partial: true }).mockReturnValue({
            isAuthenticated: false,
            isLoading: false,
            loginWithRedirect,
        })
        render(<Auth />)
        expect(screen.getByRole('button')).toBeInTheDocument()
    })
    it('should say login if not authenticated and we should be able to login', async () => {
        const loginWithRedirect = vi.fn()
        vi.mocked(auth0.useAuth0, { partial: true }).mockReturnValue({
            isAuthenticated: false,
            isLoading: false,
            loginWithRedirect,
        })

        render(<Auth />)
        expect(
            screen.getByRole('button', { name: 'Login' }),
        ).toBeInTheDocument()
        const user = userEvent.setup()
        await user.click(screen.getByRole('button', { name: 'Login' }))
        expect(loginWithRedirect).toHaveBeenCalledTimes(1)
    })

    it('should say logout if we are authenticated and we should be able to logout', async () => {
        const logout = vi.fn()
        vi.mocked(auth0.useAuth0, { partial: true }).mockReturnValue({
            isAuthenticated: true,
            isLoading: false,
            logout,
        })

        render(<Auth />)
        expect(
            screen.getByRole('button', { name: 'Logout' }),
        ).toBeInTheDocument()
        const user = userEvent.setup()
        await user.click(screen.getByRole('button', { name: 'Logout' }))
        expect(logout).toHaveBeenCalledTimes(1)
    })

    it('should show a loading state', () => {
        vi.mocked(auth0.useAuth0, { partial: true }).mockReturnValue({
            isAuthenticated: false,
            isLoading: true,
        })

        render(<Auth />)
        expect(
            screen.getByRole('button', { name: 'Getting authentication' }),
        ).toBeInTheDocument()
    })
})
