import { StaffActionsProps } from '@/components/staffTable/actions'
import { openModal } from '@mantine/modals'
import { Modals } from '@/models/modals'
import StaffForm from '@/components/staffForm'
import { IconEdit } from '@tabler/icons-react'
import { ActionIcon } from '@mantine/core'
import React from 'react'

const EditStaffButton = ({ row }: StaffActionsProps) => (
    <ActionIcon
        title={'Edit'}
        color={'blue'}
        onClick={() =>
            openModal({
                modalId: Modals.STAFF_FORM,
                title: 'Edit Staff',
                children: <StaffForm editing={row.original} />,
                centered: true,
                size: 'xs',
                withCloseButton: true,
                closeButtonProps: {
                    'aria-label': 'Close Model',
                },
            })
        }
    >
        <IconEdit />
    </ActionIcon>
)

export default EditStaffButton
