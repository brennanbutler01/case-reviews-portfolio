import { render, screen } from '@testing-library/react'
import HomePage from '@/routes/home/index'
import { BrowserRouter } from 'react-router-dom'

describe('HomePage', () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <HomePage />
            </BrowserRouter>,
        )
    })

    it('should have hero', () => {
        expect(
            screen.getByRole('heading', {
                name: 'Public assistance case reviews made easy with Tofu.Reviews',
            }),
        ).toBeInTheDocument()
    })

    it('should have a button to reviews page', () => {
        expect(
            screen.getByRole('link', { name: 'Get started' }),
        ).toHaveAttribute('href', '/reviews')
    })
})
