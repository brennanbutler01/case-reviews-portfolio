import { isPortfolioDemo } from '@/demo/mode'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import React from 'react'
import { isLocalDemo, isVisitorDemo } from '@/auth/useAppAuth'

interface Props {
    component: React.ComponentType
}
const AuthGuard = ({ component }: Props) => {
    const Component =
        isLocalDemo || isPortfolioDemo || isVisitorDemo
            ? component
            : withAuthenticationRequired(component, {})

    return <Component />
}
export default AuthGuard
