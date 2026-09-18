import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Header from '@/components/layout/header/index'

describe('Header', () => {
    beforeEach(() =>
        render(
            <BrowserRouter>
                <Header links={[{ link: '/test', label: 'Test' }]} />
            </BrowserRouter>,
        ),
    )

    it('should render a banner', () => {
        expect(screen.getByRole('banner')).toBeInTheDocument()
    })

    it('should render passed in links', () => {
        expect(screen.getByRole('link', { name: 'Test' })).toHaveAttribute(
            'href',
            '/test',
        )
    })

    it('should have a nav', () => {
        expect(screen.getByRole('navigation')).toBeInTheDocument()
    })

    it('should have a link home', () => {
        expect(
            screen.getByRole('link', { name: 'Tofu.Reviews' }),
        ).toBeInTheDocument()
    })

    it('should render an image', () => {
        expect(screen.getByRole('img')).toBeInTheDocument()
    })

    it('should render an auth button', () => {
        expect(screen.getByRole('button')).toBeInTheDocument()
    })
})
