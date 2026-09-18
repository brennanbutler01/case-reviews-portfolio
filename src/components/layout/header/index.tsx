import { useEffect, useState } from 'react'
import {
    Anchor,
    Container,
    createStyles,
    Group,
    Header as MantineHeader,
    Image,
    rem,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { Link, useLocation } from 'react-router-dom'
import AuthButton from '@/components/auth'
import babyTofu from '@/assets/cute-tofu.png'
import Burger from '@/components/layout/burger'

const useStyles = createStyles(theme => ({
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
    },

    links: {
        [theme.fn.smallerThan('xs')]: {
            display: 'none',
        },
    },

    burger: {
        [theme.fn.largerThan('xs')]: {
            display: 'none',
        },
    },

    link: {
        display: 'block',
        lineHeight: 1,
        padding: `${rem(8)} ${rem(12)}`,
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color:
            theme.colorScheme === 'dark'
                ? theme.colors.dark[0]
                : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
        },
    },

    linkActive: {
        '&, &:hover': {
            backgroundColor: theme.fn.variant({
                variant: 'light',
                color: theme.primaryColor,
            }).background,
            color: theme.fn.variant({
                variant: 'light',
                color: theme.primaryColor,
            }).color,
        },
    },
}))

export interface HeaderProps {
    links: { link: string; label: string }[]
}

const Header = ({ links }: HeaderProps) => {
    const { pathname } = useLocation()
    const [active, setActive] = useState(
        links.find(link => pathname.includes(link.link))?.link,
    )
    const { classes, cx, theme } = useStyles()
    const isSm = useMediaQuery(`(max-width: ${theme.breakpoints.sm}`)

    useEffect(() => setActive(pathname), [pathname])

    const items = links.map(link => (
        <Link
            key={link.label}
            to={link.link}
            className={cx(classes.link, {
                [classes.linkActive]: active === link.link,
            })}
        >
            {link.label}
        </Link>
    ))

    return (
        <MantineHeader height={60} mb={120}>
            <Container className={classes.header}>
                <Group noWrap>
                    <Image
                        src={babyTofu}
                        height={40}
                        width={45}
                        alt={'Cute baby tofu'}
                    />
                    <Anchor
                        component={Link}
                        to={'/'}
                        className={cx(classes.link, {
                            [classes.linkActive]: active === '/',
                        })}
                        sx={theme => ({
                            fontSize: theme.fontSizes.xl,
                            fontFamily: `${theme.headings.fontFamily}`,
                            fontWeight: 900,
                        })}
                    >
                        Tofu.Reviews
                    </Anchor>
                </Group>
                <nav>
                    {isSm ? (
                        <Burger links={links} />
                    ) : (
                        <Group spacing={5} className={classes.links}>
                            {items}
                        </Group>
                    )}
                </nav>

                {isSm ? null : <AuthButton />}
            </Container>
        </MantineHeader>
    )
}

export default Header
