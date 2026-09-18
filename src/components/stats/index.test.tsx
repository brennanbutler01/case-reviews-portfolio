import { render, screen } from '@testing-library/react'
import Stats from '@/components/stats/index'

describe('Stats', () => {
    beforeEach(() => render(<Stats />))
    it('should render each of our primary stats', () => {
        expect(screen.getByText('# Cases Reviewed')).toBeInTheDocument()
        expect(screen.getByText('# Cases With Errors')).toBeInTheDocument()
        expect(screen.getByText('# Cases With Actions')).toBeInTheDocument()
    })
})
