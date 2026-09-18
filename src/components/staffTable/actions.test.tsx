import { render, screen } from '@testing-library/react'
import StaffActions from '@/components/staffTable/actions'
import { Staff } from '@/models/staff'
import { v4 as uuid } from 'uuid'
import { MRT_Row } from 'mantine-react-table'

export const mockStaff = {
    original: {
        id: uuid(),
        office: 0,
        orNumber: 'OR0233300',
        firstName: 'Karl',
        lastName: 'Marx',
    },
} as MRT_Row<Staff>

describe('StaffTableActions', () => {
    beforeEach(() =>
        render(
            <StaffActions
                row={
                    {
                        original: {
                            id: uuid(),
                            office: 0,
                            orNumber: 'OR0233300',
                            firstName: 'Karl',
                            lastName: 'Marx',
                        },
                    } as MRT_Row<Staff>
                }
            />,
        ),
    )

    it('should show a view button', () => {
        expect(screen.getByRole('button', { name: 'View' })).toBeInTheDocument()
    })

    it('should show a delete button', () => {
        expect(
            screen.getByRole('button', { name: 'Delete' }),
        ).toBeInTheDocument()
    })

    it('should show a edit button', () => {
        expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument()
    })
})
