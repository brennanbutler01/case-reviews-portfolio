import React, { useMemo } from 'react'
import { useReviewSWR } from '@/services/review'
import { useStaffSWR } from '@/services/staff'
import { MantineReactTable, MRT_ColumnDef } from 'mantine-react-table'
import { Button, Flex, Text, useMantineTheme } from '@mantine/core'
import { openModal } from '@mantine/modals'
import { Review } from '@/models/review'
import { Programs } from '@/models/programs'
import ReviewForm from '@/components/reviewForm'
import { useMediaQuery } from '@mantine/hooks'
import { Modals } from '@/models/modals'
import ReviewActions from '@/components/reviewsTable/actions'
import dayjs from '@/dayjs'

interface Props {
    staffId?: string
}
const ReviewsTable = ({ staffId }: Props) => {
    const { reviews, isLoading } = useReviewSWR()
    const { staff } = useStaffSWR()
    const theme = useMantineTheme()
    const isSm = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`)
    const isMd = useMediaQuery(`(min-width: ${theme.breakpoints.md})`)
    const isLg = useMediaQuery(`(min-width: ${theme.breakpoints.lg})`)

    const data = useMemo<Review[]>(
        () =>
            staffId
                ? reviews.filter(review => review.staffId === staffId)
                : reviews,
        [reviews, staffId],
    )

    const columns = useMemo<MRT_ColumnDef<Review>[]>(
        () => [
            {
                accessorKey: 'isComplete',
                header: 'Is Complete',
                size: 140,
                accessorFn: row =>
                    row.isComplete ? 'Complete' : 'In Progress',
                Cell: ({ cell }) =>
                    isLoading ? null : (
                        <Flex direction={'column'}>
                            <Text fw={'bold'}>
                                {cell.row.original.isComplete
                                    ? 'Completed'
                                    : 'In Progress'}
                            </Text>
                            <Text>
                                {`${cell.row.original.reviewElements.reduce(
                                    (acc, curr) =>
                                        acc + (curr.isReviewed ? 1 : 0),
                                    0,
                                )} / ${
                                    cell.row.original.reviewElements.length
                                }`}{' '}
                                completed
                            </Text>
                        </Flex>
                    ),
            },
            {
                accessorKey: 'program',
                header: 'Program',
                size: 140,
                accessorFn: row => Object.keys(Programs)[row.program],
            },
            {
                accessorKey: 'reviewDate',
                header: 'Date Reviewed',
                accessorFn: row => new Date(row.reviewDate),
                filterVariant: 'date',
                Cell: ({ cell }) => cell.getValue<Date>().toLocaleDateString(),
                filterFn: (row, _columnId, filterValue) =>
                    dayjs(row.original.reviewDate).isSame(filterValue, 'date'),
            },
            {
                accessorKey: 'staffId',
                header: 'Staff',
                size: 80,
                accessorFn: row => {
                    const thisStaff = staff.find(
                        staffMember => staffMember.id === row.staffId,
                    )

                    return thisStaff
                        ? thisStaff.firstName + ' ' + thisStaff.lastName
                        : row.staffId
                },
            },
        ],
        [staff, isLoading],
    )

    return (
        <>
            <MantineReactTable
                displayColumnDefOptions={{
                    'mrt-row-actions': {
                        mantineTableHeadCellProps: {
                            align: 'center',
                        },
                        size: 120,
                    },
                }}
                columns={columns}
                getRowId={row => row.id}
                data={data}
                enableColumnOrdering
                enableRowActions
                initialState={{
                    columnVisibility: { staffId: !staffId },
                    showGlobalFilter: true,
                }}
                mantineSearchTextInputProps={{
                    rightSection: <></>,
                }}
                enableDensityToggle={false}
                enableFullScreenToggle={false}
                state={{ isLoading }}
                renderRowActions={ReviewActions}
                renderTopToolbarCustomActions={() => (
                    <Button
                        onClick={() =>
                            openModal({
                                modalId: Modals.REVIEW_FORM,
                                title: 'Review Form',
                                children: <ReviewForm />,
                                withCloseButton: true,
                                closeButtonProps: {
                                    'aria-label': 'Close button',
                                },
                                centered: true,
                                size: isLg
                                    ? 'lg'
                                    : isMd
                                    ? 'md'
                                    : isSm
                                    ? 'sm'
                                    : 'xs',
                            })
                        }
                    >
                        Create
                    </Button>
                )}
                positionActionsColumn={'last'}
            />
        </>
    )
}
export default ReviewsTable
