import { render, screen } from '@testing-library/react'
import { mockStaff } from '@/components/staffTable/actions.test'
import EditStaffButton from '@/components/staffTable/editButton'

describe('EditStaffButton', () => {
    it('should render a button', () => {
        render(<EditStaffButton row={mockStaff} />)
        expect(screen.getByRole('button')).toBeInTheDocument()
    })
})
