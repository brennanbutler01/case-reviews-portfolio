import { render, screen } from '@testing-library/react'
import ReviewsTable from '@/components/reviewsTable/index'

describe('ReviewsTable', () => {
    beforeEach(() => render(<ReviewsTable />))
    it('should render a table', () => {
        expect(screen.getByRole('table')).toBeInTheDocument()
    })

    it('should have a create button', () => {
        expect(
            screen.getByRole('button', { name: 'Create' }),
        ).toBeInTheDocument()
    })
})
