import Layout from '@/components/layout'
import Breadcrumbs from '@/components/breadcrumbs'
import {
    Alert,
    Box,
    Button,
    Container,
    createStyles,
    Stack,
    Text,
    Title,
} from '@mantine/core'
import ReviewsTable from '@/components/reviewsTable'
import { useStaffSWR } from '@/services/staff'
import { IconExclamationMark } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

const styles = createStyles(() => ({
    tableContainer: {
        maxWidth: '60rem',
    },
}))

const ReviewsPage = () => {
    const { classes } = styles()
    const { staff } = useStaffSWR()
    return (
        <Layout pageTitle={'Reviews'}>
            <Container>
                <Stack w='100%'>
                    <Breadcrumbs />
                    <Title>Reviews</Title>
                    {staff?.length > 0 ? (
                        <Box className={classes.tableContainer}>
                            <ReviewsTable />
                        </Box>
                    ) : (
                        <Alert
                            icon={<IconExclamationMark />}
                            title={'Add staff!'}
                            children={
                                <Stack>
                                    <Text>
                                        You need to create staff before you are
                                        able to make any reviews
                                    </Text>
                                    <Button component={Link} to={'/staff'}>
                                        Go to staff page
                                    </Button>
                                </Stack>
                            }
                        />
                    )}
                </Stack>
            </Container>
        </Layout>
    )
}
export default ReviewsPage
