import { useAppAuth } from '@/auth/useAppAuth'
import Layout from '@/components/layout'
import {
    Card,
    Container,
    LoadingOverlay,
    Stack,
    Text,
    Title,
} from '@mantine/core'
import ErrorPage from '@/routes/error'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const CallbackPage = () => {
    const { error, isLoading, isAuthenticated } = useAppAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (!error && !isLoading && isAuthenticated) {
            navigate('/')
        }
    }, [navigate, error, isLoading, isAuthenticated])

    if (error) {
        return <ErrorPage />
    } else {
        return (
            <Layout pageTitle={'Callbac'}>
                <LoadingOverlay visible={isLoading} />
                <Container>
                    <Card>
                        <Stack align={'center'}>
                            <Title>Routing...</Title>
                            <Text c={'dimmed'}>
                                Please wait just a moment, you should get to
                                your destination soon...
                            </Text>
                        </Stack>
                    </Card>
                </Container>
            </Layout>
        )
    }
}
