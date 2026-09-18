import { isPortfolioDemo } from '@/demo/mode'
import { useAppAuth, isVisitorDemo } from '@/auth/useAppAuth'
import { Button } from '@mantine/core'

const AuthButton = () => {
    const { isAuthenticated, isLoading, loginWithRedirect, logout } =
        useAppAuth()
    return (
        <Button
            variant={'primary'}
            loading={isLoading}
            onClick={() =>
                isAuthenticated
                    ? logout({
                          logoutParams: {
                              returnTo: import.meta.env.VITE_ROOT,
                          },
                      })
                    : loginWithRedirect()
            }
        >
            {isPortfolioDemo || isVisitorDemo
                ? 'Reset demo'
                : isLoading
                ? 'Getting authentication'
                : isAuthenticated
                ? 'Logout'
                : 'Login'}
        </Button>
    )
}
export default AuthButton
