import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import { ModalsProvider } from '@mantine/modals'
import { mockReview } from '@/components/reviewsTable/actions.test'
import EditReviewButton from '@/components/reviewsTable/editButton'

describe('edit button', () => {
    beforeEach(() =>
        render(
            <ModalsProvider>
                <EditReviewButton row={mockReview} />
            </ModalsProvider>,
        ),
    )

    it('should render a button', () =>
        expect(screen.getByRole('button')).toBeInTheDocument())

    it('edit button modal', async () => {
        const user = userEvent.setup()
        await user.click(screen.getByRole('button'))
        expect(
            screen.getByRole('dialog', { name: 'Edit Review' }),
        ).toBeInTheDocument()
    })
})
