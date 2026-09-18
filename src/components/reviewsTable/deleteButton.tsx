import { openConfirmModal } from '@mantine/modals'
import { Modals } from '@/models/modals'
import { ActionIcon, Box, Text } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { deleteReview } from '@/services/review'
import { IconTrash } from '@tabler/icons-react'
import React from 'react'
import { ReviewActionsProps } from '@/components/reviewsTable/actions'
import { useSWRConfig } from 'swr'
import { useAppAuth } from '@/auth/useAppAuth'

const DeleteReviewButton = ({ row }: ReviewActionsProps) => {
    const { mutate } = useSWRConfig()
    const { getAccessTokenSilently } = useAppAuth()
    return (
        <ActionIcon
            title={'Delete'}
            color='red'
            onClick={() =>
                openConfirmModal({
                    modalId: Modals.DELETE_MODAL,
                    centered: true,
                    withCloseButton: true,
                    closeButtonProps: {
                        'aria-label': 'Close modal',
                    },
                    size: 'xs',
                    title: 'Delete Confirmation',
                    children: (
                        <Box p={'sm'}>
                            <Text c={'dimmed'}>
                                Are you sure that you want to delete this
                                record? You can't get it back!
                            </Text>
                        </Box>
                    ),
                    labels: {
                        cancel: 'cancel',
                        confirm: 'confirm',
                    },
                    onConfirm: async () => {
                        try {
                            await deleteReview(
                                row.original,
                                await getAccessTokenSilently(),
                            )
                            await mutate(() => true)
                            showNotification({
                                color: 'green',
                                title: 'Delete Success!',
                                message: 'Successfully deleted review record',
                            })
                        } catch (e) {
                            showNotification({
                                color: 'red',
                                title: 'Delete Error!',
                                message: 'Error deleting review',
                            })
                        }
                    },
                })
            }
        >
            <IconTrash />
        </ActionIcon>
    )
}

export default DeleteReviewButton
