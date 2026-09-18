import { isPortfolioDemo } from '@/demo/mode'
import { useDisclosure } from '@mantine/hooks'
import { Burger as MantineBurger, Menu } from '@mantine/core'
import { HeaderProps } from '@/components/layout/header'
import { Link, useLocation } from 'react-router-dom'
import { useAppAuth, isVisitorDemo } from '@/auth/useAppAuth'
import { useEffect, useState } from 'react'

const Burger = ({ links }: HeaderProps) => {
    const { pathname } = useLocation()
    const [opened, { toggle, close }] = useDisclosure()
    const { isAuthenticated, isLoading, logout, loginWithRedirect } =
        useAppAuth()
    const [active, setActive] = useState(
        links.find(link => pathname.includes(link.link))?.link,
    )
    useEffect(() => setActive(pathname), [pathname])

    return (
        <Menu onClose={close}>
            <Menu.Target>
                <MantineBurger
                    aria-label='Toggle navigation'
                    opened={opened}
                    onClick={toggle}
                />
            </Menu.Target>
            <Menu.Dropdown>
                {links.map(link => (
                    <Menu.Item
                        to={link.link}
                        key={link.link}
                        component={Link}
                        {...(link.link === active && {
                            sx: theme => ({
                                backgroundColor: theme.colors.pink[0],
                                ':hover': {
                                    backgroundColor: theme.colors.pink[1],
                                },
                            }),
                        })}
                    >
                        {link.label}
                    </Menu.Item>
                ))}
                <Menu.Item
                    disabled={isLoading}
                    onClick={async () =>
                        await (isAuthenticated ? logout() : loginWithRedirect())
                    }
                >
                    {isPortfolioDemo || isVisitorDemo
                        ? 'Reset demo'
                        : isAuthenticated
                        ? 'Sign out'
                        : isLoading
                        ? 'Getting authentication...'
                        : 'Sign in'}
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}
export default Burger
