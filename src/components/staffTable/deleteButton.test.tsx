import { render, screen } from '@testing-library/react'
import DeleteStaffButton from '@/components/staffTable/deleteButton'
import { mockStaff } from '@/components/staffTable/actions.test'

describe('DeleteStaffButton', () => {
    it('should render a button', () => {
        render(<DeleteStaffButton row={mockStaff} />)
        expect(screen.getByRole('button')).toBeInTheDocument()
    })
})
