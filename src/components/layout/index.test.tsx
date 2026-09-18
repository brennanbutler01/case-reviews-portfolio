import { render, screen } from '@testing-library/react'
import Layout from '@/components/layout/index'
import { BrowserRouter } from 'react-router-dom'

describe('Layout', () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <Layout pageTitle={'Home'}>
                    <button>children</button>
                </Layout>
            </BrowserRouter>,
        )
    })

    it('renders children', () => {
        expect(
            screen.getByRole('button', { name: 'children' }),
        ).toBeInTheDocument()
    })

    it('should have a header', () => {
        expect(screen.getByRole('banner')).toBeInTheDocument()
    })

    it('sets the document title', () => {
        expect(document.title).toBe('Home | Tofu.Reviews')
    })
})
