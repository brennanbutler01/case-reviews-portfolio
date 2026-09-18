import Layout from '@/components/layout'
import Breadcrumbs from '@/components/breadcrumbs'
import StaffTable from '@/components/staffTable'
import { Box, Container, createStyles, Stack, Title } from '@mantine/core'

const styles = createStyles(() => ({
    tableContainer: {
        maxWidth: '60rem',
    },
}))

const StaffPage = () => {
    const { classes } = styles()
    return (
        <Layout pageTitle={'Staff'}>
            <Container>
                <Stack w={'100%'}>
                    <Breadcrumbs />
                    <Title>Staff</Title>
                    <Box className={classes.tableContainer}>
                        <StaffTable />
                    </Box>
                </Stack>
            </Container>
        </Layout>
    )
}

export default StaffPage
