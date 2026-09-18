import { render, screen } from '@testing-library/react'
import Breadcrumbs from '@/components/breadcrumbs/index'
import { MemoryRouter } from 'react-router-dom'

describe('Breadcrumbs', () => {
    it('should render each part of path as a link + home', () => {
        render(
            <MemoryRouter initialEntries={['/example/path']}>
                <Breadcrumbs />
            </MemoryRouter>,
        )
        expect(screen.getByRole('link', { name: 'home' })).toHaveAttribute(
            'href',
            '/',
        )
        expect(screen.getByRole('link', { name: 'example' })).toHaveAttribute(
            'href',
            '/example',
        )
        expect(screen.getByRole('link', { name: 'path' })).toHaveAttribute(
            'href',
            '/example/path',
        )
    })
})
