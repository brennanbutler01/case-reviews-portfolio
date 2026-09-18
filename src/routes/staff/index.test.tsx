import { describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import StaffPage from '@/routes/staff/index'

describe('StaffPage', () => {
    beforeEach(() =>
        render(
            <BrowserRouter>
                <StaffPage />
            </BrowserRouter>,
        ),
    )
    it('should have a h1', () => {
        expect(
            screen.getByRole('heading', { name: 'Staff' }),
        ).toBeInTheDocument()
    })

    it('should have breadcrumbs', () => {
        expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument()
    })

    it('should have a staff table', () => {
        expect(screen.getByRole('table')).toBeInTheDocument()
    })
})
