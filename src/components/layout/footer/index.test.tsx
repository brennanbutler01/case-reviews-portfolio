import Footer from '@/components/layout/footer/index'
import { render, screen } from '@testing-library/react'

describe('Footer', () => {
    it('should render a content info section', () => {
        render(<Footer />)
        expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    })
})
