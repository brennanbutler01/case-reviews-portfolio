import { MRT_Row } from 'mantine-react-table'
import { Review } from '@/models/review'
import { ActionIcon, Group } from '@mantine/core'
import React from 'react'
import EditReviewButton from '@/components/reviewsTable/editButton'
import DeleteReviewButton from '@/components/reviewsTable/deleteButton'
import ViewReviewButton from '@/components/reviewsTable/viewButton'
import { PDFDownloadLink } from '@react-pdf/renderer'
import ReviewDocument from '@/components/pdf'
import { IconPdf } from '@tabler/icons-react'
import { useStaffSWR } from '@/services/staff'

export interface ReviewActionsProps {
    row: MRT_Row<Review>
}
const ReviewActions = ({ row }: ReviewActionsProps) => {
    const { staff } = useStaffSWR()
    const reviewedStaff = staff.find(
        member => member.id === row.original.staffId,
    )
    return (
        <Group noWrap>
            {reviewedStaff && (
                <PDFDownloadLink
                    document={
                        <ReviewDocument
                            review={{
                                ...row.original,
                                staff: reviewedStaff,
                            }}
                        />
                    }
                >
                    {({ url }) =>
                        !url ? null : (
                            <ActionIcon aria-label={'Generate pdf'}>
                                <IconPdf />
                            </ActionIcon>
                        )
                    }
                </PDFDownloadLink>
            )}
            <ViewReviewButton row={row} />
            <EditReviewButton row={row} />
            <DeleteReviewButton row={row} />
        </Group>
    )
}

export default ReviewActions
