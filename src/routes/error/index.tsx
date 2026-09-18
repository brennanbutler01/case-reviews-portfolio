import {
    Button,
    Card,
    Container,
    createStyles,
    Group,
    rem,
    Text,
    Title,
} from '@mantine/core'
import Layout from '@/components/layout'
import { Link } from 'react-router-dom'

const useStyles = createStyles(theme => ({
    root: {
        paddingTop: rem(80),
        paddingBottom: rem(80),
    },

    label: {
        textAlign: 'center',
        fontWeight: 900,
        fontSize: rem(220),
        lineHeight: 1,
        marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
        color:
            theme.colorScheme === 'dark'
                ? theme.colors.dark[4]
                : theme.colors.gray[2],

        [theme.fn.smallerThan('sm')]: {
            fontSize: rem(120),
        },
    },

    title: {
        // fontFamily: theme.headings.fontFamily,
        textAlign: 'center',
        fontWeight: 900,
        fontSize: rem(38),

        [theme.fn.smallerThan('sm')]: {
            fontSize: rem(32),
        },
    },

    description: {
        maxWidth: rem(500),
        margin: 'auto',
        marginTop: theme.spacing.xl,
        marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    },
}))

const ErrorPage = () => {
    const { classes } = useStyles()
    return (
        <Layout pageTitle={'Error'}>
            <Container className={classes.root}>
                <Card shadow={'xs'}>
                    <div className={classes.label}>404</div>
                    <Title className={classes.title}>
                        This page doesn't exist!
                    </Title>
                    <Text
                        color='dimmed'
                        size='lg'
                        align='center'
                        className={classes.description}
                    >
                        Unfortunately, this page does not exist yet. You may
                        have mistyped the address, or the page has been moved to
                        another URL.
                    </Text>
                    <Group position='center'>
                        <Button
                            component={Link}
                            to={'/'}
                            variant='subtle'
                            size='md'
                        >
                            Take me back to home page
                        </Button>
                    </Group>
                </Card>
            </Container>
        </Layout>
    )
}
export default ErrorPage
