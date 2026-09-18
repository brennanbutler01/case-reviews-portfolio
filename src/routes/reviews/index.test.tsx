import { render, screen } from '@testing-library/react'
import ReviewsPage from '@/routes/reviews/index'
import { BrowserRouter } from 'react-router-dom'
import { mockStaff } from '@/components/staffTable/actions.test'

describe('ReviewsPage', () => {
    it('should have a h1', () => {
        render(
            <BrowserRouter>
                <ReviewsPage />
            </BrowserRouter>,
        )
        expect(
            screen.getByRole('heading', { name: 'Reviews' }),
        ).toBeInTheDocument()
    })

    it('should have breadcrumbs', () => {
        render(
            <BrowserRouter>
                <ReviewsPage />
            </BrowserRouter>,
        )
        expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument()
    })

    it('should have a table if we have staff', () => {
        vi.mock('src/services/staff.ts', () => ({
            useStaffSWR: () => ({
                staff: [mockStaff],
            }),
        }))
        render(
            <BrowserRouter>
                <ReviewsPage />
            </BrowserRouter>,
        )
        expect(screen.getByRole('table')).toBeInTheDocument()
    })
})
