import { useStaffSWR } from '@/services/staff'

import React, { useMemo } from 'react'
import { MantineReactTable, MRT_ColumnDef } from 'mantine-react-table'
import { Button } from '@mantine/core'
import { Staff } from '@/models/staff'
import { Offices } from '@/models/offices'
import { openModal } from '@mantine/modals'
import StaffForm from '@/components/staffForm'
import { Modals } from '@/models/modals'
import StaffActions from '@/components/staffTable/actions'

const StaffTable = () => {
    const { staff, isLoading } = useStaffSWR()

    const columns = useMemo<MRT_ColumnDef<Staff>[]>(
        () => [
            {
                header: 'Name',
                accessorFn: row => `${row.firstName} ${row.lastName}`,
                size: 140,
            },
            {
                accessorKey: 'orNumber',
                header: 'OR Number',
            },
            {
                accessorKey: 'office',
                header: 'Office',
                size: 80,
                accessorFn: row => {
                    return Object.keys(Offices)[row.office]
                },
            },
        ],
        [],
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
                data={staff}
                enableColumnOrdering
                enableRowActions
                enableDensityToggle={false}
                enableFullScreenToggle={false}
                mantineSearchTextInputProps={{
                    rightSection: <></>,
                }}
                initialState={{
                    showGlobalFilter: true,
                }}
                state={{
                    isLoading,
                }}
                renderRowActions={StaffActions}
                positionActionsColumn={'last'}
                renderTopToolbarCustomActions={() => (
                    <Button
                        onClick={() =>
                            openModal({
                                modalId: Modals.STAFF_FORM,
                                title: `Create Staff`,
                                withCloseButton: true,
                                closeButtonProps: {
                                    'aria-label': 'Close modal',
                                },
                                size: 'xs',
                                centered: true,
                                children: <StaffForm />,
                            })
                        }
                    >
                        Create
                    </Button>
                )}
            />
        </>
    )
}
export default StaffTable
