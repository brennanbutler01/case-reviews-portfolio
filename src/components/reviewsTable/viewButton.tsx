import { Review } from '@/models/review'
import {
    Accordion,
    ActionIcon,
    Badge,
    Card,
    Group,
    Input,
    Stack,
    Text,
    useMantineTheme,
} from '@mantine/core'
import { openModal } from '@mantine/modals'
import { Programs } from '@/models/programs'
import RadioForPrograms from '@/components/reviewForm/radioForPrograms'
import MagiEligibles from '@/components/reviewForm/magiEligibles'
import ReviewElementItem from '@/components/reviewForm/reviewElementItem'
import { IconFileDescription } from '@tabler/icons-react'
import React, { useMemo } from 'react'
import { ReviewActionsProps } from '@/components/reviewsTable/actions'
import { useStaffSWR } from '@/services/staff'
import dayjs from '@/dayjs'
import { useAppAuth } from '@/auth/useAppAuth'
import { useMediaQuery } from '@mantine/hooks'
import {
    ReviewFormProvider,
    useReviewForm,
} from '@/components/reviewForm/context'

const ReviewDetailsForm = ({
    review,
    children,
}: {
    review: Review
    children: React.ReactNode
}) => {
    const form = useReviewForm({ initialValues: { ...review } })
    return <ReviewFormProvider form={form}>{children}</ReviewFormProvider>
}

const ViewReviewButton = ({ row }: ReviewActionsProps) => {
    const theme = useMantineTheme()
    const isSm = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`)
    const isMd = useMediaQuery(`(min-width: ${theme.breakpoints.md})`)
    const isLg = useMediaQuery(`(min-width: ${theme.breakpoints.lg})`)

    const { staff } = useStaffSWR()
    const { user } = useAppAuth()

    const thisStaff = useMemo(
        () =>
            staff.find(staffMember => staffMember.id === row.original.staffId),
        [staff, row],
    )

    return (
        <ActionIcon
            title={'View'}
            color={'green'}
            onClick={() =>
                openModal({
                    title: 'Review Details',
                    withCloseButton: true,
                    centered: true,
                    size: isLg ? 'xl' : isMd ? 'md' : isSm ? 'sm' : 'xs',
                    closeButtonProps: {
                        'aria-label': 'Close modal',
                    },
                    children: (
                        <ReviewDetailsForm review={row.original}>
                            <Card withBorder shadow={'sm'}>
                                <Card.Section inheritPadding p={'sm'}>
                                    <Stack spacing={'lg'}>
                                        <Group>
                                            <Text size={'lg'} weight={'bold'}>
                                                Program:
                                            </Text>
                                            <Badge>
                                                {
                                                    Object.keys(Programs)[
                                                        row.original.program
                                                    ]
                                                }
                                            </Badge>
                                        </Group>
                                        <Group>
                                            <Text size={'lg'} weight={'bold'}>
                                                Reviewing:
                                            </Text>
                                            <Text c={'dimmed'} truncate>
                                                {thisStaff?.firstName}{' '}
                                                {thisStaff?.lastName}
                                            </Text>
                                        </Group>

                                        <Group>
                                            <Text size={'lg'} weight={'bold'}>
                                                Reviewed By:
                                            </Text>
                                            <Text c={'dimmed'} truncate>
                                                {user?.name}
                                            </Text>
                                        </Group>

                                        <Group>
                                            <Text size={'lg'} weight={'bold'}>
                                                Is Complete?
                                            </Text>
                                            <Badge
                                                color={
                                                    row.original.isComplete
                                                        ? 'green'
                                                        : 'yellow'
                                                }
                                            >
                                                {row.original.isComplete
                                                    ? 'Completed'
                                                    : 'In Progress'}
                                            </Badge>
                                        </Group>
                                        <Group>
                                            <Text size={'lg'} weight={'bold'}>
                                                Review Date
                                            </Text>
                                            <Text c={'dimmed'}>
                                                {dayjs(row.original.reviewDate)
                                                    .toDate()
                                                    .toLocaleString()}
                                            </Text>
                                        </Group>

                                        {row.original.otherComments && (
                                            <Stack spacing='xs'>
                                                <Text weight='bold'>
                                                    Comments
                                                </Text>
                                                <Text>
                                                    {row.original.otherComments}
                                                </Text>
                                            </Stack>
                                        )}
                                        {[
                                            Programs.MAGI,
                                            Programs.NON_MAGI,
                                            Programs.SNAP,
                                        ].includes(row.original.program) ? (
                                            <>
                                                <RadioForPrograms readOnly />
                                                {row.original.program ===
                                                Programs.MAGI ? (
                                                    <MagiEligibles readOnly />
                                                ) : null}
                                            </>
                                        ) : null}
                                    </Stack>
                                </Card.Section>

                                <Card.Section
                                    inheritPadding
                                    p={'sm'}
                                    pt={'md'}
                                    withBorder
                                >
                                    <Stack>
                                        <Input.Label size={'lg'}>
                                            Review Elements
                                        </Input.Label>
                                        <Accordion>
                                            {row.original.reviewElements.map(
                                                (reviewElement, index) => (
                                                    <ReviewElementItem
                                                        key={reviewElement.id}
                                                        review={row.original}
                                                        readOnly
                                                        index={index}
                                                        reviewedElement={
                                                            reviewElement
                                                        }
                                                    />
                                                ),
                                            )}
                                        </Accordion>
                                    </Stack>
                                </Card.Section>
                            </Card>
                        </ReviewDetailsForm>
                    ),
                })
            }
        >
            <IconFileDescription />
        </ActionIcon>
    )
}

export default ViewReviewButton
