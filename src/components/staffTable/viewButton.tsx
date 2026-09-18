import { openModal } from '@mantine/modals'
import { Modals } from '@/models/modals'
import { ActionIcon, Stack, Text, useMantineTheme } from '@mantine/core'
import ReviewsTable from '@/components/reviewsTable'
import { IconUser } from '@tabler/icons-react'
import React from 'react'
import { useMediaQuery } from '@mantine/hooks'
import { StaffActionsProps } from '@/components/staffTable/actions'
import Stats from '@/components/stats'

const ViewStaffButton = ({ row }: StaffActionsProps) => {
    const theme = useMantineTheme()
    const isSm = useMediaQuery(`(max-width: ${theme.breakpoints.sm}`)
    const isMd = useMediaQuery(`(min-width: ${theme.breakpoints.md}`)
    return (
        <ActionIcon
            title={'View'}
            color={'green'}
            onClick={() =>
                openModal({
                    modalId: Modals.STAFF_DETAIL,
                    title: `Info for ${row.original.firstName} ${row.original.lastName}`,
                    withCloseButton: true,
                    // centered: true,
                    size: isSm ? 'xs' : isMd ? 'xl' : 'md',
                    children: (
                        <Stack w={'100%'}>
                            <ReviewsTable staffId={row.original.id} />
                            <div>
                                <Text size={'lg'}>Review stats</Text>
                                <Stats staffId={row.original.id} />
                            </div>
                        </Stack>
                    ),
                    closeButtonProps: {
                        'aria-label': 'Close modal',
                    },
                })
            }
        >
            <IconUser />
        </ActionIcon>
    )
}
export default ViewStaffButton
