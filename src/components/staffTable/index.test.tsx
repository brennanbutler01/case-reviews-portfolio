import { render, screen } from '@testing-library/react'
import StaffTable from '@/components/staffTable/index'

describe('Staff Table', () => {
    beforeEach(() => render(<StaffTable />))
    it('should render a table', () => {
        expect(screen.getByRole('table')).toBeInTheDocument()
    })

    it('should have a button to create a new staff record', () => {
        expect(
            screen.getByRole('button', { name: 'Create' }),
        ).toBeInTheDocument()
    })
})
