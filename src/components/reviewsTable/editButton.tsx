import { ActionIcon, useMantineTheme } from '@mantine/core'
import { openModal } from '@mantine/modals'
import { Modals } from '@/models/modals'
import ReviewForm from '@/components/reviewForm'
import { IconEdit } from '@tabler/icons-react'
import React from 'react'
import { ReviewActionsProps } from '@/components/reviewsTable/actions'
import { useMediaQuery } from '@mantine/hooks'

const EditReviewButton = ({ row }: ReviewActionsProps) => {
    const theme = useMantineTheme()
    const isSm = useMediaQuery(`(min-width: ${theme.breakpoints.sm}`)
    const isMd = useMediaQuery(`(min-width: ${theme.breakpoints.md}`)
    const isLg = useMediaQuery(`(min-width: ${theme.breakpoints.lg}`)
    return (
        <ActionIcon
            title={'Edit'}
            color={'blue'}
            onClick={() =>
                openModal({
                    modalId: Modals.REVIEW_FORM,
                    title: 'Edit Review',
                    withCloseButton: true,
                    closeButtonProps: {
                        'aria-label': 'Close',
                    },
                    children: <ReviewForm editing={row.original} />,
                    centered: true,
                    size: isLg ? 'xl' : isMd ? 'md' : isSm ? 'sm' : 'xs',
                })
            }
        >
            <IconEdit />
        </ActionIcon>
    )
}
export default EditReviewButton
