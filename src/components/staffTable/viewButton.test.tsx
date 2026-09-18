import { render, screen } from '@testing-library/react'
import { mockStaff } from '@/components/staffTable/actions.test'
import ViewStaffButton from '@/components/staffTable/viewButton'

describe('ViewStaffButton', () => {
    it('should render a button', () => {
        render(<ViewStaffButton row={mockStaff} />)
        expect(screen.getByRole('button')).toBeInTheDocument()
    })
})
