import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import DeleteReviewButton from '@/components/reviewsTable/deleteButton'
import { ModalsProvider } from '@mantine/modals'
import { mockReview } from '@/components/reviewsTable/actions.test'

describe('should render modal on click', () => {
    beforeEach(() =>
        render(
            <ModalsProvider>
                <DeleteReviewButton row={mockReview} />
            </ModalsProvider>,
        ),
    )

    it('should render a button', () =>
        expect(screen.getByRole('button')).toBeInTheDocument())

    it('delete modal', async () => {
        const user = userEvent.setup()
        await user.click(screen.getByRole('button'))
        expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
})
