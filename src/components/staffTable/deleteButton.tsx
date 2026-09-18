import { StaffActionsProps } from '@/components/staffTable/actions'
import { openConfirmModal } from '@mantine/modals'
import { Modals } from '@/models/modals'
import { ActionIcon, Box, Text } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { deleteStaff } from '@/services/staff'
import { IconTrash } from '@tabler/icons-react'
import React from 'react'
import { useSWRConfig } from 'swr'
import { useAppAuth } from '@/auth/useAppAuth'
import { useReviewSWR } from '@/services/review'

const DeleteStaffButton = ({ row }: StaffActionsProps) => {
    const { mutate } = useSWRConfig()
    const { getAccessTokenSilently } = useAppAuth()
    const { reviews } = useReviewSWR()

    return (
        <ActionIcon
            title={'Delete'}
            color='red'
            disabled={reviews?.some(
                review => review.staffId === row.original.id,
            )}
            onClick={() =>
                openConfirmModal({
                    modalId: Modals.DELETE_MODAL,
                    title: 'Delete Confirmation',
                    size: 'xs',
                    centered: true,
                    withCloseButton: true,
                    closeButtonProps: {
                        'aria-label': 'Close modal',
                    },
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
                            await deleteStaff(
                                row.original,
                                await getAccessTokenSilently(),
                            )
                            await mutate(() => true)
                            showNotification({
                                color: 'green',
                                title: 'Delete Success!',
                                message: 'Successfully deleted staff record',
                            })
                        } catch (e) {
                            showNotification({
                                color: 'red',
                                title: 'Delete Error!',
                                message: 'Error deleting staff',
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
export default DeleteStaffButton
