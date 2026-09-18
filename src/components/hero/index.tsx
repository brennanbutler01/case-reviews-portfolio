import {
    Button,
    Container,
    createStyles,
    Group,
    rem,
    Text,
} from '@mantine/core'
import { Link } from 'react-router-dom'

const useStyles = createStyles(theme => ({
    wrapper: {
        position: 'relative',
        boxSizing: 'border-box',
        backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },

    inner: {
        position: 'relative',
        paddingTop: rem(120),
        paddingBottom: rem(120),

        [theme.fn.smallerThan('lg')]: {
            paddingBottom: rem(100),
            paddingTop: rem(100),
        },

        [theme.fn.smallerThan('md')]: {
            paddingBottom: rem(80),
            paddingTop: rem(80),
        },

        [theme.fn.smallerThan('sm')]: {
            paddingBottom: rem(60),
            paddingTop: rem(60),
        },

        [theme.fn.smallerThan('xs')]: {
            paddingTop: rem(25),
            paddingBottom: rem(25),
        },
    },

    title: {
        fontFamily: theme.fontFamily,
        fontSize: rem(62),
        fontWeight: 900,
        lineHeight: 1.1,
        margin: 0,
        padding: 0,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,

        [theme.fn.smallerThan('lg')]: {
            fontSize: rem(56),
            lineHeight: 1.1,
        },

        [theme.fn.smallerThan('sm')]: {
            fontSize: rem(48),
            lineHeight: 1.2,
        },

        [theme.fn.smallerThan('xs')]: {
            fontSize: rem(32),
        },
    },

    description: {
        marginTop: theme.spacing.xl,
        fontSize: rem(24),

        [theme.fn.smallerThan('sm')]: {
            fontSize: theme.fontSizes.md,
        },

        [theme.fn.smallerThan('xs')]: {
            fontSize: theme.fontSizes.sm,
        },
    },

    controls: {
        marginTop: `calc(${theme.spacing.xl} * 2)`,
        display: 'flex',
        justifyContent: 'center',
        [theme.fn.smallerThan('sm')]: {
            marginTop: theme.spacing.xl,
        },
    },

    control: {
        height: rem(54),
        paddingLeft: rem(38),
        paddingRight: rem(38),

        [theme.fn.smallerThan('sm')]: {
            height: rem(54),
            paddingLeft: rem(18),
            paddingRight: rem(18),
            flex: 1,
        },
    },
}))

const Hero = () => {
    const { classes } = useStyles()

    return (
        <div className={classes.wrapper}>
            <Container size={700} className={classes.inner}>
                <h1 className={classes.title}>
                    Public assistance case reviews made easy{' '}
                    <Text
                        component='span'
                        variant='gradient'
                        gradient={{ from: 'pink', to: 'purple' }}
                        inherit
                    >
                        with Tofu.Reviews
                    </Text>{' '}
                </h1>

                <Text className={classes.description} color='dimmed'>
                    Create, view, and manage QA/QC case reviews for SNAP,
                    Medicaid, TANF, ERDC, and other public-assistance programs
                    administered by the Oregon Department of Human Services.
                </Text>

                <Group className={classes.controls}>
                    <Button
                        to={'/reviews'}
                        component={Link}
                        size='xl'
                        className={classes.control}
                        variant='gradient'
                        gradient={{ from: 'pink', to: 'purple' }}
                    >
                        Get started
                    </Button>
                </Group>
            </Container>
        </div>
    )
}

export default Hero
