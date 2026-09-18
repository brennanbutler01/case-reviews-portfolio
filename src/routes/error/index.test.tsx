import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ErrorPage from '@/routes/error/index'

describe('ErrorPage', () => {
    beforeEach(() =>
        render(
            <BrowserRouter>
                <ErrorPage />
            </BrowserRouter>,
        ),
    )
    it('should say something about 404', () => {
        expect(screen.getByText(/404/i)).toBeInTheDocument()
    })

    it('should have a link back to home', () => {
        expect(screen.getByRole('link', { name: 'Take me back to home page' }))
    })
})
