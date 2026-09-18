import { MRT_Row } from 'mantine-react-table'
import { Staff } from '@/models/staff'
import { Group } from '@mantine/core'
import React from 'react'
import ViewStaffButton from '@/components/staffTable/viewButton'
import EditStaffButton from '@/components/staffTable/editButton'
import DeleteStaffButton from '@/components/staffTable/deleteButton'

export interface StaffActionsProps {
    row: MRT_Row<Staff>
}
const StaffActions = ({ row }: StaffActionsProps) => {
    return (
        <Group>
            <ViewStaffButton row={row} />
            <EditStaffButton row={row} />
            <DeleteStaffButton row={row} />
        </Group>
    )
}
export default StaffActions
