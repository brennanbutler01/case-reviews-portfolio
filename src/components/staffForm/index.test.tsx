import { render, screen } from '@testing-library/react'
import StaffForm from '@/components/staffForm/index'
import { mockStaff } from '@/components/staffTable/actions.test'
import { Offices } from '@/models/offices'
import userEvent from '@testing-library/user-event'

vi.mock('src/services/staff.ts', () => ({
    useStaffSWR: () => ({
        staff: [mockStaff],
    }),
}))

describe('StaffForm', () => {
    beforeEach(() => render(<StaffForm />))

    it('should render a form', () => {
        expect(
            screen.getByRole('form', { name: 'Create/Edit Staff' }),
        ).toBeInTheDocument()
    })

    it('should have a submit button', () => {
        expect(
            screen.getByRole('button', { name: 'Submit' }),
        ).toBeInTheDocument()
    })

    it('should have all fields required', () => {
        expect(
            screen.getByRole('textbox', { name: 'First Name' }),
        ).toBeRequired()
        expect(
            screen.getByRole('textbox', { name: 'Last Name' }),
        ).toBeRequired()
        expect(
            screen.getByRole('textbox', { name: 'OR Number' }),
        ).toBeRequired()
        expect(screen.getByRole('searchbox', { name: 'Office' })).toBeRequired()
    })

    it('should show errors if we have an OR number w/o OR', async () => {
        const user = await userEvent.setup()
        await user.type(
            screen.getByRole('textbox', { name: 'First Name' }),
            'his',
        )
        await user.type(
            screen.getByRole('textbox', { name: 'Last Name' }),
            'his',
        )
        await user.type(
            screen.getByRole('textbox', { name: 'OR Number' }),
            'his',
        )
        await user.click(screen.getByRole('button', { name: 'Submit' }))
        expect(
            screen.getByText('OR Numbers begin with "OR"'),
        ).toBeInTheDocument()
    })
})

describe('StaffForm - Edit', () => {
    beforeEach(() => render(<StaffForm editing={mockStaff.original} />))

    it('should populate form values', () => {
        expect(screen.getByRole('textbox', { name: 'First Name' })).toHaveValue(
            mockStaff.original.firstName,
        )
        expect(screen.getByRole('textbox', { name: 'Last Name' })).toHaveValue(
            mockStaff.original.lastName,
        )
        expect(screen.getByRole('textbox', { name: 'OR Number' })).toHaveValue(
            mockStaff.original.orNumber,
        )
        expect(screen.getByRole('searchbox', { name: 'Office' })).toHaveValue(
            Object.keys(Offices)[mockStaff.original.office],
        )
    })
})
