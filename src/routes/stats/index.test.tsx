import { render, screen } from '@testing-library/react'
import StatsPage from '@/routes/stats/index'
import { BrowserRouter } from 'react-router-dom'

describe('StatsPage', () => {
    beforeEach(() =>
        render(
            <BrowserRouter>
                <StatsPage />
            </BrowserRouter>,
        ),
    )
    it('should have a stats title', () => {
        expect(
            screen.getByRole('heading', { name: 'Stats' }),
        ).toBeInTheDocument()
    })

    it('should have a stats title', () => {
        expect(
            screen.getByRole('heading', { name: 'Stats' }),
        ).toBeInTheDocument()
    })

    it('should render tabs', () => {
        expect(screen.getByRole('tablist')).toBeInTheDocument()
        expect(screen.getByRole('tab', { name: 'All' })).toBeInTheDocument()
        expect(screen.getByRole('tab', { name: 'Staff' })).toBeInTheDocument()
        expect(screen.getByRole('tab', { name: 'Office' })).toBeInTheDocument()
    })
})
