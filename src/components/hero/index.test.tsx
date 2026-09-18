import { render, screen } from '@testing-library/react'
import Hero from '@/components/hero/index'
import { BrowserRouter } from 'react-router-dom'

describe('hero', () => {
    it('should render a heading', () => {
        render(
            <BrowserRouter>
                <Hero />
            </BrowserRouter>,
        )
        expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    })

    it('should render a button to get started', () => {
        render(
            <BrowserRouter>
                <Hero />
            </BrowserRouter>,
        )
        expect(
            screen.getByRole('link', { name: 'Get started' }),
        ).toBeInTheDocument()
    })
})
